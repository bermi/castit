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
  "0": 0
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

  // Try to cast it to a number
  if ((key = +s) === key) {
    // This is a string that starts with 0 or contains letters
    if ((s + "").match(/^0+/)) {
      return s;
    }
    return key;
  }

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