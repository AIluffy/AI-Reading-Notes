# DocumentFragment节点

## DocumentFragment对象概览

创建与使用DocumentFragment节点，可在实时DOM树之外提供一个轻量的文档DOM树。把DocumentFragment看作一个空的文档模板，行为与实时DOM树相仿，但仅在内存中存在，并且它的子节点可以很简单的在内存中操作，而后附加到实时DOM。

## 使用createDocumentFragment()创建DocumentFragment

```javascript
document.createDocumentFragment();
```

使用文档片段与直接创建div的不同：

- 文档片段可以包含任意类型的节点（除了body与html），而元素可能不行。
- 当你附加文档片段到DOM时，它自身并不会被添加。这与附加元素节点相反，元素节点会跟着附加操作一并添加到DOM中。
- 当文档片段被附加到DOM中时，它从文档片段传输内容至它被附加的位置。而自身不再存在于你创建它时所在的位置。对用来临时包含节点，而后移动到实时DOM树的元素节点来说就不是这情况了。

## 添加DocumentFragment到实时DOM

当你将文档片段作为参数传给appendChild()或insertBefore()时，文档片段的子节点将被传输成为调用这些方法的DOM节点的子节点。

>文档片段作为插入节点方法参数时，将插入整个子节点结构，但会忽略文档片段节点自身。

## 使用文档片段上的innerHTML

innerHTML在文档片段上不管用，然后用div的innerHTML属性通过一段HTML字符串更新文档片段。

```javascript
// 创建一个div和文档片段
var divELm = document.createElement('div');
var docFrag = document.createDocumentFragment();

// 附加div到文档片段
docFrag.appendChild(divELm);

// 从字符串创建一个文档结构
docFrag.queryselector('div').innerHTML = '<p>hi</p>';

// 附加,从div所含的第一个子节点开始
document.queryselector('div').appendChild(docFrag.queryselector('div').firstChild);
```

## 通过复制将片段所含节点保留在内存中

```javascript
// 创建一个div和文档片段
var divELm = document.createElement('div');
var docFrag = document.createDocumentFragment();

divELm.appendChild(docFrag.cloneNode(true));
```