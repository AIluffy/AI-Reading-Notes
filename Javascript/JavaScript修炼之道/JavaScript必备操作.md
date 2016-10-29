# JavaScript必备操作

## 动态选择方法及属性

根据某个条件来调用两个方法中的一个，或是在两个属性中的一个上面进行读写操作。一般如下：

```JavaScript
if (conditon) {
    myObj.method1(someArg);
} else {
    myObj.method2(someArg);
}
```

JavaScript可以使用方括号操作符（[]）来动态地选择方法和属性。

```JavaScript
// 切换行为
element[shouldBeVisible ? 'show' : 'hide']();

// 拼接方法名称
element[(enable ? 'add' : 'remove') + 'ClassName']('enabled');
```

注：**如果在想方法传递的参数上大量使用此类技巧，混乱的括号有可能会使代码变得难以阅读，此时，使用常规的if/else更加明智。**

## 通过模块模式实现代码访问控制

模块模式的主要思想是，是为那些通过var关键字声明的标识符和函数创建一个私有的作用域，只有定义在这个作用域里的函数才能直接访问这些数据。

为了使外界能够访问到函数里的部分内容，我们有两个选择：

1. 返回一个包含选定值的对象，然后把这个对象赋给外界的变量。
2. 给函数传入一个外部作用域可访问的对象作为参数，使该函数能在这个对象中写入自己的属性（如果想让他的属性成为全局属性，只需传入window对象）。

```javaScript
// 在匿名函数中使用var关键字
（function(){
    var privateField = 42;

    function innerFunc() {
        notSoPrivate = 43;
        return notSoPrivate;
    }

    alert(privateField);  // 42
    innerFunc();
    alert(notSoPrivate);  // 43
}）();

alert(typeof privateField);  // undefined
alert(notSoPrivate);   // 43 (变量被泄露到外部)
```

私有属性

```javaScript
// 法一
var obj = (function() {
    var privateField = 42;
    var publicField = 'foobar';

    function processInternals() {
        alert('Internal stuff: ' + privateField);
    }

    function run() {
        processInternals();
        alert('Still private stuff: ' + privateField);
        alert('public stuff: ' + publicField);
    }

    return {
        publicField: publicField,
        run: run
    };
})();

obj.run()  //Internal, still private, public
obj.publicField // foobar
obj.processInternals() // undefined
obj.privateField // undefined
```

## 使用可选/可变/命名参数

在javascript中，你所显式声明的形参并不会对实参造成限制。因为每个函数都会把它的实参保存在一个预定义的arguments变量中。因此，行参实际上只是为实参提供了本地名称。如果行参与实参的数量一致，那这些行参就会引用实参的内容。如果不是的话，空缺的行参会被赋予undefiled。

javascript混乱的等价规则

```javaScript
undefined === null  // false
undefined == unll // true
```

为可选参数设置默认值

```javaScript
function repeat(times, rant) {
    if (undefined === rant) {
        rant = 'hello';
    }
}
```

用字面量对象实现伪命名参数

```javaScript
function repeat(options) {
    options = options || {};

    for (var opt in (repeat.defaultOptions || {})) {
        if (!(opt in options)) {
            options[opt] = repeat.defaultOptions[opt];
        }
    }
}

repeat.defaultOptions = {times: 2, tank: 'k'};
```