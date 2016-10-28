# DOM中的Javascript

## 插入与执行Javascript概览

```javascript
// 引入外部脚本,可以跨域
<script src="http://XX.js" />

// 内联脚本
<script> console.log(1) </script>
```

>试图用同一个script元素引入外部Javascript文件并且在它里面编写页面内联JavaScript,将导致该页面内联JavaScript被忽略,而引入的外部JavaScript文件会被下载并执行.
>
>如果JavaScript代码包含字符串'script',你需要转义闭'/'成'<\/script>',使得解析器不会将它看作真正的script闭合标签.

## JavaScript默认同步解析

默认情况下,当DOM在解析且它遇到一个script元素时,它将停止解析文档,阻止任何进一步的渲染与下载,并执行该JavaScript.因此此行为是阻塞的,并且不允许并行解析DOM或者执行JavaScript,所以它可以被认为是同步的.如果JavaScript是HTML文档外部的,那这阻塞更加严重,因为JavaScript必须先下载才能解析.

```javascript
// 停止文档解析,阻塞文档解析,加载JS,执行JS,然后继续文档解析
<script src="http://xx.js" />

// 停止文档解析,阻塞文档解析,执行JS,然后继续文档解析..
<script> console.log(1) </script>
```

> script元素默认的阻塞天性会对HTML网页的性能与视觉渲染的感知性能有显著影响.如果你在HTML页头有一些脚本元素,在它们挨个下载,执行完毕之前,任何事情都不会发送.

## 使用defer推迟外部脚本的下载与执行

script元素有个属性叫作defer,将推迟外部JavaScript文件的阻塞,下载与执行,直到浏览器完成解析并关闭html节点.

```javascript
// 推迟,不要阻塞,在html元素节点解析完之前暂时忽略此外部JS
<script defer src="http://jquery.js" /></script>

<script>
// 我们直到此脚本在html元素关闭之前就执行了,此时jQuery还用不上.
window['jQuery'] === undefined   // true

// 直到所有资源都加载完毕,我们才能妥妥的下结论说jQuery解析且加载完毕
document.body.onload = function(){console.log(jQuery().jquery)};
</script>
```

>**使用defer,有个前提就是document.write()不会在被推迟的JavaScript中使用.**

## 使用async异步下载并执行外部JavaScript文件

script元素有个属性叫作async,可以覆盖script元素在Web浏览器构造DOM时默认的顺序,阻塞加载的天性.通过使用此属性, 我们告诉浏览器不要阻塞HTML页面的构建(即DOM解析,包括下载其他诸如图片,样式等资源文件)并且放弃顺序加载.

当使用async属性,文件是被加载的,并且按它们下载完毕的顺序解析.

```javascript
// 不要阻塞,尽管开始下载,下载完了就开始解析文件
<script async src="http://xx.js" >

// 不要阻塞,尽管开始下载,下载完了就开始解析文件
<script async src="http://jquery.js" >

<script>
// 我们完全不知道jQuery此时是否加载好了, 很可能还没有
window['jQuery'] === undefined   // true

// 直到所有资源都加载完毕,我们才能妥妥的下结论说jQuery解析且加载完毕
document.body.onload = function(){console.log(jQuery().jquery)};
</script>
```

>使用async的一个主要缺点是,JavaScript可能完全不按它们在DOM中引入的顺序解析.这引起依赖管理问题.
>
>使用async,前提是没有在异步加载的脚本中使用的document.write()
>
>如果同时在script元素上使用两者,async属性会压过defer

## 使用动态script元素强制异步加载并解析外部JavaScript

强制Web浏览器在不使用async属性的情况下仍然异步下载并解析JavaScript---->**以编程方式创建script元素,引入外部JavaScript文件,并添加它们到DOM.**

```html
<body>
<script>
// 不要阻塞,尽管开始下载,下载完了就开始解析文件
var jqueryScript = document.createElement('script');
jqueryScript.src = "http://jquery.js";
document.body.appendChild(jqueryScript);
</script>

<script>
// 直到所有资源都加载完毕,我们才能妥妥的下结论说jQuery解析且加载完毕
document.body.onload = function(){console.log(jQuery().jquery)};
</script>
</body>
```

>使用动态script元素的一个主要缺点是,JavaScript可能完全不按它们在DOM中引入的顺序解析.这引起依赖管理问题.

## 通过给异步script加onload回调从而知道它们何时加载完毕

script元素支持一个加载事件处理程序(onload),一旦外部JavaScript文件被加载并执行完毕,此回调即执行.

```html
<body>
// 不要阻塞,尽管开始下载,下载完了就开始解析文件
<script>
var jqueryScript = document.createElement('script');
jqueryScript.src = "http://jquery.js";

jqueryScript.onload = function() {console.log('jquery加载完毕')};

document.body.appendChild(jqueryScript);
</script>

<script async src="http://jquery.js" onload="console.log('jquery加载完毕')" />
</body>
```

## 注意含有DOM操作的script的放置

```html
<head>
<script>
//  我们还不能碰body元素,它是null,都还没被浏览器解析,它还没在DOM树里
console.log(document.body.innerHTML);  // logs Uncaught TypeError: Cannotread
</head>
```

## 获取DOM中script列表

```javascript
Array.prototype.slice.call(document.scripts).forEach(function(elm) {
    console.log(elm, elm.src);
})   // 返回一个HTMLCollection
```