import {ec} from "elliptic";
import blakejs from "blakejs";
import {KeyPair} from "./keyPair";
import {encode, newAddress} from "@openworklabs/filecoin-address"
import {FilecoinNetwork} from "./index";

function createKeyPair(keypair: ec.KeyPair, network: FilecoinNetwork): KeyPair {
  const rawAddress = newAddress(1, blakejs.blake2b(new Uint8Array(keypair.getPublic("array")), new Uint8Array(), 20));
  const address = encode(network, rawAddress);
  return new KeyPair(
    keypair.getPublic("hex"),
    keypair.getPrivate("hex"),
    address
  );
}

export function keyPairFromPrivateKey(privateKey: Uint8Array, network: FilecoinNetwork): KeyPair {
  const e = new ec("secp256k1");
  return createKeyPair(e.keyFromPrivate(privateKey), network)
}

export function keyPairFromSeed(seed: string, network: FilecoinNetwork): KeyPair {
  const seedHash = blakejs.blake2bHex(seed, new Uint8Array(), 32);
  const e = new ec("secp256k1");
  return createKeyPair(e.keyFromPrivate(seedHash), network);
}