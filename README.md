# subtitle-time 
[English Readme Click Here](./README-en.md)   

专门针对字幕时间做的解析库，可以处理 SRT, VTT 和 ASS 的时间.    

### 为什么写这个
1. 我需要处理字幕文件中的时间格式，从一种格式转到另一种，比如把秒 `5` 转成 SRT 格式 `00:00:05,000`
2. day.js, moment.js 不是针对这个场景做的，用不了
3. 我在 npm 上找不到替代品, 就只能自己写了

### 安装
```bash
npm i subtitle-time
```

### 导入
```javascript
const {
  SubtitleTime
} = require('./index.js')
```

### 使用例子: 秒转成 srt
```javascript
let time = new SubtitleTime(61, 'second');
time.to('srt'); // '00:01:01,000'
```

### 测试
```bash
npm test test.js
```

