/// <reference path="../../../modules.d.ts"/>
import cryptoFactory from "chainpad-crypto";
import Nacl from "tweetnacl";
import { encodeURLSafe, decodeURLSafe } from "@stablelib/base64";

// const { Curve, Nacl } = crypto;
const crypto = cryptoFactory(Nacl);
const { Curve } = crypto;

export const urlSafeToNacl = (key: string) =>
  Nacl.util.encodeBase64(decodeURLSafe(key));

export const NaclToUrlSafe = (key: string) =>
  encodeURLSafe(Nacl.util.decodeBase64(key));

const getCryptor = (theirPublic: string, myPrivate: string) => {
  const derived = Curve.deriveKeys(
    urlSafeToNacl(theirPublic),
    urlSafeToNacl(myPrivate)
  );

  // Check that `derived` really exists because `deriveKeys()` can return
  // undefined without throwing
  if (!derived) {
    throw new Error("Failed create encryption keys #5jKBfa");
  }

  // Create a cryptor from the derived keys
  const cryptor = Curve.createEncryptor(derived);

  return cryptor;
};

export const encryptToTwoKeys = (
  theirPublic: string,
  myPrivate: string,
  unencrypted: string
) => {
  const cryptor = getCryptor(theirPublic, myPrivate);

  // Encrypt the JSON encoded reply value
  const encrypted = cryptor.encrypt(unencrypted);

  return encrypted;
};

export const decryptFromTwoKeys = (
  theirPublic: string,
  myPrivate: string,
  encrypted: string
) => {
  const cryptor = getCryptor(theirPublic, myPrivate);

  const unencrypted = cryptor.decrypt(encrypted);

  return unencrypted;
};
