# subtitle-time 
[English Readme](./README-en.md)   

专门处理字幕时间，可以处理 SRT, VTT 和 ASS 的时间.    

## 安装
```bash
npm i subtitle-time
```

## 引入
```javascript
const { SubtitleTime } = require('subtitle-time')
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
```javascript
let t = new SubtitleTime(61, 'second');
t.to('vtt'); // '00:01:01.000'
```

### 秒 -> ASS
```javascript
let t = new SubtitleTime(61, 'second');
t.to('ass'); // '0:01:01.00'
```

### SRT -> VTT
```javascript
let t = new SubtitleTime('00:01:01,000', 'srt');
t.to('vtt'); // '00:01:01.000'
```

### SRT -> ASS
TODO


## 比较
TODO

### 测试
```bash
npm test
```

## 这个库为什么存在?  
1. 我需要转换字幕的时间格式，比如把 `5` (秒)转成 SRT `00:00:05,000`
2. dayjs, moment.js 等其他 JS 时间库用不了
3. npm 上没有解决这个问题的工具

