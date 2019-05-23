/// <reference path="../../../modules.d.ts"/>
import cryptoFactory from "chainpad-crypto";
import Nacl from "tweetnacl";
import { encodeURLSafe, decodeURLSafe } from "@stablelib/base64";

// const { Curve, Nacl } = crypto;
const crypto = cryptoFactory(Nacl);
const { Curve } = crypto;

export const createInvitation = () => {
  const content = window.prompt("Enter your invitation text") || "";
  // Create a keypair
  const keys = Nacl.box.keyPair();
  // Encrypt the content to the public key
  const encrypted: string = crypto.encrypt(content, keys.secretKey);
  const base64secret: string = encodeURLSafe(keys.secretKey);
  console.log("key, encrypted #WalxgY", base64secret, encrypted);

  (window as any).encrypted = encrypted;
  (window as any).base64secret = base64secret;

  // Save the encrypted content in a package to redux

  // Create a keypair
  const newKeys = Nacl.box.keyPair();

  // Create a set of derived keys
  const derived = Curve.deriveKeys(
    encodeURLSafe(keys.publicKey),
    encodeURLSafe(newKeys.secretKey)
  );

  const name = window.prompt("Invitee") || "";

  const cryptor = Curve.createEncryptor(derived);

  const inviteeMessage = cryptor.encrypt(JSON.stringify({ content, name }));

  console.log(
    "invitee #TmR93I",
    encodeURLSafe(keys.publicKey),
    encodeURLSafe(newKeys.secretKey),
    inviteeMessage
  );
};

export const addInvitee = (
  secret: string,
  hostPublicKey: string,
  encrypted: string
) => {};

export const decryptInvite = (
  secret: string,
  hostPublicKey: string,
  encrypted: string
) => {
  // const keys = Nacl.box.keyPair.fromSecretKey(Nacl.util.decodeBase64(secret));
  const derived = Curve.deriveKeys(hostPublicKey, secret);
  const cryptor = Curve.createEncryptor(derived);

  // This is the wrong decrypt(), we need the Cryptor.decrypt() instead
  const message = cryptor.decrypt(encrypted);

  console.log("got message #vDkUpd", message);
};
(window as any).decryptInvite = decryptInvite;
