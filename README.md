# blackTip

移动端黑色提示，高度还原微信toast的一个轻量级提示插件，原生js实现，gzip压缩之后 只有4Kb
## Screenshot 预览
```js
Toast.loading('数据加载中');
```
![screenshot](screenshot/1.png)
```js
Toast.info('加载失败');
```
![screenshot](screenshot/2.png)
```js
Toast.success();
```
![screenshot](screenshot/3.png)
```js
Toast.error();
```
![screenshot](screenshot/4.png)

## Demo
[demo 点击预览](https://yishibakaien.github.io/black-tip/index.html)

## Install 安装
#### npm 安装
```shell
$ npm install black-tip --save-dev
```
#### cnpm 淘宝镜像安装
```shell
$ cnpm install black-tip --save-dev
```
#### 页面引用 
```html
<script src="./Toast.js"></script>
```
## Usage 使用 
#### API
- Toast.success() 
> icon - 打钩标志，默认显示时间 800ms， 默认文字 '已完成'
```js

Toast.success('提交成功') // 默认显示 800ms 后消失

Toast.success(1000) // 传入一个参数，且为数字时，文字为默认文字 '已完成'， 显示 1000ms 后消失

Toast.success('提交成功', 1500) // 第一个参数字符串，第二个参数为数字时， 此例显示 1500ms 后消失

// 也可以
Toast.success('提交成功'， { 
    duration: 800,  // 持续时长 不填默认 800
    complete: function() {
        console.log('我经完成了');
    }
});

// 也可以
Toast.success('提交成功', function() {
    console.log('我经完成了'); // 回调函数默认 800ms 后执行
});

// 也可以
Toast.success({
    text: '提交成功',
    duration: 600,
    complete: function() {
        console.log('我经完成了');
    }
});

```
- Toast.info()  
> icon - 感叹号 '!'，默认显示时间 1500ms，默认文字 '警告'，参数同 Toast.success()

- Toast.error() 
> icon -  '×'，默认显示时间 1500ms ，默认文字 '错误'，参数同 Toast.success()

#### ----分割一下----
- Toast.loading() 
> icon 为旋转的小图标，默认文字为 '请稍后..'，不会自动消失，可以通过  Toast.hide() 方法隐藏，或在参数中传入 duration (持续时长) 值，时间到了后自动隐藏
```js
Toast.loading('正在加载中'， {duration: 3000});
```
- Toast.hide() 
> 隐藏正在显示的 Toast， 可传入一个 回调函数 Toast 隐藏后执行
```js
Toast.loading('正在加载中');
setTimeout(() => {
    Toast.hide(function(){
        console.log('我已经隐藏了')
    });
}, 1000);
```

#### Props 参数
###### 根据需求可以传入多种多样的参数

- arguments[0]  第一个参数
| 类型               | 默认             | 说明                                         |
| ---------------- | ---------------| ------------------------------------------|
| string   | ''     | 你要展示的文字    |
| number            |  1500ms                | toast显示时长    |
| function            | 无                 | toast隐藏后的回调函数   |
| object            | 无                 | toast隐藏后的回调函数   |
###### 
- arguments[1] 第二个参数是 object 时

| key              | 类型               | 默认             | 说明                                         |
| ----------------| ---------------- | ---------------| ------------------------------------------|
| text       | String   | -    | 你要展示的文字    |
| duration             | Number            |  1500ms                | toast显示时长    |
| complete             | Function            | -                 | toast隐藏后的回调函数   |
###### 
- arguments[1] 第二个参数是 function 时 
回调函数
