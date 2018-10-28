# throw-return
> Return using throw

```sh
npm install throw-return
```

[![npm](https://img.shields.io/npm/v/throw-return.svg)](https://www.npmjs.com/package/throw-return)
[![Build Status](https://travis-ci.org/andrejewski/throw-return.svg?branch=master)](https://travis-ci.org/andrejewski/throw-return)
[![Greenkeeper badge](https://badges.greenkeeper.io/andrejewski/throw-return.svg)](https://greenkeeper.io/)

Throw errors to communicate a return value.

**Warning:**
Evaluate your use cases before using this library.
Using error handling to short-circuit functions is slower and more obscure than returning.
This library should be used as part of a larger abstraction.
Unless that abstraction provides more benefits in itself, go with plain `return`.

## Documentation

- [`throwReturnError(value[, message])`](#throwreturnerror)
- [`handleReturnError(func)`](#handlereturnerror)

### `throwReturnError`
> `throwReturnError(value: any[, message: String])`

Throw an error communicating `value` as the return value.
Optionally give the error a `message`.

### `handleReturnError`
> `handleReturnError(func: Function): any`

Invoke `func` and, if a `throw-return` error is thrown, return the communicated value.
If a promise is returned rejecting a `throw-error` error, the communicated value is resolved.

## Example
We have found `if (!y) return x` too tiresome to write.
Let's build an `assert(y, x)` to save some keystrokes.

Instead of this:

```js
function example () {
  if (!condition1) {
    return value1
  }
  if (!condition2) {
    return value2
  }
  return value3
}
```

We can do:

```js
function example () {
  assert(condition1, value1)
  assert(condition2, value2)
  return value3
}
```

If you define `assert` and control all calls to `example`:

```js
function assert (condition, value) {
  if (!condition) {
    throwReturnError(value)
  }
}

function run (func) {
  return handleReturnError(func)
}

const value = run(example)
```