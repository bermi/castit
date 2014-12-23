# castit [![Build Status via Travis CI](https://travis-ci.org/bermi/castit.svg)](https://travis-ci.org/bermi/castit) [![NPM version](http://img.shields.io/npm/v/castit.svg)](https://www.npmjs.org/package/castit)

Opinionated Javascript variable casting with deep structures support for
easily and automatically cast some common datatypes in JavaScript

Based on https://github.com/bahamas10/node-autocast but adapted for
[Fluid Configure](http://www.fluid.com/software/product-customization)
existing JSON configurations. This version is meant to be used in CommonJS
environments.

The main differences with autocast are:

- hexadecimal and octals are not automatically casted, they remain as string
  values. Casing them is as simple as adding a plus sign in front of the string
  +"0xff".
- "" and "-" are both casted to an empty string.
- functions objects and array are not casted by default
- supports deep casting by passing an optional deep flag.

## Install

  npm install castit --save


## Usage

``` js
var cast = require("castit");
```

## Example

``` js
> var cast = require("castit");
[Function: cast]
> cast("5")
5
> cast("5.8")
5.8
> cast("5.8.8")
"5.8.8"
> cast("null")
null
> cast("undefined")
undefined
> cast("NaN")
NaN
> cast("true")
true
> cast("false")
false
> cast("normal string")
"normal string"
> cast(fn)
fn
> cast({nested: ["false"]}, true)
{nested: [false]}
```


## Tests

    npm test

## License

MIT Licensed
