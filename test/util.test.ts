import { expect } from "chai";
import {hexToU8a, u8aToHex} from "../src/util";

describe('Test util functions', function () {
    describe('u8aToHex', function () {
        it('should convert uint8array to hex string without prefix 0x', function () {
            expect(u8aToHex(new Uint8Array([128, 0, 10]))).to.be.eq("80000a")
        });

        it('should convert uint8array to hex string with prefix 0x', function () {
            expect(u8aToHex(new Uint8Array([128, 0, 10]), true)).to.be.eq("0x80000a")
        });
    });

    describe('hexToU8a', function () {
        it('should convert valid hex string with 0x prefix to Uint8Array', function () {
            expect(hexToU8a("0x80000a")).to.be.deep.eq(new Uint8Array([128, 0, 10]));
        });

        it('should convert valid hex string without 0x prefix to Uint8Array', function () {
            expect(hexToU8a("80000a")).to.be.deep.eq(new Uint8Array([128, 0, 10]));
        });

        it('should fail on invalid hex string', function () {
            expect(() => hexToU8a("")).to.throw;
            expect(() => hexToU8a("Y2Y")).to.throw;
            expect(() => hexToU8a("0xY2Y")).to.throw;
        });
    });
});