# Elliptic

プレーンなJavaScript実装による高速な楕円曲線暗号。

**注意:** 暗号化処理に使用する曲線を選択する前に、http://safecurves.cr.yp.to/ を確認してください。

## 使用方法

### Node.js

ライブラリのインストール:
```bash
npm install elliptic
```

その後、requireして使用します:
```javascript
var EC = require('elliptic').ec;
var ec = new EC('secp256k1');
```

### Deno / ブラウザ (ESM)
```js
import EC from "https://code4fukui.github.io/elliptic/lib/elliptic/ec/index.js";
var ec = new EC('secp256k1');
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
// => true
```

### EdDSA

```javascript
var EdDSA = require('elliptic').eddsa;

// Create and initialize EdDSA context
// (better do it once and reuse it)
var ed = new EdDSA('ed25519');

// Create key pair from secret
var key = ed.keyFromSecret('693e3c...'); // hex string, array or Buffer

// Sign the message's hash (input must be an array, or a hex-string)
var msgHash = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
var signature = key.sign(msgHash).toHex();

// Verify signature
console.log(key.verify(msgHash, signature));
// => true
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

## サポートする曲線

Elliptic.jsは以下の曲線タイプをサポートしています:

*   Short Weierstrass (ショート・ワイエルシュトラス)
*   Montgomery (モンゴメリー)
*   Edwards (エドワーズ)
*   Twisted Edwards (ツイスト・エドワーズ)

以下の曲線プリセットがライブラリに組み込まれています:

*   `secp256k1`
*   `p192`
*   `p224`
*   `p256`
*   `p384`
*   `p521`
*   `curve25519`
*   `ed25519`

**注意:** `curve25519`はECDSAには使用できません。署名には`ed25519`を使用してください。

## ベンチマーク

`elliptic`は他のJavaScript ECCライブラリよりもはるかに高速です。

```bash
Benchmarking: sign
elliptic#sign x 262 ops/sec ±0.51% (177 runs sampled)
eccjs#sign x 55.91 ops/sec ±0.90% (144 runs sampled)
------------------------
Fastest is elliptic#sign
========================
Benchmarking: verify
elliptic#verify x 113 ops/sec ±0.50% (166 runs sampled)
eccjs#verify x 48.56 ops/sec ±0.36% (125 runs sampled)
------------------------
Fastest is elliptic#verify
========================
Benchmarking: gen
elliptic#gen x 294 ops/sec ±0.43% (176 runs sampled)
eccjs#gen x 62.25 ops/sec ±0.63% (129 runs sampled)
------------------------
Fastest is elliptic#gen
========================
Benchmarking: ecdh
elliptic#ecdh x 136 ops/sec ±0.85% (156 runs sampled)
------------------------
Fastest is elliptic#ecdh
========================
```

## ライセンス

MIT License — 詳細は [LICENSE](LICENSE) を参照してください。

Copyright Fedor Indutny, 2014.
