declare module "@openworklabs/filecoin-address" {
  import {FilecoinNetwork} from "../../index";

  export interface Address {
    protocol: () => string;
    payload: () => string;
  }


  export function newAddress(protocol: number, payload: Uint8Array): Address;
  export function newFromString(arg: string): Address;
  export function decode(address: string);
  export function encode(network: FilecoinNetwork, address: Address): string;
  // export function getChecksum();
  // export function validateChecksum();
  // export function validateAddressString();
  // export function checkAddressString();
}
