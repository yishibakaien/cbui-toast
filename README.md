# balckTip

移动端黑色提示，高度还原微信toast

** Notice: ** This component is designed for mobile(该组件适用于移动端)

## Screenshot
![screenshot](screenshot/1.png)
![screenshot](screenshot/2.png)

## Install 安装
#### npm
```shell
$ npm install black-tip
```

## Usage 使用
#### Props 参数
| 名称              | 类型               | 默认             | 说明                                         |
| ----------------| ---------------- | ---------------| ------------------------------------------|
| text       | String   | ''     | 你要展示的文字    |
| type             | String            | 'default'            | toast的类型    |
| time             | Number            |  1500                | 显示时长    |
| mask             | boolean            |  false                | 是否带透明防触摸蒙版   |
| zIndex             | Number            |  999                | toast的z-index    |
| complete             | Function            | null                 | toast隐藏后的回调函数   |
