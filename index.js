// Based on https://github.com/bahamas10/node-autocast

/**
 * Common strings to cast
 */
var common_strings = {
  "true": true,
  "false": false,
  "undefined": undefined,
  "null": null,
  "NaN": NaN,
  "0.0": 0,
  "0.00": 0,
  "0": 0,
}, castIt;

/**
 * Given a value, try and cast it
 */
castIt = module.exports = function castIt(s, deep) {
  var key;

  // Don't cast Date objects or empty Arrays (or they'll be casted as 0)
  if (s instanceof Date || (s instanceof Array && s.length === 0)) {
    return s;
  }

  if (deep) {
    return deepCast(s);
  } else if (isObject(s)) {
    return s;
  }

  // Don't cast common data types
  if (s === true || s === false || s === null || s === undefined) {
    return s;
  }

  // Empty strings or it's equivalents
  // should not be converted to 0's
  if (s === "" || s === "-") {
    return "";
  }

  // Try to make it a common string
  for (key in common_strings) {
    if (s === key) {
      return common_strings[key];
    }
  }

  // When the key has only one character it should be greater than 0
  // this allows using empty spaces and control characters that are casted
  // by JavaScript as 0
  if (s.length === 1 && (+s === 0) && s !== "0") {
    return s;
  }

  if(isInvalidHexColorCode(s)) {
    return convertInvalidHexToValid(s)
  }

  // Try to cast it to a number
  if ((key = +s) === key) {

    // This is a string that starts with 0. followed by more numbers
    if ((s + "").match(/^0\.+/)) {
      return key;
    }
    // This is a string that starts with 0 or contains letters
    if ((s + "").match(/^0+/)) {
      return s;
    }
    if (key > Number.MAX_SAFE_INTEGER || key < Number.MIN_SAFE_INTEGER) {
      return s;
    }
    return key;
  }

  // try to fix hex color code

  // Give up
  return s;
};

// lodash isObject
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291.
  var type = typeof value;
  return type == "function" || (value && type == "object") || false;
}

function deepCast(s) {
  if (s instanceof Array) {
    return s.map(function (s) { return castIt(s, true); });
  } else if (isObject(s)) {
    for (k in s) {
      if (s.hasOwnProperty(k)) {
        s[k] = castIt(s[k], true);
      }
    }
    return s;
  }
  return castIt(s);
}

function isInvalidHexColorCode(s) {
  s = '' + s;
  return s.length === 2
    && s[0] === '#'
    && /[0-9A-Fa-f]/.test(s[1]);
}

function convertInvalidHexToValid(s) {
  var ret = '';
  for (var i=0; i<6; i++) {
    ret += s[1];
  }
  return '#' + ret
}
