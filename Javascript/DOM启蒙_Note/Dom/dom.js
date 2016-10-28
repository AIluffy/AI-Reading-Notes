// IIFE (Immediately-Invoked Function Expression)
(function(win) {
    
    // 设置window和document的引用, 以加速IIFE中对这些对象的访问
    var global = win;
    var doc = global.document;

    var dom = function(params, context) {
        // 返回含有dom节点的对象
        return new GetOrMakeDom(params, context);
    };

    // 判断params的值是否包含html
    var regXContainsTag = /^\s*<(\w+|!)[^>]*>/;

    var GetOrMakeDom = function(params, context) {
        var currentContext = doc;

        if (context) {
            if (context.nodeType) { //它是个文档节点或者元素节点
                currentContext = context;
            } else { // 或者它是个选择器字符串,可用来选择节点
                currentContext = doc.querySelector(context);
            }
        }

        // 如果没有传params,返回空的dom()对象
        if (!params || params === '' || typeof params === 'string' && params.trim() === '') {
            this.length = 0;
            return this;
        }

        // 如果是HTML字符串,构造文档片段,填好对象,然后返回
        if (typeof params === 'string' && regXContainsTag.test(params)) {
            // 是的,肯定是HTML字符串
            /*创建div和文档片段,附加div到文档片段,将div的innerHTML设成该字符串,获取div的子节点*/
            var divElm = currentContext.createElement('div');
            divElm.className = 'hippo-doc-frag-wrapper';
            var docFrag = currentContext.createDocumentFragment();
            docFrag.appendChild(divElm);
            var queryDiv = docFrag.querySelector('div');
            queryDiv.innerHTML = params;
            var numberOfChildren = queryDiv.children.length;

            /*遍历节点列表并填充对象,因为HTML字符串可能含有多个兄弟节点 */
            for (var z = 0; z < numberOfChildren; z ++) {
                this[z] = queryDiv.children[z];
            }

            // 设置对象的length
            this.length = numberOfChildren;

            // 返回Object
            return this;  // 返回值如 {0: ELEMENT_NODE, 1: ELEMENT_NODE, length: 2}
        }

        // 如果传入的单个节点引用,填好对象,返回之
        if (typeof params === 'object' && params.nodeName) {
            this.length = 1;
            this[0] = params;
            return this;
        }

        // 如果是个对象但不是个节点则假设其为节点列表或者数组,甚或选择器字符串
        var nodes;

        if (typeof params !== 'string') { //节点列表或者数组
            nodes = params;
        } else { // 字符串
            nodes = currentContext.querySelectorAll(params.trim());
        }

        // 遍历前面创建的数组或者节点列表,填充返回对象
        var nodeLength = nodes.length;

        for (var i = 0; i < nodeLength; i ++) {
            this[i] = nodes[i];
        }

        // 设置对象的length
        this.length = nodeLength;

        return this;
    };

    // 暴露dom到全局作用域
    global.dom = dom;

    // prototype的捷径, 任何附加到的dom.fn的东西都成为GetOrMakeDom.prototype对象的属性.
    dom.fn = GetOrMakeDom.prototype;

    dom.fn.each = function(callback) {
        var len = this.length;

        for (var i = 0; i < len; i ++) {
            callback.call(this[i], i, this[i]);
        }

        return this; // 通过返回类似 {0: ELEMENT_NODE, 1: ELEMENT_NODE, length: 2}， 使它链式可用
    }

    dom.fn.html = function(htmlString) {
        if (htmlString) {
            return this.each(function() {  //注意我返回了this，所以如果调用时没传参数， 则可以链式调用
                this.innerHTML = htmlString;
            });
        } else {
            return this[0].innerHTML;
        }
    }

    dom.fn.text = function(textString) {
        if (textString) {
            return this.each(function() {
                this.textContent = textString;
            });
        } else {
            return this[0].textContent.trim();
        }
    }

    dom.fn.append = function(stringOrObject) {
        return this.each(function() {
            if (typeof stringOrObject === 'string') {
                this.insertAdjacentHTML('beforeend', stringOrObject);
            } else {
                var that = this;
                dom(stringOrObject).each(function(name, value) {
                    that.insertAdjacentHTML('beforeend', value.outerHTML);
                });
            }
        });
    };
})(window);