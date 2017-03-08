/*=====================================*/
/* instance methods */
/*=====================================*/

/**
 * 返回对n求余的结果
 * 结果永远为正数
 *
 * @param {Number} n 除数
 * @returns {Number} 余数
 */
Number.prototype.mod = function (n) {
  return ((this % n) + n) % n;
};

/**
 * 将参数中的内容按%1, %2的顺序替换到原字符串中，返回新的字符串
 *
 * @param args 替换的内容
 * @returns {String} 格式化后的新字符串
 */
String.prototype.format = function () {
  var args = arguments;
  return this.replace(/%([0-9]+)/g, function (s, n) {
    return args[Number(n) - 1];
  });
};

/**
 * 返回将原字符串首字母大写的新字符串
 *
 * @returns {String} 首字母大写后的新字符串
 */
String.prototype.title = function () {
  return this[0].toUpperCase() + this.slice(1);
};

/**
 * 返回一个在开头以0补充长度的新字符串
 *
 * @param {Number} length 输出字符串的长度
 * @returns {String} 以0补充长度的新字符串
 */
String.prototype.padZero = function (length) {
  var s = this;
  while (s.length < length)
    s = '0' + s;
  return s;
};

/**
 * 返回一个在开头以0补充长度的新字符串
 *
 * @param {Number} length 输出字符串的长度
 * @returns {String} 以0补充长度的新字符串
 */
Number.prototype.padZero = function (length) {
  return String(this).padZero(length);
};

/**
 * 检查数组内容是否相同
 *
 * @param {Array} array 需要判断的数组
 * @returns {Boolean} 如果两个数组内容相同返回true
 */
Array.prototype.equals = function (array) {
  if (!array || this.length !== array.length)
    return false;
  for (var i = 0; i < this.length; i++) {
    if (this[i] instanceof Array && array[i] instanceof Array) {
      if (!this[i].equals(array[i]))
        return false;
    } else if (this[i] !== array[i]) {
      return false;
    }
  }
  return true;
};

/**
 * 返回原数组的拷贝
 *
 * @returns {Array} 原数组的拷贝
 */
Array.prototype.clone = function () {
  return this.slice(0);
};

/**
 * 检查元素是否存在于原数组内
 * ！注意，ECMAScript 2017新增了Array.prototype.includes签名，功能相同
 *
 * @param element 需要检查的元素
 * @returns {Boolean} 如果包含则返回true
 */
Array.prototype.contains = function (element) {
  return this.indexOf(element) >= 0;
};

/**
 * 检查字符串是否存在于原数组内
 *
 * @param {String} string 需要检查的字符串
 * @returns {Boolean} 如果包含则返回true
 */
String.prototype.contains = function (string) {
  return this.indexOf(string) >= 0;
};

/**
 * 返回以日期对象为内容的数组
 * 数组内容包括为：年、月、日、时、分、秒、时间戳、时区、周几
 *
 * @returns {Array} 包含时间内容的数组
 */
Date.prototype.toArray = function () {
  var d = this;
  return [d.getFullYear(), d.getMonth() + 1, d.getDate(),
    d.getHours(), d.getMinutes(), d.getSeconds(),
    d.getTime(), d.getTimezoneOffset() / 60, d.getDay()];
};

/*=====================================*/
/* static functions */
/*=====================================*/

/**
 * 克隆一个对象，通过JSON.parse与JSON.stringify方法
 *
 * @param {Object} object 需要克隆的对象
 */
JSON.clone = function (object) {
  return JSON.parse(JSON.stringify(object));
};

/**
 * 返回一个随机整数，范围为0到max - 1
 *
 * @param {Number} max 生成随机数的最大值（不包含）
 * @returns {Number} 随机整数
 */
Math.randomInt = function (max) {
  return Math.floor(max * Math.random());
};

/**
 * 返回一个含有指定范围数字的数组
 * Example::
 *    Array.range(5) => [0, 1, 2, 3, 4]
 *    Array.range(1, 5) => [1, 2, 3, 4]
 *    Array.range(1, 6, 2) => [1, 3, 5]
 *
 * @param {Number} start_or_length 开始数字或总长度
 * @param {Number} end 生成数组的边界（不包含）
 * @param {Number} step 数字间的差值，默认为1
 * @returns {Array} 含有指定内容数字的数组
 */
Array.range = function (start_or_length, end, step) {
  var s = end ? start_or_length : 0;
  var e = end ? end : start_or_length;
  var st = step || 1;
  var array = [];
  for (var i = s; i < e; i += st)
    array.push(i);
  return array;
};
