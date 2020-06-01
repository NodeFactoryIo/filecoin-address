import {addressFromSeed} from "../src";

describe('Test Address class', function () {
    it('should generate address from seed', function () {
        let address = addressFromSeed("b53a47b554c4f762d9f2aba1cb5d1c4a9de3a0baa6003d2173ed219588f11e51");
        console.log(address);
    });
});