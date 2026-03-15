# Elliptic for Deno

Fast elliptic-curve cryptography in a plain JavaScript implementation.

NOTE: Please take a look at http://safecurves.cr.yp.to/ before choosing a curve
for your cryptography operations.

## Usage

for only EC, now
```js
import EC from "https://code4fukui.github.io/elliptic/lib/elliptic/ec/index.js";
```

## API

### ECDSA

```javascript
var EC = require('elliptic').ec;

// Create and initialize EC context
// (better do it once and reuse it)
var ec = new EC('secp256k1');

// Generate keys
var key = ec.genKeyPair();

// Sign the message's hash (input must be an array, or a hex-string)
var msgHash = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
var signature = key.sign(msgHash);

// Export DER encoded signature in Array
var derSign = signature.toDER();

// Verify signature
console.log(key.verify(msgHash, derSign));
```

### EdDSA

```javascript
var EdDSA = require('elliptic').eddsa;

// Create and initialize EdDSA context
// (better do it once and reuse it)
var ec = new EdDSA('ed25519');

// Create key pair from secret
var key = ec.keyFromSecret('693e3c...'); // hex string, array or Buffer

// Sign the message's hash (input must be an array, or a hex-string)
var msgHash = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
var signature = key.sign(msgHash).toHex();

// Verify signature
console.log(key.verify(msgHash, signature));
```

### ECDH

```javascript
var EC = require('elliptic').ec;
var ec = new EC('curve25519');

// Generate keys
var key1 = ec.genKeyPair();
var key2 = ec.genKeyPair();

var shared1 = key1.derive(key2.getPublic());
var shared2 = key2.derive(key1.getPublic());

console.log('Both shared secrets are BN instances');
console.log(shared1.toString(16));
console.log(shared2.toString(16));
```

## Supported curves

Elliptic.js support following curve types:

* Short Weierstrass
* Montgomery
* Edwards
* Twisted Edwards

Following curve 'presets' are embedded into the library:

* `secp256k1`
* `p192`
* `p224`
* `p256`
* `p384`
* `p521`
* `curve25519`
* `ed25519`

NOTE: That `curve25519` could not be used for ECDSA, use `ed25519` instead.

## License

This software is licensed under the MIT License.

Copyright Fedor Indutny, 2014.