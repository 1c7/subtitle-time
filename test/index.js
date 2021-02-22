// npm test
// to run this file
// before publishing new version, all these test should passed

const test = require('ava');
const {
  SubtitleTime
} = require('../index.js')

// input:  '0:01:15.50'
// output: '0:01:15.50'
test('parse ASS format, output is the same', t => {
  var subtitle_time = new SubtitleTime('0:01:15.50', 'ass');
  var time = subtitle_time.to('ass');
  if (time == '0:01:15.50') {
    t.pass();
  } else {
    console.log(time);
    console.log(JSON.stringify(subtitle_time));
  }
});

// input:  '0:01:15.50'
// output: 75.50
test('parse ASS format, output in seconds', t => {
  var subtitle_time = new SubtitleTime('0:01:15.50', 'ass');
  // 1 minute, 15 second, 50 millisecond
  var time = subtitle_time.to('second');
  // should equal 75.50
  if (time === 75.50) {
    t.pass();
  } else {
    console.log(time);
  }
});

// input:  '0:01:15.50'
// output: 75500
test('parse ASS format, output in millisecond', t => {
  var subtitle_time = new SubtitleTime('0:01:15.50', 'ass');
  // 1 minute, 15 second, 50 millisecond
  var time = subtitle_time.to('millisecond');
  // should equal 75500
  if (time === 75500) {
    t.pass();
  } else {
    console.log(time);
  }
});

// input:  '0:02:00.99'
// output: 120990
test('parse ASS format, output in millisecond 2', t => {
  var subtitle_time = new SubtitleTime('0:02:00.99', 'ass');
  var time = subtitle_time.to('millisecond');
  if (time === 120990) {
    t.pass();
  } else {
    console.log(time);
  }
});


test('parse ASS format, calculate diff', t => {
  var t1 = new SubtitleTime('0:02:00.99', 'ass');
  var t2 = new SubtitleTime('0:02:02.99', 'ass');
  var time = t1.diffInSecond(t2);
  if (time === -2) {
    t.pass();
  } else {
    console.log(time);
  }
});

test('parse ASS format, calculate diff 2', t => {
  var t1 = new SubtitleTime('0:02:00.99', 'ass');
  var t2 = new SubtitleTime('0:02:02.99', 'ass');
  var time = t2.diffInSecond(t1);
  if (time === 2) {
    t.pass();
  } else {
    console.log(time);
  }
});

test('isEqual', t => {
  var t1 = new SubtitleTime('0:02:00.99', 'ass');
  var t2 = new SubtitleTime('0:02:00.99', 'ass');
  var result = t2.isEqual(t1);
  t.true(result)
});

test('isEqual false', t => {
  var t1 = new SubtitleTime('0:02:00.99', 'ass');
  var t2 = new SubtitleTime('0:02:01.01', 'ass');
  var result = t2.isEqual(t1);
  t.false(result)
});

test('isEarlier', t => {
  var t1 = new SubtitleTime('0:02:00.99', 'ass');
  var t2 = new SubtitleTime('0:02:01.01', 'ass');
  var result = t1.isEarlier(t2);
  t.true(result)
});

test('isEarlier false', t => {
  var t1 = new SubtitleTime('0:04:00.99', 'ass');
  var t2 = new SubtitleTime('0:02:01.01', 'ass');
  var result = t1.isEarlier(t2);
  t.false(result)
});

test('parse SRT format, output is the same', t => {
  let time = new SubtitleTime('00:01:15,504', 'srt');
  var srt_format = time.to('srt');
  t.assert(srt_format == '00:01:15,504');
});

test('parse second format, output SRT', t => {
  let time = new SubtitleTime(30, 'second');
  var srt_format = time.to('srt');
  t.assert(srt_format == '00:00:30,000');
});

test('parse second format, output SRT 2', t => {
  let time = new SubtitleTime('30', 'second');
  var srt_format = time.to('srt');
  t.assert(srt_format == '00:00:30,000');
});

test('parse second format, output SRT 3', t => {
  let time = new SubtitleTime(61, 'second');
  var srt_format = time.to('srt');
  t.assert(srt_format == '00:01:01,000');
});

test('parse second format, output SRT 4', t => {
  let time = new SubtitleTime(3601, 'second');
  var srt_format = time.to('srt');
  t.assert(srt_format == '01:00:01,000');
});

test('parse second format, output SRT 5', t => {
  let time = new SubtitleTime(125.1, 'second');
  var srt_format = time.to('srt');
  t.assert(srt_format == '00:02:05,100');
});

test('parse second format, output SRT 6', t => {
  let time = new SubtitleTime(125.100, 'second');
  var srt_format = time.to('srt');
  t.assert(srt_format == '00:02:05,100');
});

test('parse second format, output SRT 7', t => {
  let time = new SubtitleTime(125.120, 'second');
  var srt_format = time.to('srt');
  t.assert(srt_format == '00:02:05,120');
});

test('parse second format, output SRT 8', t => {
  let time = new SubtitleTime(125.107, 'second');
  t.assert(time.to('srt') == '00:02:05,107');
});

test('parse second format, output second', t => {
  let time = new SubtitleTime(0.423509, 'second');
  t.assert(time.to('second') == 0.423);
});

test('second -> vtt', t => {
  let time = new SubtitleTime(61, 'second');
  t.assert(time.to('vtt') == '00:01:01.000');
});

test('second -> ass', t => {
  let time = new SubtitleTime(61, 'second');
  t.assert(time.to('ass') == '0:01:01.00');
});

test('SRT -> VTT', t => {
  let time = new SubtitleTime('00:01:01,000', 'srt');
  t.assert(time.to('vtt') == '00:01:01.000');
});

test('SRT -> ASS', t => {
  let time = new SubtitleTime('00:01:01,000', 'srt');
  t.assert(time.to('ass') == '0:01:01.00');
});

// 输入: 2200 (毫秒)
// 输出: 00:00:02,200 (SRT 时间)
test('把毫秒转成 srt 时间', t => {
  var subtitle_time = new SubtitleTime('2200', 'ms');
  var time = subtitle_time.to('srt');
  t.assert(time == '00:00:02,200');
});

test('把毫秒转成 vtt 时间', t => {
  var subtitle_time = new SubtitleTime('2300', 'ms');
  var time = subtitle_time.to('vtt');
  t.assert(time == '00:00:02.300');
});

test('把毫秒转成 srt 时间 - 情况2', t => {
  var subtitle_time = new SubtitleTime('3600000', 'ms');
  var time = subtitle_time.to('srt');
  t.assert(time == '01:00:00,000');
});

test('把毫秒转成 srt 时间 - 情况3', t => {
  var subtitle_time = new SubtitleTime('3600200', 'ms');
  var time = subtitle_time.to('srt');
  t.assert(time == '01:00:00,200');
});

test('把 vtt 时间转成 毫秒', t => {
  var subtitle_time = new SubtitleTime('00:00:02.300', 'vtt');
  var time = subtitle_time.to('ms');
  t.assert(time == '2300');
});

test('对比2个时间', t => {
  var time_2 = new SubtitleTime('2300', 'ms');
  var time_3 = new SubtitleTime('00:00:02.300', 'vtt');
  t.assert(time_2.isEqual(time_3));
});