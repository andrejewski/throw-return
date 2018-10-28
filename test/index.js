import test from 'ava'
import { throwReturnError, handleReturnError } from '../src'

test('throwReturnError should throw', t => {
  t.throws(() => {
    throwReturnError(1, 'message')
  }, /message/)
})

test("handleReturnError should return an returnError's value", t => {
  t.is(handleReturnError(() => throwReturnError(1)), 1)
})

test('handleReturnError should only return for returnErrors', t => {
  t.throws(() => {
    handleReturnError(() => {
      throw new Error('other')
    })
  }, /other/)
})

test("handleReturnError should resolve an returnError's value", async t => {
  const value = 1
  const promise = handleReturnError(async () => throwReturnError(value))
  t.is(await promise, 1)
})

test('handleReturnError should only resolve for returnErrors', t => {
  return handleReturnError(() => {
    return Promise.reject(new Error('other'))
  }).catch(error => {
    t.is(error.message, 'other')
  })
})
