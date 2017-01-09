[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)   [![CircleCI](https://circleci.com/gh/eyedea-io/syncano-middleware-js.svg?style=shield&circle-token=405f648269a98f78158a497f81839edef3fa8a73)](https://circleci.com/gh/eyedea-io/syncano-middleware-js/tree/master)
[![codecov](https://codecov.io/gh/eyedea-io/syncano-middleware-js/branch/master/graph/badge.svg)](https://codecov.io/gh/eyedea-io/syncano-middleware-js)

# Syncano Middleware

Syncano middleware provide a convenient mechanism for filtering HTTP requests entering your socket. For example validate passed parameters, check if user is authenticated, assign default parameter values and many more.

For full list of middlewares check [NPM](https://www.npmjs.com/browse/keyword/syncano-middleware).

## Getting started

**Installing from NPM**

```sh
npm install syncano-middleware --save
```

**Usage**

```js
import middleware from 'syncano-middleware';

// Example middlewares.
const steps = {
  auth: () => new Promise((resolve, reject) => {
    // Your user authentication logic...
    resolve(user)
  }),
  validate: () => new Promise((resolve, reject) => {
    // Your validation logic...
    resolve(formFields)
  })
}

middleware([ steps.auth, steps.validate ])
  .then(data => {
    // All middlewares passed.
    // Now you have an authenticated user and validated form.

    const [ user, fields ] = data
  })
  .const(err => {
    // An error occurred in one of middlewares.
    // You can handle that here.
  })


```

## Custom middlewares

Middleware must be a function that returns a Promise:

```js
  function MyAwesomeMiddleware() {
    return new Promise((resolve, reject) => {
      // Your awesome middleware implmentation...
      // ...
      // resolve(data)
      // or
      // reject('An error message or data')
    })
  }
```
