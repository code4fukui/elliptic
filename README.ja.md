# Elliptic

高速な楕円曲線暗号化を提供するJavaScriptの実装です。

注意: 使用する楕円曲線を選ぶ際は、http://safecurves.cr.yp.to/ を参考にしてください。

## 使い方
楕円曲線のみを利用する場合:
```js
import EC from "https://code4fukui.github.io/elliptic/lib/elliptic/ec/index.js";
```

## ベンチマーク
Ellipticは他の楕円曲線暗号ライブラリと比べて高速です。詳しくは以下のベンチマーク結果をご確認ください:

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

## サポートされる楕円曲線
Elliptic.jsでは以下のタイプの楕円曲線がサポートされています:

* Short Weierstrass
* Montgomery
* Edwards 
* Twisted Edwards

ライブラリに組み込まれているプリセットの楕円曲線は以下の通りです:

* `secp256k1`
* `p192`
* `p224` 
* `p256`
* `p384`
* `p521`
* `curve25519`
* `ed25519`

注意: `curve25519`はECDSAに使用できません。代わりに`ed25519`を使用してください。

## ライセンス
このソフトウェアは MIT License の下にリリースされています。

Copyright Fedor Indutny, 2014.