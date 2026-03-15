# Elliptic for Deno

プレーンなJavaScriptの実装による高速な楕円曲線暗号化。

注意: 暗号化に使用する楕円曲線を選ぶ際は、http://safecurves.cr.yp.to/ を参考にしてください。

## 使い方
楕円曲線のみ利用する場合:
```js
import EC from "https://code4fukui.github.io/elliptic/lib/elliptic/ec/index.js";
```

## 動機
ECCは通常のRSA暗号よりも遅く、JavaScriptの実装はさらに遅くなります。

## ベンチマーク
```bash
$ node benchmarks/index.js
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

## API

### ECDSA

```javascript
var EC = require('elliptic').ec;

// ECコンテキストを作成・初期化する
// (一度行えば、再利用可能)
var ec = new EC('secp256k1');

// 鍵を生成する
var key = ec.genKeyPair();

// メッセージのハッシュに署名する (入力は配列またはHEX文字列)
var msgHash = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
var signature = key.sign(msgHash);

// DER形式の署名をArrayでエクスポートする
var derSign = signature.toDER();

// 署名を検証する
console.log(key.verify(msgHash, derSign));

// 秘密鍵なしで検証する

var pubPoint = key.getPublic();
var x = pubPoint.getX();
var y = pubPoint.getY();

// 公開鍵は以下のいずれかの形式でなければならない:
// 1) '04' + xのHEX文字列 + yのHEX文字列
// 2) xとyがHEX文字列のプロパティである
// 3) xとyがBufferのプロパティである

var pub = pubPoint.encode('hex');                                 // case 1
var pub = { x: x.toString('hex'), y: y.toString('hex') };         // case 2
var pub = { x: x.toBuffer(), y: y.toBuffer() };                   // case 3

// 公開鍵をインポートする
var key = ec.keyFromPublic(pub, 'hex');

// 署名は以下のいずれかの形式でなければならない:
// 1) DER形式の署名をHEX文字列で
// 2) DER形式の署名をBufferで
// 3) rとsがHEX文字列のプロパティである
// 4) rとsがBufferのプロパティである

var signature = '3046022100...'; // case 1
var signature = new Buffer('...'); // case 2
var signature = { r: 'b1fc...', s: '9c42...' }; // case 3

// 署名を検証する
console.log(key.verify(msgHash, signature));
```

### EdDSA

```javascript
var EdDSA = require('elliptic').eddsa;

// EdDSAコンテキストを作成・初期化する
// (一度行えば、再利用可能)
var ec = new EdDSA('ed25519');

// 秘密鍵からキーペアを作成する
var key = ec.keyFromSecret('693e3c...'); // HEX文字列、配列またはBuffer

// メッセージのハッシュに署名する (入力は配列またはHEX文字列)
var msgHash = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
var signature = key.sign(msgHash).toHex();

// 署名を検証する
console.log(key.verify(msgHash, signature));

// 秘密鍵なしで検証する

// 公開鍵をインポートする
var pub = '0a1af638...';
var key = ec.keyFromPublic(pub, 'hex');

// 署名を検証する
var signature = '70bed1...';
console.log(key.verify(msgHash, signature));
```

### ECDH

```javascript
var EC = require('elliptic').ec;
var ec = new EC('curve25519');

// 鍵を生成する
var key1 = ec.genKeyPair();
var key2 = ec.genKeyPair();

var shared1 = key1.derive(key2.getPublic());
var shared2 = key2.derive(key1.getPublic());

console.log('Both shared secrets are BN instances');
console.log(shared1.toString(16));
console.log(shared2.toString(16));
```

複数のメンバーの場合:
```javascript
var EC = require('elliptic').ec;
var ec = new EC('curve25519');

var A = ec.genKeyPair();
var B = ec.genKeyPair();
var C = ec.genKeyPair();

var AB = A.getPublic().mul(B.getPrivate())
var BC = B.getPublic().mul(C.getPrivate())
var CA = C.getPublic().mul(A.getPrivate())

var ABC = AB.mul(C.getPrivate())
var BCA = BC.mul(A.getPrivate())
var CAB = CA.mul(B.getPrivate())

console.log(ABC.getX().toString(16))
console.log(BCA.getX().toString(16))
console.log(CAB.getX().toString(16))
```

注意: `.derive()` は [BN][1] インスタンスを返します。

## サポートされる楕円曲線

Elliptic.jsは以下の楕円曲線タイプをサポートしています:

* Short Weierstrass
* Montgomery
* Edwards
* Twisted Edwards

ライブラリに組み込まれている楕円曲線のプリセットは以下の通りです:

* `secp256k1`
* `p192`
* `p224`
* `p256`
* `p384`
* `p521`
* `curve25519`
* `ed25519`

注意: `curve25519`はECDSAには使えません。代わりに`ed25519`を使ってください。