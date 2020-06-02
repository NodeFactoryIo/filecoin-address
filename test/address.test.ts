import {keyPairFromSeed} from "../src";
import { expect } from "chai";

describe('Test keypair from seed generation', function () {

    it('should generate valid keypair from seed', function () {
        const generatedKeypair = keyPairFromSeed("3a47b554c417b75545b5545545545e", "f");
        // check if network prefix valid
        expect(generatedKeypair.address.startsWith("f")).to.be.true;
        // check if protocol identificator valid
        expect(generatedKeypair.address.slice(1, 2)).to.be.eq('1');
        // check if address valid
        expect(generatedKeypair.address.length).to.be.eq(41);
        // 04 prefix + 64 bytes
        expect(generatedKeypair.publicKey.length).to.be.eq(130);
        // 32 bytes
        expect(generatedKeypair.privateKey.length).to.be.eq(64);
    });

    it('should generate valid keys from any seed', function () {
        const shortSeedAddress = keyPairFromSeed("b53a47b554c41e51", "f");
        const longSeedAddress = keyPairFromSeed("b53a47b554c417b75545b5545545545e51", "f");

        expect(shortSeedAddress.address.length).eq(longSeedAddress.address.length);
        expect(shortSeedAddress.privateKey.length).eq(longSeedAddress.privateKey.length);
        expect(shortSeedAddress.publicKey.length).eq(longSeedAddress.publicKey.length);
    });

});
