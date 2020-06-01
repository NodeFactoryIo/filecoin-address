import {ec} from "elliptic";
import blake from "blakejs"

export class Address {

  private readonly _publicKey: string;
  private readonly _privateKey: string;
  private readonly _address: string;

  public get publicKey(): string {
    return this._publicKey;
  }

  public get privateKey(): string {
    return this._privateKey;
  }

  public get address(): string {
    return this._address;
  }

  public constructor(publicKey: string, privateKey: string, address: string) {
    this._publicKey = publicKey;
    this._privateKey = privateKey;
    this._address = address;
  }
}

export function addressFromPrivateKey(privateKey: Uint8Array): Address {

  const e = new ec("secp256k1");
  const keypair: ec.KeyPair = e.keyFromPrivate(privateKey);
  return new Address(
    keypair.getPublic("hex"),
    keypair.getPrivate("hex"),
    blake.blake2bHex(new Uint8Array(keypair.getPublic("array")), [], 20)
  );
}

export function addressFromSeed(seed: string): Address {
  const e = new ec("secp256k1");
  // TODO first calculate seed hash
  const keypair: ec.KeyPair = e.keyFromPrivate(seed);
  return new Address(
    keypair.getPublic("hex"),
    keypair.getPrivate("hex"),
    blake.blake2bHex(new Uint8Array(keypair.getPublic("array")), [], 20)
  );
}