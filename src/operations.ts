import {ec} from "elliptic";
import blakejs from "blakejs";
import {KeyPair} from "./keyPair";
import {Address, encode, newAddress} from "@openworklabs/filecoin-address"
import {FilecoinNetwork} from "./index";
import {hexToU8a} from "./util";

/**
 * Creates KeyPair from private key.
 *
 * If network is not provided, returned address is not encoded.
 *
 * @param privateKey - as Uint8Array or hex string
 * @param network - "f" or "t"
 */
export function keyPairFromPrivateKey(privateKey: Uint8Array | string, network?: FilecoinNetwork): KeyPair {
  const pk: Uint8Array = typeof privateKey === "string" ? hexToU8a(privateKey) : privateKey;
  const e = new ec("secp256k1");
  return createKeyPair(e.keyFromPrivate(pk), network)
}

/**
 * Creates KeyPair from string seed.
 *
 * If network is not provided, returned address is not encoded.
 *
 * @param seed
 * @param network - "f" or "t"
 */
export function keyPairFromSeed(seed: string, network?: FilecoinNetwork): KeyPair {
  const seedHash = blakejs.blake2bHex(seed, null, 32);
  const e = new ec("secp256k1");
  return createKeyPair(e.keyFromPrivate(seedHash), network);
}

/**
 * Returns address from public key.
 *
 * If network is not provided, returned address is not encoded.
 *
 * @param publicKey - as Uint8Array or hex string
 * @param network - "f" or "t"
 */
export function publicKeyToAddress(publicKey: Uint8Array | string, network?: FilecoinNetwork): string {
  const pk: Uint8Array = typeof publicKey === "string" ? hexToU8a(publicKey) : publicKey;
  const rawAddress: Address = newAddress(1, blakejs.blake2b(pk, null, 20));
  return network ? encode(network, rawAddress) : `${rawAddress.protocol()}${rawAddress.payload()}`;
}

// transforms elliptic KeyPair to our defined KeyPair class
function createKeyPair(keypair: ec.KeyPair, network?: FilecoinNetwork): KeyPair {
  const rawAddress = newAddress(1, blakejs.blake2b(new Uint8Array(keypair.getPublic("array")), null, 20));
  const address: string = network ? encode(network, rawAddress) : `${rawAddress.protocol()}${rawAddress.payload()}`;
  return new KeyPair(
    keypair.getPublic("hex"),
    keypair.getPrivate("hex"),
    address
  );
}
