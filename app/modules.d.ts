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
      }
    },

    Curve: {
      deriveKeys(theirPublicKey: string, myPrivateKey: string): DerivedKeySet;,
      createEncryptor(keys: DerivedKeySet): Cryptor;
    }
  };

  export = any => module;
}

declare module "tweetnacl" {
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

  const module = {
    box: {
      keyPair: keyPair
    }
  };

  export = module;
}
