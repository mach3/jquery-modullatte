# jQuery.Modullatte

## これはなに

[Modullatte](http://github.com/mach3/modullatte) をフロントで動くようにしたjQueryベースのライブラリです。
シンプルなHTMLモジュールをJavaScriptで実装します。

## 主な特徴

- 外部HTMLを指定した箇所へ読み込みます。
- 相対パスを書き換えます。

## 使い方

次のようなディレクトリ構成になっていると仮定します。

```
public_html/
	scripts/
	modules/
		navi.html
		...
	index.html
	foo.html
	
```

navi.html にモジュールの内容を書きます。

```html
<ul>
	<li><a href="../foo.html">foo</a></li>
</ul>
```

index.html では、好きな要素に data-module-src 属性を設定すると、
data-module-src のファイルの内容がこの要素と差し替わります。（元のdiv要素は削除されます）

```html
<!-- navi -->
<div data-module-src="./modules/navi.html"></div>
<!-- /navi -->

<script src="jquery.js"></script>
<script src="jquery-modullatte.js"></script>
```

相対パスが書き換わる為、次のようになります。

```html
<!-- navi -->
<ul>
	<li><a href="foo.html">foo</a></li>
</ul>
<!-- /navi -->
```

## その他の機能

### フェードイン

data-module-fadein 属性でモジュールをフェードインで表示させることが出来ます。

```html
<div data-module-src="./modules/navi.html" data-module-fadein="true"></div>
```

### モジュールロードイベント

全てのモジュールが読み込みを完了すると、 moduleload イベントがdocumentにて発火されます。
（404等でモジュールが正常にダウンロード出来なかった場合も発火しますので注意）

```javascript
$(document).on("moduleload", function(){
	alert("Modules loaded");
});
```

## 作者

mach3

- [Website](http://www.mach3.jp)
- [Blog](http://blog.mach3.jp)
- [Twitter](http://twitter.com/mach3ss)






