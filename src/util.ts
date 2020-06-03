export function u8aToHex(u8a: Uint8Array, prefix?: boolean): string {
  return `${prefix ? '0x' : ''}${Buffer.from(u8a).toString("hex")}`;
}

const HEX_REGEX = /^(0x)?[a-fA-F0-9]+$/;

export function hexToU8a(hex: string): Uint8Array {
  if (!HEX_REGEX.test(hex)) {
    throw new Error("Provided string is not valid hex value");
  }
  const value = hex.startsWith("0x") ? hex.slice(2) : hex;
  const valLength = value.length / 2;
  const bufLength = Math.ceil(valLength);
  const result = new Uint8Array(bufLength);
  const offset = Math.max(0, bufLength - valLength);
  // convert value to hex string
  for (let index = 0; index < bufLength; index++) {
    result[index + offset] = parseInt(value.substr(index * 2, 2), 16);
  }
  // return hex string
  return result;
}
