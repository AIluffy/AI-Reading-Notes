# CSS样式表与CSS规则

## CSS样式表概览

通过使用HTMLLinkElement节点引入外部样式表,或者使用HTMLStyleElement节点来定义内部样式表,都可以添加样式表到HTML文档.

一有样式表添加到HTML文档中,它即表示为CSSStyleSheet对象. 样式表里每条CSS规则都表示为一个CSSStyleRule对象.

```html
<style id="styleElement">
body{color: #000;}
</style>

<script>
document.querySelector('#styleElement').sheet.constructor;  // CSSStyleSheet

document.querySelector("#styleElement").sheet.cssRules[0].constructor;  // CSSStyleRule
</script>
```

## 访问DOM中所有样式表(即CSSStyleSheet对象)

document.styleSheets提供了一个包含HTML文档中所有样式表对象(即CSSStyleSheet对象)列表的访问方式,包括显示链接(link)和内嵌(style).

```html
<link href="">
<style>
body {}
</style>

<script>
document.styleSheets.length   // 2
document.styleSheets[0]  // link
document.styleSheets[1]  // style
</script>
```

>styleSheets是实时的

访问HTML文档中的单个样式表可以选取DOM中的元素(link或style)再使用.sheet属性获取CSSStyleSheet对象的访问.

## CSSStyleSheet属性与方法

- disabled
- href
- media
- ownerNode
- parentStyleSheet
- title
- type
- cssRules
- ownerRule
- deleteRule
- insertRule

>href,media,ownerNode,parentStyleSheet,title及type都是只读属性.你不能为它们设置新值.

## CSSStyleRule

```html
<style>
body{color: red;}
p{color: red;}
</style>

<script>
var sSheet = document.querySelector('style').sheet;

sSheet.cssRules[0].cssText;  //body{color: red;}
sheet.cssRules[1].cssText;  //p{color: red;}
</script>
```

## CSSSTyleRule属性与方法

- cssText
- parentRule
- parentStyleSheet
- selectorText
- style
- type

## 使用cssRules获取样式表内的CSS规则列表

styleSheets列表提供了文档中所含样式表清单.而cssRules列表提供了某个特定样式表中的CSS规则(CSSStyleRule对象)组成的列表(cssRulesList)

```javascript
var sSheet = document.querySelector('style').sheet

// 类数组列表,包含所有CSSRule对象,代表了样式表中的每条CSS规则.
sSheet.cssRules;
```

## 使用insertRule()和deleteRule()来插入与删除样式表中的CSS规则

```javascript
// 在行内样式表索引1的位置添加新规则
document.querySelector('style').sheet.insertRule('p{color: red}', 1)

document.querySelector('style').sheet.deleteRule(1);
```

## 使用.style属性修改CSSStyleRule的值

正如我们有.style属性用于操作元素节点上的内联样式,我们在CSSStyleRule对象上也有.style属性编排了在样式表上做相同的操作.

```javascript
var styleSheet = document.querySelector('style').sheet;

styleSheet.cssRules[0].style.color = 'red';
```

## 创建新的内联CSS样式表

```javascript
var styleElm = document.createElement('style');
styleElm.innerHTML = 'body{color:red}';
```

## 以编程方式添加外部样式表到HTML文档

```javascript
var linkElm = document.createElement('link');
linkElm.setAttribute('type', 'text/css');
linkElm.setAttribute('href', 'httP://XXX.css');
```

## 用.disabled属性使样式表失效/生效

```javascript
document.querySelector(style).disabled = true;
```