import {keyPairFromPrivateKey, keyPairFromSeed, publicKeyToAddress} from "../src";
import { expect } from "chai";
import {hexToU8a} from "../src/util";

describe('Test API functions', function () {

    // length constants
    const ADDRESS_LENGTH = 41;
    const PUB_KEY_LENGTH = 130;
    const PR_KEY_LENGTH = 64;

    // test keypair params
    const testPublicKey = "048bfab3a70675389cf61836a09d2dd7a61163905d88c0d507ed18a1b94e7119f3e36646cd711337f373b91814fe7258a58e2206273620f71254928389930abd70";
    const testPrivateKey = "663b1374b4ae5242ae51984a2c358e57e355c2a96b9cd9a0cde902cbc432fa79";
    const testAddress = "f1j5klxt6zktifpibt7jlafmdxkfe4fwjhm6yqjhq";
    const testSeed = "3a47b554c417b75545b5545545545e";

    describe('keyPairFromSeed', function () {
        it('should generate valid keypair from seed', function () {
            const generatedKeypair = keyPairFromSeed(testSeed, "f");
            // check if network prefix valid
            expect(generatedKeypair.address.startsWith("f")).to.be.true;
            // check if protocol identificator valid
            expect(generatedKeypair.address.slice(1, 2)).to.be.eq('1');
            // check if address valid
            expect(generatedKeypair.address.length).to.be.eq(ADDRESS_LENGTH);
            expect(generatedKeypair.address).to.be.eq(testAddress);
            // 04 prefix + 64 bytes
            expect(generatedKeypair.publicKey.length).to.be.eq(PUB_KEY_LENGTH);
            expect(generatedKeypair.publicKey).to.be.eq(testPublicKey);
            // 32 bytes
            expect(generatedKeypair.privateKey.length).to.be.eq(PR_KEY_LENGTH);
            expect(generatedKeypair.privateKey).to.be.eq(testPrivateKey);
        });

        it('should generate valid keys from any seed', function () {
            const shortSeedAddress = keyPairFromSeed("b53a47b554c41e51", "f");
            const longSeedAddress = keyPairFromSeed("b53a47b554c417b75545b5545545545e51", "f");

            expect(shortSeedAddress.address.length).eq(longSeedAddress.address.length);
            expect(shortSeedAddress.privateKey.length).eq(longSeedAddress.privateKey.length);
            expect(shortSeedAddress.publicKey.length).eq(longSeedAddress.publicKey.length);
        });
    });

    describe('keyPairFromPrivateKey', function () {
        it('should generate valid keypair from private key', function () {
            const generatedKeypair = keyPairFromPrivateKey(hexToU8a(testPrivateKey), "f");
            // check if network prefix valid
            expect(generatedKeypair.address.startsWith("f")).to.be.true;
            // check if protocol identificator valid
            expect(generatedKeypair.address.slice(1, 2)).to.be.eq('1');
            // check if address valid
            expect(generatedKeypair.address.length).to.be.eq(ADDRESS_LENGTH);
            expect(generatedKeypair.address).to.be.eq(testAddress);
            // 04 prefix + 64 bytes
            expect(generatedKeypair.publicKey.length).to.be.eq(PUB_KEY_LENGTH);
            expect(generatedKeypair.publicKey).to.be.eq(testPublicKey);
            // 32 bytes
            expect(generatedKeypair.privateKey.length).to.be.eq(PR_KEY_LENGTH);
            expect(generatedKeypair.privateKey).to.be.eq(testPrivateKey);
        });
    });

    describe('publicKeyToAddress', function () {
        it('should generate valid address for provided public key as hex string without prefix 0x', function () {
            const address = publicKeyToAddress(testPublicKey, "f");
            expect(address.length).to.be.eq(ADDRESS_LENGTH);
            expect(address).to.be.eq(testAddress);
        });

        it('should generate valid address for provided public key as hex string with prefix 0x', function () {
            const address = publicKeyToAddress(`0x${testPublicKey}`, "f");
            expect(address.length).to.be.eq(ADDRESS_LENGTH);
            expect(address).to.be.eq(testAddress);
        });

        it('should generate network specific valid address', function () {
            const fAddress = publicKeyToAddress(testPublicKey, "f");
            const tAddress = publicKeyToAddress(testPublicKey, "t");
            expect(fAddress.startsWith("f")).to.be.true;
            expect(fAddress.length).to.be.eq(ADDRESS_LENGTH);
            expect(tAddress.startsWith("t")).to.be.true;
            expect(tAddress.length).to.be.eq(ADDRESS_LENGTH);
        });
    });
});
