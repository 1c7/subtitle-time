# subtitle-time 
[English Readme Click Here](./README-en.md)   

专门处理字幕时间，可以处理 SRT, VTT 和 ASS 的时间.    

## 安装
```bash
npm i subtitle-time
```

## 引入
```javascript
const { SubtitleTime } = require('./index.js')
```

## 使用例子

### 秒 -> SRT
```javascript
let t = new SubtitleTime(61, 'second');
t.to('srt'); // '00:01:01,000'
```

### ASS -> 秒
```javascript
let t = new SubtitleTime('0:01:15.50', 'ass');
t.to('second'); // 75.50
```

### 秒 -> VTT
TODO

### 秒 -> ASS
TODO

### SRT -> VTT
TODO

### SRT -> ASS
TODO

### 测试
```bash
npm test
```

### 为什么写这个
1. 需要处理字幕文件中的时间格式，从一种格式转另一种，比如把秒 `5` 转成 SRT 格式 `00:00:05,000`
2. dayjs, moment.js 等一些其他的 JS 时间库用不了, 它们不是针对这个场景做的
3. npm 上找不到替代品
