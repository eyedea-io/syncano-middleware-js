'use strict'

module.exports = function (middlewares) {
  middlewares = middlewares || []

  return new Promise(function (resolve, reject) {
    var resolves = []
    var i = 0;

    (function next() {
      var middleware = middlewares[i++]

      if (middleware) {
        middleware().then(function (data) {
          resolves.push(data)

          next()
        }).catch(function (err) {
          reject(err)
        })
      } else {
        resolve(resolves)
      }
    })()
  })
}
