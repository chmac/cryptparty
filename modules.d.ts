declare module "chainpad-crypto" {
  interface KeyPairResult {
    publicKey: Uint8Array;
    secretKey: Uint8Array;
  }
  interface KeyPair {
    (): KeyPairResult;
    fromSecretKey(key: Uint8Array): KeyPairResult;
  }
  interface DerivedKeySet {
    cryptKey: string;
    signKey: string;
    validateKey: string;
  }
  interface Cryptor {
    encrypt(msg: string): string;
    decrypt(msg: string): string;
  }

  const keyPair: KeyPair;

  const module = {
    encrypt: (msg: string, key: Uint8Array) => string,
    decrypt: (msg: string, key: Uint8Array) => string,

    Nacl: {
      box: {
        keyPair: keyPair
      },
      util: {
        encodeBase64(input: Uint8Array): string;,
        decodeBase64(input: string): Uint8Array;
      }
    },

    Curve: {
      deriveKeys(theirPublicKey: string, myPrivateKey: string): DerivedKeySet;,
      createEncryptor(keys: DerivedKeySet): Cryptor;
    }
  };

  export = module;
}
