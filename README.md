# smartchok
smart wrapper for chokidar

## Availabililty
[![npm](https://push.rocks/assets/repo-button-npm.svg)](https://www.npmjs.com/package/smartchok)
[![git](https://push.rocks/assets/repo-button-git.svg)](https://gitlab.com/pushrocks/smartchok)
[![git](https://push.rocks/assets/repo-button-mirror.svg)](https://github.com/pushrocks/smartchok)
[![docs](https://push.rocks/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/smartchok/)

## Status for master
[![build status](https://gitlab.com/pushrocks/smartchok/badges/master/build.svg)](https://gitlab.com/pushrocks/smartchok/commits/master)
[![coverage report](https://gitlab.com/pushrocks/smartchok/badges/master/coverage.svg)](https://gitlab.com/pushrocks/smartchok/commits/master)
[![Dependency Status](https://david-dm.org/pushrocks/smartchok.svg)](https://david-dm.org/pushrocks/smartchok)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/smartchok/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/smartchok/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/smartchok/badges/code.svg)](https://www.bithound.io/github/pushrocks/smartchok)
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
        // do something here when a change is detected
        // possible events are 'add' | 'addDir' | 'change' | 'error' | 'unlink' | 'unlinkDir' | 'ready' | 'raw'
        // note that the observable is only created once you call .start() on the Smartchok instance
        // hence the promise construction
    })
})

mySmartChok.stop()
```

[![npm](https://push.rocks/assets/repo-header.svg)](https://push.rocks)
