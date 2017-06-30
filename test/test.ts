import { tap, expect } from 'tapbundle'
import * as smartfile from 'smartfile'
import * as smartq from 'smartq'

// the module to test
import * as smartchok from '../dist/index'

import * as rx from 'rxjs/Rx'

let testSmartchok: smartchok.Smartchok
let testAddObservable: rx.Observable<any>
let testSubscription: rx.Subscription
tap.test('should create a new instance', async () => {
  testSmartchok = new smartchok.Smartchok([])
  return expect(testSmartchok).to.be.instanceof(smartchok.Smartchok)
}).catch(tap.threw)

tap.test('should add some files to watch and start', async () => {
  testSmartchok.add([ './test/assets/**/*.txt' ])
  let localPromise = testSmartchok.start().then(async () => {
    testSmartchok.add([ './test/assets/**/*.md' ])
  })
  return await expect(localPromise).to.eventually.be.fulfilled
}).catch(tap.threw)

tap.test('should get an observable for a certain event', async () => {
  let localPromise = testSmartchok.getObservableFor('add').then(async (observableArg) => {
    testAddObservable = observableArg
  })
  return await expect(localPromise).to.eventually.be.fulfilled
}).catch(tap.threw)

tap.test('should register an add operation', async () => {
  let testDeferred = smartq.defer()
  testSubscription = testAddObservable.subscribe(x => {
    testDeferred.resolve()
  })
  smartfile.memory.toFs('HI', './test/assets/hi.txt')
  return await expect(testDeferred.promise).to.eventually.be.fulfilled
}).catch(tap.threw)

tap.test('should stop the watch process', async () => {
  testSmartchok.stop()
}).catch(tap.threw)

tap.start()
