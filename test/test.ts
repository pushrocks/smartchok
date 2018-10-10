import { tap, expect } from '@pushrocks/tapbundle';
import * as smartchok from '../ts/index';
import * as smartfile from '@pushrocks/smartfile';
import * as smartpromise from '@pushrocks/smartpromise';
import * as rx from 'rxjs/Rx';

// the module to test

let testSmartchok: smartchok.Smartchok;
let testAddObservable: rx.Observable<any>;
let testSubscription: rx.Subscription;
tap.test('should create a new instance', async () => {
  testSmartchok = new smartchok.Smartchok([]);
  expect(testSmartchok).to.be.instanceof(smartchok.Smartchok);
});

tap.test('should add some files to watch and start', async () => {
  testSmartchok.add(['./test/assets/**/*.txt']);
  let localPromise = testSmartchok.start().then(async () => {
    testSmartchok.add(['./test/assets/**/*.md']);
  });
  await expect(localPromise).to.eventually.be.fulfilled;
});

tap.test('should get an observable for a certain event', async () => {
  let localPromise = testSmartchok.getObservableFor('add').then(async observableArg => {
    testAddObservable = observableArg;
  });
  await expect(localPromise).to.eventually.be.fulfilled;
});

tap.test('should register an add operation', async () => {
  let testDeferred = smartpromise.defer();
  testSubscription = testAddObservable.subscribe(x => {
    testDeferred.resolve();
  });
  smartfile.memory.toFs('HI', './test/assets/hi.txt');
  await expect(testDeferred.promise).to.eventually.be.fulfilled;
});

tap.test('should stop the watch process', async () => {
  testSmartchok.stop();
});

tap.start();
