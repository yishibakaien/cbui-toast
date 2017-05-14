# balckTip

移动端黑色提示，高度还原微信toast，轻量级 纯js实现不依赖任何第三方库

** Notice: ** This component is designed for mobile(该组件适用于移动端)

## Screenshot
```js
blackTip({
    text: '数据加载中',
    type: 'loading'
});
```
![screenshot](screenshot/1.png)
```js
blackTip({
    text: '加载失败',
    type: 'info'
});
```
![screenshot](screenshot/2.png)
```js
blackTip({
    text: '已完成',
    type: 'success'
});
```
![screenshot](screenshot/3.png)

## Demo
[demo 点击预览](https://yishibakaien.github.io/black-tip/index.html)

## Install 安装
#### npm 安装
```shell
$ npm install black-tip
```
#### cnpm 淘宝镜像安装
```shell
$ cnpm install black-tip
```

## Usage 使用
#### Props 参数
| 名称              | 类型               | 默认             | 说明                                         |
| ----------------| ---------------- | ---------------| ------------------------------------------|
| text       | String   | ''     | 你要展示的文字    |
| type             | String            | 'loading'            | toast的类型 目前支持: 'loading'、 'info'、'success'    |
| time             | Number            |  1500                | toast显示时长    |
| mask             | boolean            |  false                | 是否带透明防触摸蒙版   |
| zIndex             | Number            |  999                | toast的z-index    |
| complete             | Function            | null                 | toast隐藏后的回调函数   |

## 示例代码

#### 通过js引入
```html
<script src="blackTip.js"></script>
```
#### 安装包使用
```shell
nmp install black-tip --save-dev
```
#### 示例代码
```js
var blackTip = require('black-tip');
//import blackTip from 'black-tip'; 

// 生成 blackTip 实例，并用一个变量保存它，方便后续操作
var loadingToast = blackTip({
    text: '数据加载中',
    type: 'loading',
    time: 10000 // 时间设置长一点 10秒
});

// 一个2秒的异步操作，假设这是个网络请求 :-)
setTimeout(function() {

    // 异步操作结束 用 remove() 方法删除 loadingToast 实例
    loadingToast.remove();
    
    // type: 'info'  假设请求失败了
    var infoToast = blackTip({
        text: '加载失败',
        time: 1000,
        type: 'info',
        complete: function() {
            // infoToast 展示时间(1秒)结束后，调用 complete 回调函数 删除 infoToast 实例
            // 这步不是必须的，time 结束后 toast会自动隐藏
            infoToast.remove();
            // do some thing... 这里可以做一些请失败后的事情
        }
    });
    
    // type: 'success' 假设请求成功
    var successToast = blackTip({
        text: '已完成',
        type: 'success',
        time: 800,
        complete: function() {
            // successToast.remove() 可以在这里删除实例，也可以不删除，会自动隐藏
            alert('请求成功');
            // do some thing... 这里可以做一些成功后的事情
        }
    });
}, 2000);
```