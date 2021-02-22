class SubtitleTime {
  constructor(time, format) {
    // 初始化4个时间组件为 null
    this.hour = null;
    this.minute = null;
    this.second = null;
    this.millisecond = null;

    this.format = format; // 保存格式
    this.original_time = time; // 保存时间

    this.INPUT_FORMAT_IS_NOT_SUPPORTED = "不支持此输入格式"
    this.OUPUT_FORMAT_IS_NOT_SUPPORTED = "不支持此输出格式"

    var allowed_format = ['ass', 'srt', 'vtt', 'ms', 'millisecond', 's', 'second']
    if (allowed_format.includes(format) == false) {
      throw this.INPUT_FORMAT_IS_NOT_SUPPORTED
    }

    if (format == 'ms' || format == 'millisecond') {
      var int_ms = parseInt(time, 10); // 先把毫秒转成 int
      this._set_time_using_millisecond(int_ms)
    }

    if (format == 'second' || format == 's') {
      let millisecond_array = String(time).split('.');
      if (millisecond_array.length == 2) {
        if (millisecond_array[1].length > 3) {
          this.millisecond = parseInt(millisecond_array[1].substring(0, 3));
        } else {
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
      this.hour = parseInt(time_array[0], 10)
      this.minute = parseInt(time_array[1], 10)
      this.second = parseInt(time_array[2], 10)
    }
    if (format == 'vtt') {
      // 00:04.000
      // 00:01:18.114
      let array = time.split('.');
      if (array.length == 2) {
        let ms = array[1]
        this.millisecond = parseInt(ms, 10);
        array.pop();
      }
      var h_m_s = array[0].split(':')
      if (h_m_s.length == 3) {
        this.hour = parseInt(h_m_s[0], 10)
        this.minute = parseInt(h_m_s[1], 10)
        this.second = parseInt(h_m_s[2], 10)
      } else {
        this.hour = 0
        this.minute = parseInt(h_m_s[1], 10)
        this.second = parseInt(h_m_s[2], 10)
      }
    }
  }

  // 主要用于调试，把4个关键参数返回回去
  _key_property() {
    return {
      hour: this.hour,
      minute: this.minute,
      second: this.second,
      millisecond: this.millisecond,
    }
  }

  // 输入: 毫秒
  // 效果: 设定4个主要组件 hour, minute, second, millisecond
  _set_time_using_millisecond(time) {
    // 比如 2200ms = 2秒200毫秒
    // 2200 % 1000          = 200 (毫秒)
    // (2200 - 200)  / 1000 = 2 (秒)
    this.millisecond = time % 1000;
    var second = (time - (time % 1000)) / 1000
    this._set_time_using_second(second)
  }

  // 输入: 秒
  // 效果: 设定了 hour, minute, second
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

  // 如果为 null, 改成 0
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

  // 返回当前时间转成 second 
  _second() {
    var result = 0;
    result += this.hour * 60 * 60;
    result += this.minute * 60;
    result += this.second
    result += this.millisecond / 1000
    return result;
  }

  // 输出
  // to('second')  Float
  // to('millisecond')  INT
  // to('srt')  // 00:00:05,504
  // to('vtt')  // 00:01:17.010
  // to('ass')  // 0:01:15.50
  to(time_unit) {
    var allowed_time_unit = ['ass', 'srt', 'vtt', 'ms', 'millisecond', 's', 'second']
    if (allowed_time_unit.includes(time_unit) == false) {
      throw this.OUPUT_FORMAT_IS_NOT_SUPPORTED
    }
    this._set_null_to_zero();

    if (time_unit == 'second' || time_unit == 's') {
      return this._second();
    }
    if (time_unit == 'millisecond' || time_unit == 'ms') {
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
      // 0:00:08.05
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
      // 00:00:06,998
    }
    if (time_unit == 'vtt') {
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

      return `${hour}:${minute}:${second}.${millisecond}`
      // 00:00:00.180
    }
  }

  // 返回两个时间相差了几秒, 正负数都有可能
  diffInSecond(subtitle_time) {
    var diff = this._second() - subtitle_time.to('second')
    return diff
  }

  // 两个时间是否相等
  isEqual(subtitle_time) {
    return this.hour == subtitle_time.hour &&
      this.minute == subtitle_time.minute &&
      this.second == subtitle_time.second &&
      this.millisecond == subtitle_time.millisecond;
  }

  // 是否比输入的时间早
  isEarlier(subtitle_time) {
    return this._second() < subtitle_time.to('second');
  }

  // 是否比输入的时间晚
  isLater(subtitle_time) {
    return this.isEarlier(subtitle_time) == false
  }
}

exports.SubtitleTime = SubtitleTime