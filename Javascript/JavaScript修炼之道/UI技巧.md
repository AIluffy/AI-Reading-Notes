# UI技巧

## 预载入图片

总体来看，只有三种预载入图片的方法：

1. 用JavaScript动态创建带有合适src属性的Image对象：这种方法允许检测预载入图片何时真的被载入了。
2. 用CSS隐藏已载入了的图片：其实就是给要预载入的图片使用隐藏的img标签。可以隐藏img标签本身，也可以隐藏这些img标签的公共容器标签。
3. CSS sprites

更多关于快速图片载入的核心技巧，请看[快速图片载入的14条法则]（http://www.alistapart.com/articles/sprites）和最近的[Sprites](http://css-tricks.com/css-sprites/)

## 创造光箱效果

光箱效果指的是突出显示出一部分内容，同时用屏蔽单击的重叠曾暗化页面其余内容的操作。具体的W3School上有例子。

## 实现无限翻页

## 在载入内容时保持显示区域

解决方法是，保持相对于显示区域的滚动位置。我们需要获得显示区域的“滚动偏移”，即在当前显示部分上方载入内容前显示区域的滚动位置，然后在载入内容中后恢复这个偏移。