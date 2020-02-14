class SubtitleTime {

  // 00:00:05,504  srt
  // 00:01:17.010  vtt
  // 0:01:15.50    ass
  // 15            second
  // 0.180123      second
  constructor(time, format) {
    this.hour = null;
    this.minute = null;
    this.second = null;
    this.millisecond = null;

    this.format = format;
    this.original_time = time;

    var allowed_format = ['second', 'ass', 'srt']
    if (allowed_format.includes(format) == false) {
      throw "格式不支持"
    }

    if (format == 'second') {
      let millisecond_array = String(time).split('.');
      if (millisecond_array.length == 2) {
        if (millisecond_array[1].length > 3){
          this.millisecond = parseInt(millisecond_array[1].substring(0,3));
        }else{
          this.millisecond = parseInt(millisecond_array[1]);
        }
        
        this._set_time_using_second(millisecond_array[0]);
      } else {
        this._set_time_using_second(time);
      }
    }
    if (format == 'ass') {
      let millisecond_array = time.split('.');
      this.millisecond = parseInt(millisecond_array[1]) * 10;

      let time_array = time.split(':')
      this.hour = parseInt(time_array[0])
      this.minute = parseInt(time_array[1])
      this.second = parseInt(time_array[2])
    }
    if (format == 'srt') {
      let millisecond_array = time.split(',');
      this.millisecond = parseInt(millisecond_array[1]);

      let time_array = time.split(':')
      this.hour = parseInt(time_array[0])
      this.minute = parseInt(time_array[1])
      this.second = parseInt(time_array[2])
    }
  }

  _set_time_using_second(time) {
    var second = parseFloat(time);
    if (second >= 3600) {
      this.hour = Math.floor(second / 60 / 60);
      second = second - parseInt(this.hour * 60 * 60);
    }
    if (second >= 60) {
      this.minute = Math.floor(second / 60);
      second = second - parseInt(this.minute * 60);
    }
    this.second = second;
  }

  _set_null_to_zero() {
    if (this.hour == null) {
      this.hour = 0;
    }
    if (this.minute == null) {
      this.minute = 0;
    }
    if (this.second == null) {
      this.second = 0;
    }
    if (this.millisecond == null) {
      this.millisecond = 0;
    }
  }

  _second() {
    var result = 0;
    result += this.hour * 60 * 60;
    result += this.minute * 60;
    result += this.second
    result += this.millisecond / 1000
    return result;
  }

  // 按特定格式输出
  // to('second')  Float
  // to('millisecond')  INT
  // to('srt')  // 00:00:05,504
  // to('vtt')  // 00:01:17.010
  // to('ass')  // 0:01:15.50
  to(time_unit) {
    this._set_null_to_zero();

    if (time_unit == 'second') {
      return this._second();
    }
    if (time_unit == 'millisecond') {
      let result = parseInt(this._second() * 1000, 10)
      return result;
    }
    if (time_unit == 'ass') {
      let minute = String(this.minute).padStart(2, '0')
      let second = String(this.second).padStart(2, '0')

      var mill_string = String(this.millisecond);
      let millisecond = null;
      if (mill_string.length > 2) {
        millisecond = mill_string.substring(0, 2);
      } else {
        millisecond = mill_string.padEnd(2, '0')
      }

      return `${this.hour}:${minute}:${second}.${millisecond}`
    }
    if (time_unit == 'srt') {
      let hour = String(this.hour).padStart(2, '0')
      let minute = String(this.minute).padStart(2, '0')
      let second = String(this.second).padStart(2, '0')

      var mill_string = String(this.millisecond);
      let millisecond = null;
      if (mill_string.length > 3) {
        millisecond = mill_string.substring(0, 3);
      } else {
        millisecond = mill_string.padEnd(3, '0')
      }

      return `${hour}:${minute}:${second},${millisecond}`
    }
  }

  // 差了几秒, 正负数都有可能
  diffInSecond(subtitle_time) {
    var diff = this._second() - subtitle_time.to('second')
    return diff
  }

  // 时间是否相等
  isEqual(subtitle_time) {
    return this.hour == subtitle_time.hour &&
      this.minute == subtitle_time.minute &&
      this.second == subtitle_time.second &&
      this.millisecond == subtitle_time.millisecond;
  }

  // 时间是否早一些
  isEarlier(subtitle_time) {
    return this._second() < subtitle_time.to('second');
  }

  isLater(subtitle_time) {
    return this.isEarlier(subtitle_time) == false
  }
}

exports.SubtitleTime = SubtitleTime