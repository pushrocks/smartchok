# @pushrocks/smartchok
smart wrapper for chokidar

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@pushrocks/smartchokidar)
* [gitlab.com (source)](https://gitlab.com/pushrocks/smartchok)
* [github.com (source mirror)](https://github.com/pushrocks/smartchok)
* [docs (typedoc)](https://pushrocks.gitlab.io/smartchok/)

## Status for master
[![build status](https://gitlab.com/pushrocks/smartchok/badges/master/build.svg)](https://gitlab.com/pushrocks/smartchok/commits/master)
[![coverage report](https://gitlab.com/pushrocks/smartchok/badges/master/coverage.svg)](https://gitlab.com/pushrocks/smartchok/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/@pushrocks/smartchokidar.svg)](https://www.npmjs.com/package/@pushrocks/smartchokidar)
[![Known Vulnerabilities](https://snyk.io/test/npm/@pushrocks/smartchokidar/badge.svg)](https://snyk.io/test/npm/@pushrocks/smartchokidar)
[![TypeScript](https://img.shields.io/badge/TypeScript->=%203.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

## Usage

Use TypeScript for best in class instellisense.

```javascript
import { Smartchok } from 'smartchok';

const mySmartChok = new Smartchok(['some/path/**/*.any', '/absolute/*.js'], chokidarOptions);

mySmartChok.add(['/some/**/*.any']); // add files

mySmartChok.remove('some/**/*.js');

mySmartChok.start(); // starts the watch process

mySmartChok.getObservableFor('change').then(observableArg => {
  observableArg.subscribe(x => {
    // do something here when a change is detected
    // possible events are 'add' | 'addDir' | 'change' | 'error' | 'unlink' | 'unlinkDir' | 'ready' | 'raw'
    // note that the observable is only created once you call .start() on the Smartchok instance
    // hence the promise construction
  });
});

mySmartChok.stop();
```

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy)

[![repo-footer](https://lossless.gitlab.io/publicrelations/repofooter.svg)](https://maintainedby.lossless.com)
