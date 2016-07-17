# scrolling

## 简介

移动端带滚动效果的返回顶部、返回指定位置

## 示例

![扫一扫](index.png)
[DEMO链接](http://ximan.github.io/scrolling/)

## 使用方法

```
document.querySelector('.back_up').addEventListener('click',function(){
    scrolling();
},false);
```

或者加参数

```
scrolling({
    // 参数
});
```

## 参数列表

|   参数    |        说明       |  默认值 |      可填值     |
|----------|-------------------|--------|----------------|
| dom      | 滚动到指定DOM的位置 | 网页顶部 | js对象         |
| speed    | 滚动速度(ms)       | 500    |  数字           |
| callback | 滚动完毕回调       | 空      | function(){}   |

## 版本

### 0.1.0(160717)

* 支持滚动到指定DOM的位置
* 支持滚动速度
* 支持滚动完毕回调