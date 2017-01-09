module.exports = function (middlewares = []) {
  return new Promise((resolve, reject) => {
    let resolves = []
    let i = 0;

    (function next() {
      const middleware = middlewares[i++]

      if (middleware) {
        middleware()
          .then(data => {
            resolves.push(data)

            next()
          })
          .catch(err => reject(err))
      } else {
        resolve(resolves)
      }
    })()
  })
}
