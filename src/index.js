const throwReturnMark = 'throw-return/return-error-mark'

function throwReturnError (returnValue, message) {
  const error = new Error(message)
  error.throwReturnMark = throwReturnMark
  error.returnValue = returnValue
  throw error
}

function isPromise (value) {
  return (
    value &&
    typeof value.then === 'function' &&
    typeof value.catch === 'function'
  )
}

function catchAll (func, callback) {
  try {
    const value = func()
    return isPromise(value) ? value.catch(callback) : value
  } catch (error) {
    return callback(error)
  }
}

function handleReturnError (func) {
  return catchAll(func, error => {
    if (error && error.throwReturnMark === throwReturnMark) {
      return error.returnValue
    }
    throw error
  })
}

exports.throwReturnError = throwReturnError
exports.handleReturnError = handleReturnError
