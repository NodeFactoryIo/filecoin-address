export class KeyPair {

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
