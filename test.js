#!/usr/bin/env node
/**
 * Tests for castIt
 */

var assert = require("assert"),
  castIt = require("./");

console.log("Testing Numbers...");
assert.strictEqual(castIt("5"), 5);
assert.strictEqual(castIt("5.6"), 5.6);
assert.strictEqual(castIt("5.6.7"), "5.6.7");
assert.strictEqual(castIt("0"), 0);
assert.strictEqual(typeof castIt("NaN"), "number");
assert.ok(isNaN(castIt("NaN")));
// assert.strictEqual(castIt("0xff"), 255);
// assert.strictEqual(castIt("1e3"), 1000);
console.log("ok");

console.log("Testing large numbers...");
assert.strictEqual(castIt(BigInt(Number.MAX_SAFE_INTEGER).toString()), 9007199254740991);
assert.strictEqual(castIt((BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1)).toString()), "9007199254740992");
assert.strictEqual(castIt(BigInt(Number.MIN_SAFE_INTEGER).toString()), -9007199254740991);
assert.strictEqual(castIt((BigInt(Number.MIN_SAFE_INTEGER) - BigInt(1)).toString()), "-9007199254740992");
assert.strictEqual(castIt("45144854711432876"), "45144854711432876");
assert.strictEqual(castIt("1045144854711432876"), "1045144854711432876");
assert.strictEqual(castIt("9999999999999999999"), "9999999999999999999");
console.log("ok");

console.log("Testing common data types...");
assert.strictEqual(castIt("false"), false);
assert.strictEqual(castIt("true"), true);
assert.strictEqual(castIt("null"), null);
assert.strictEqual(castIt("undefined"), undefined);
assert.strictEqual(castIt(false), false);
assert.strictEqual(castIt(true), true);
assert.strictEqual(castIt(null), null);
assert.strictEqual(castIt(undefined), undefined);

console.log("ok");

console.log("Testing strings...");
assert.strictEqual(castIt("some string"), "some string");
assert.strictEqual(castIt("!"), "!");

console.log("ok");


console.log("Testing spaces and punctuation...");

assert.strictEqual(castIt("."), ".");
assert.strictEqual(castIt(" "), " ");
assert.strictEqual(castIt("\t"), "\t");
assert.strictEqual(castIt("\uD83D\uDE00"), "😀");


console.log("Testing dates...");
var tmp = new Date();
assert.strictEqual(castIt(tmp), tmp);
console.log("ok");


console.log("Special Cases...");
assert.strictEqual(castIt("-"), "");
assert.strictEqual(castIt(""), "");
assert.strictEqual(castIt("0001"), "0001");
assert.strictEqual(castIt("0005400"), "0005400");
assert.strictEqual(castIt("9/19/99"), "9/19/99");
assert.strictEqual(castIt("1.2345"), 1.2345);
assert.deepEqual(castIt([]), []);
assert.deepEqual(castIt({}), {});
var fn = function () {};
assert.strictEqual(castIt(fn), fn);
var fnInstance = new fn();
assert.strictEqual(castIt(fnInstance), fnInstance);
var obj = {"bool": "false"}
assert.strictEqual(castIt(obj), obj);
console.log("ok");

console.log("Special Cases 2...");
assert.strictEqual(castIt(".2"), 0.2);
assert.strictEqual(castIt("0.2"), 0.2);
assert.strictEqual(castIt("0.02"), 0.02);
assert.strictEqual(castIt("0text"), "0text");
assert.strictEqual(castIt("0.text"), "0.text");
console.log("ok");


console.log('Should cast invalid color hex code to valid');
assert.strictEqual(castIt("#0"), "#000000");
assert.strictEqual(castIt("#f"), "#ffffff");
assert.strictEqual(castIt("#c"), "#cccccc");
assert.strictEqual(castIt("#e"), "#eeeeee");
assert.strictEqual(castIt("#9"), "#999999");
console.log("ok");

console.log("Deep casting...");
assert.deepEqual(castIt(["true", ["false"]], true), [true, [false]]);
assert.deepEqual(castIt(["true", {inner: "false"}], true),
  [true, {inner: false}]);
assert.deepEqual(castIt(obj, true), {bool: false});
assert.deepEqual(castIt({a: ["false"]}, true), {a: [false]});
assert.deepEqual(castIt(["false"], true), [false]);
assert.deepEqual(castIt(["abc"], true), ["abc"]);
console.log("ok");

