# filecoin-address

Provides functions for generation of keypairs and [protocol-1](https://filecoin-project.github.io/specs/#protocol-1-libsecpk1-elliptic-curve-public-keys) addresses for filecoin network.

## Usage

`yarn add @nodefactory/filecoin-address`

## API

```typescript
function keyPairFromPrivateKey(privateKey: Uint8Array | string, network?: FilecoinNetwork): KeyPair
```

Creates `KeyPair` from provided private key. Return value `KeyPair` has `string` readonly properties _publicKey_, _privateKey_, _address_.

---

```typescript
function keyPairFromSeed(seed: string, network?: FilecoinNetwork): KeyPair
```

Creates `KeyPair` from provided `string` seed. Return value `KeyPair` has `string` readonly properties _publicKey_, _privateKey_, _address_.

---

```typescript
function publicKeyToAddress(publicKey: Uint8Array | string, network?: FilecoinNetwork): string
```

Returns address for provided public key as **hex** `string` or `Uint8Array`.

---

### network

Every functions has optional parameter `network` that can be `"f"` _(representing filecoin mainnet)_ or `"t"` _(representing filecoin testnet)_

If `network` is omitted on invocation, address is returned as `string` representing raw address that is not encoded (_structure below_).

```
|----------|---------------------|
| protocol |        payload      |
|----------|---------------------|
|    1     | blake2b-160(PubKey) |
```

If network is provided, address is encoded and returned as `string` (_structure below_).

```
|------------|----------|---------------------|----------|
|  network   | protocol |      payload        | checksum |
|------------|----------|---------------------|----------|
| 'f' or 't' |    '1'   | blake2b-160(PubKey) |  4 bytes |
                  base32[................................]
```

## Example

#### keyPairFromPrivateKey
```typescript
import {keyPairFromPrivateKey} from "filecoin-address";

const generatedKeypair = keyPairFromPrivateKey(privateKeyAsUint8ArrayOrString, "f");

console.log(generatedKeypair.publicKey);
// 048bfab3a70675389cf61836a09d2dd7a61163905d88c0d507ed18a1b94e7119f3e36646cd711337f373b91814fe7258a58e2206273620f71254928389930abd70

console.log(generatedKeypair.privateKey);
// 663b1374b4ae5242ae51984a2c358e57e355c2a96b9cd9a0cde902cbc432fa79

console.log(generatedKeypair.address);
// f1j5klxt6zktifpibt7jlafmdxkfe4fwjhm6yqjhq
```

#### keyPairFromSeed
```typescript
import {keyPairFromSeed} from "filecoin-address";

const generatedKeypair = keyPairFromSeed("3a47b554c417b75545b5545545545e", "f");

console.log(generatedKeypair.publicKey);
// 048bfab3a70675389cf61836a09d2dd7a61163905d88c0d507ed18a1b94e7119f3e36646cd711337f373b91814fe7258a58e2206273620f71254928389930abd70

console.log(generatedKeypair.privateKey);
// 663b1374b4ae5242ae51984a2c358e57e355c2a96b9cd9a0cde902cbc432fa79

console.log(generatedKeypair.address);
// f1j5klxt6zktifpibt7jlafmdxkfe4fwjhm6yqjhq
```

#### publicKeyToAddress
```typescript
import {publicKeyToAddress} from "filecoin-address";

const address = publicKeyToAddress(publicKeyAsUint8ArrayOrString, "f");

console.log(address);
// f1j5klxt6zktifpibt7jlafmdxkfe4fwjhm6yqjhq
```

## Developed by
![NodeFactory](banner.png)
