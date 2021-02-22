// node ./example/basic_usage.js

const {
	SubtitleTime
} = require('../index')

// Input ms
// Output VTT
var subtitle_time = new SubtitleTime('2300', 'ms');
var time = subtitle_time.to('vtt');
if (time == '00:00:02.300') {
	console.log('Correct VTT Time');
}

// Compare 2 time
var time_A = new SubtitleTime('2300', 'ms');
var time_B = new SubtitleTime('00:00:02.300', 'vtt');

if (time_A.isEqual(time_B)) {
	console.log('They are equal')
} else {
	console.log('Not equal')
}

// Compare their difference in seconds
if (time_A.diffInSecond(time_B) == 0) {
	console.log('They are equal')
} else {
	console.log('Not equal')
}