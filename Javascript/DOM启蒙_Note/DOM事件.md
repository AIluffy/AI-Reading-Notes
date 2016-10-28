# DOM事件

## 事件流程

1. 捕获阶段(从DOM树主干到分支)
2. 冒泡阶段(从DOM树分支到主干)

由于浏览器缺乏对捕捉阶段的支持,此阶段并不常用. 一般而言,都假定时间在冒泡阶段触发.

>传给事件监听函数的事件对象有个eventPhase属性,内含一个数字表示事件是在哪个阶段触发的.数值1表示在捕捉阶段.数值2表示在目标阶段.数值3表示在冒泡阶段.

## 添加事件监听函数到Element节点,window对象及document对象

addEventListener()方法在所有Element节点,window对象及document对象上都可用,它提供了为HTML文档中的各个部分以及与DOM或者浏览器对象模型有关的JavaScript对象添加事件监听函数的能力.

## 移除事件监听函数

```javascript
var sayHi = function(){console.log('hi')};

// 使用匿名函数添加事件监听
document.body.addEventListener('click', function(){console.log('dude')}, false);

// 使用函数引用添加事件监听
document.body.addEventListener('click', sayHi, false);

// 尝试移除事件监听,不过只能移除通过函数引用形式添加的事件监听函数
document.body.removeEventListener('click', sayHi, false);

// 这么做自然行不通,因为传给removeEventListener()的函数已经是个新的不同的函数
document.body.removeEventListener('click', function() {}. false);
```

## 使用addEventListener()时监听函数中this的值

传给addEventListener()方法的事件监听函数中this的值,将会指向事件所绑定的节点或对象.此外,还可以用event.currentTarget属性,在节点或对象的事件监听函数中,获取等同this所供值的引用.

## 事件调用时取得事件模板而不是所绑定的节点或对象

因为事件流程,可以点击body元素中所含的div,并触发绑定在body元素上的点击事件监听函数被调用.当它发生时,传入绑定到body的事件监听函数的事件对象提供了一个事件原始发生时所在的节点或对象的引用.-------->event.target.

## 使用preventDefault()撤销浏览器默认事件

```javascript
document.body.addEventListener('click', function(e) {
    e.preventDefault();
});
```

>preventDefault()方法并不阻止事件传播(即冒泡或捕获阶段).
>
>在事件监听函数末尾提供一句return false和调用preventDefault()方法有相同效果.

## 使用stopPropagation()终止事件流程

在事件处理程序,监听函数内调用stopPropagation()将终止捕捉和冒泡事件流程,但直接绑定到该节点或对象的监听函数仍会被调用.

## 使用stopImmediatePropagation()终止事件流程与相同目标上的其他事件

## 事件委托

事件委托,简而言之,是一项利用事件流程的编程方法,利用单个事件监听处理多个事件目标.事件委托的副作用是,在绑定事件时,DOM中不需要事件目标一定存在相应该事件.通过实现事件委托,在JavaScript加载解析完成之后才添加到DOM的新内容就可以立即响应这些事件了.

```html
<table>
<tr><td>1</td><td>2</td></tr>
<tr><td>1</td><td>2</td></tr>
<tr><td>1</td><td>2</td></tr>
<tr><td>1</td><td>2</td></tr>
</table>

<script>
document.querySelector('table').addEventListener('click', function(e) {
    if (e.target.tagName.toLowerCase() === 'td') {
        console.log(e.target.textContent);
    }
});
</script>
```

如果我们要更新代码示例中的表格,添加一些新行,那么它们将在渲染到屏幕时即相应click事件.