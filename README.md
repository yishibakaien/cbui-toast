---
title: 轻量级移动端提示组件 cbui-toast
date: 2017-08-07 22:23:43
tags: js
---
# 概述

高度还原微信原生 `toast` 的一个轻量级提示插件，纯js实现，gzip压缩之后只有4Kb，拥有更多样化的API接口与更高效集约的性能

# 预览
```js
Toast.loading('请稍后...');
```
![Toast.loading()](../screenshot/1.png)
```js
Toast.info();
```
![Toast.info()](../screenshot/2.png)
```js
Toast.success();
```
![Toast.success()](screenshot/3.png)
```js
Toast.error();
```
![Toast.error()](screenshot/4.png)

# Demo
[demo 点击预览](https://yishibakaien.github.io/black-tip/build/index.html)

# 安装
## npm 安装
```shell
$ npm install cbui-toast --save-dev
```
## cnpm 淘宝镜像安装
```shell
$ cnpm install cbui-toast --save-dev
```
## 页面引用 
```html
<script src="./Toast.js"></script>
```
# 使用 
## API
### `Toast.success() `

> `icon` 打钩标志，不传参数时，默认显示时间 800ms， 默认文字 '已完成'

- 参数配置

```js
Toast.success('提交成功') // 显示 0.8 秒

Toast.success(1000) // 显示 1 秒，文字为默认文字 '已完成'

Toast.success('提交成功', 1500) // 显示 1.5 秒

// 第二个参数为回调函数
Toast.success('提交成功', function() {
    // 在显示 800ms 后 Toast 隐藏时执行
    console.log('我是回调函数');
});

// 第二个参数为配置项
Toast.success('提交成功'， {
    duration: 1000, // 持续时长(ms)，不填默认 800
    complete: function() {
        console.log('我完成了');
    }
});

// 一个配置项
Toast.success({
    text: '提交成功',
    duration: 600,
    complete: function() {
        console.log('我完成了');
    }
});

```
### `Toast.info()`
> `icon` 感叹号标志 “!”，默认显示时间 1500ms，默认文字 “警告”，参数同 `Toast.success()`

### `Toast.error()`
> `icon` 打叉标志 “×”，默认显示时间 1500ms ，默认文字 “错误”，参数同 `Toast.success()`

### `Toast.loading()`
> `icon` 旋转的菊花型标志，默认文字为 “请稍后...”

- 参数配置

```js
Toast.loading('正在加载中');

Toast.loading({
    text: '正在加载中',
    duration: 3000 // 可以配置显示时长，但建议根据情况调用 Toast.hide() 方法来隐藏
});
```

### `Toast.hide()`
> 隐藏正在显示的 Toast，随时都可以调用此方法，并可传入一个回调函数 会在 Toast 隐藏后执行

- 参数配置

```js
Toast.loading('正在加载中');
setTimeout(function() {
    Toast.hide(function(){
        console.log('我隐藏了');
    });
}, 1000);
```
_**tip:**_

1. `Toast.loading()` 通常用于反馈用户操作等待状态，因为无法知道什么时候会有反馈结果，因此不会自动消失，需要根据实际情况来调用隐藏方法来隐藏它

2. 调用 `success`、 `info`、 `error`、 `loading` 等方法时，会先将当前正在显示的 `toast` 隐藏


## Props 参数

> Toast 的参数配置非常灵活，可以传入多种多样的参数配置

**arguments[0] 第一个参数**

| 类型 | 默认 | 说明 |
| ---------------- | --------------- | ------------------------------------------|
| string | `success-已完成`、`info-警告`、`error-错误`、`loading-请稍后..` | 你要展示的文字 |
| number |`success-800ms` /`info,error-2000ms` | `toast` 显示时长 |
| function | 无 | `toast` 隐藏后的回调函数 |
| object | 无 | `toast` 隐藏后的回调函数 |


**arguments[1] 第二个参数**

- 为 object 时

| key | 类型 | 默认 | 说明 |
| ----------------| ---------------- | ---------------| ------------------------------------------|
| text | string | - | 你要展示的文字 |
| duration | sumber | `success`-800ms /`info`,`error` - 2000ms | `toast` 显示时长 |
| complete | function | - | `toast` 隐藏后的回调函数 |


- 为 function 时
> 作为回调函数， `Toast` 隐藏后执行

- 为 number 时（前提需要第一个参数为 string）
> 作为 `Toast` 显示时长
