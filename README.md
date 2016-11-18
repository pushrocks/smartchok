# smartchok
smart wrapper for chokidar

## Availabililty
[![npm](https://push.rocks/assets/repo-button-npm.svg)](https://www.npmjs.com/package/npmts)
[![git](https://push.rocks/assets/repo-button-git.svg)](https://gitlab.com/pushrocks/npmts)
[![git](https://push.rocks/assets/repo-button-mirror.svg)](https://github.com/pushrocks/npmts)
[![docs](https://push.rocks/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/npmts/)

## Status for master
[![build status](https://gitlab.com/pushrocks/npmts/badges/master/build.svg)](https://gitlab.com/pushrocks/npmts/commits/master)
[![coverage report](https://gitlab.com/pushrocks/npmts/badges/master/coverage.svg)](https://gitlab.com/pushrocks/npmts/commits/master)
[![Dependency Status](https://david-dm.org/pushrocks/npmts.svg)](https://david-dm.org/pushrocks/npmts)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/npmts/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/npmts/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/npmts/badges/code.svg)](https://www.bithound.io/github/pushrocks/npmts)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Usage
We recommend the use of TypeScript for best in class Intellisense

```javascript
import { Smartchok } from 'smartchok'

let mySmartChok = new Smartchok(['some/path/**/*.any','/absolute/*.js'], chokidarOptions)

mySmartChok.add(['/some/**/*.any']) // add files

mySmartChok.remove('some/**/*.js')

mySmartChok.start() // starts the watch process

mySmartChok.getObservableFor('change').then((observableArg) => {
    observableArg.subscribe(x => {
        // do something here when a change detected
        // note that the observable is only created once you call .start() on the Smartchok instance
        // hence the promise construction
    })
})

mySmartChok.stop()
```

[![npm](https://push.rocks/assets/repo-header.svg)](https://push.rocks)
