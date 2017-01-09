var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
var middleware = require('./')

chai.use(chaiAsPromised)

var assert = chai.assert

describe('middleware()', () => {
  it('returns Promise', () => {
    assert.instanceOf(middleware([]), Promise)
  })

  it('pass for empty array', () => {
    assert.doesNotThrow(() => middleware([]))
  })

  it('pass for resolved promises', () => {
    const steps = [
      () => new Promise(resolve => resolve()),
      () => new Promise(resolve => resolve())
    ]

    return assert.isFulfilled(middleware(steps))
  })

  it('resolves with data', () => {
    const steps = [
      () => new Promise(resolve => resolve(1)),
      () => new Promise(resolve => resolve(2))
    ]

    return assert.becomes(middleware(steps), [1, 2])
  })

  it('throws error for at least one rejected promises', () => {
    const steps = [
      () => new Promise(resolve => resolve()),
      () => new Promise((resolve, reject) => reject())
    ]

    return assert.isRejected(middleware(steps))
  })
})
