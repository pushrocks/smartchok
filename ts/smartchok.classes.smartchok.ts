import * as plugins from './smartchok.plugins';
import { Stringmap } from '@pushrocks/lik';
import { Observablemap } from '@pushrocks/smartrx';

export type TSmartchokStatus = 'idle' | 'starting' | 'watching';
export type TFsEvent =
  | 'add'
  | 'addDir'
  | 'change'
  | 'error'
  | 'unlink'
  | 'unlinkDir'
  | 'ready'
  | 'raw';

/**
 * Smartchok allows easy wathcing of files
 */
export class Smartchok {
  watchStringmap = new Stringmap();
  chokidarOptions: plugins.chokidar.WatchOptions;
  status: TSmartchokStatus = 'idle';
  private watcher;
  private watchingDeferred = plugins.smartpromise.defer<void>(); // used to run things when watcher is initialized
  private eventObservablemap = new plugins.smartrx.Observablemap(); // register one observable per event

  /**
   * constructor of class smartchok
   */
  constructor(watchArrayArg: string[], optionsArg: plugins.chokidar.WatchOptions = {}) {
    this.watchStringmap.addStringArray(watchArrayArg);
    this.chokidarOptions = optionsArg;
  }

  /**
   * adds files to the list of watched files
   */
  add(pathArrayArg: string[]) {
    this.watchStringmap.addStringArray(pathArrayArg);
  }

  /**
   * removes files from the list of watched files
   */
  remove(pathArg: string) {
    this.watchStringmap.removeString(pathArg);
  }

  /**
   * gets an observable for a certain event
   */
  getObservableFor(fsEvent: TFsEvent): Promise<plugins.smartrx.rxjs.Observable<any>> {
    let done = plugins.smartpromise.defer<plugins.smartrx.rxjs.Observable<any>>();
    this.watchingDeferred.promise.then(() => {
      let eventObservable = this.eventObservablemap.getObservableForEmitterEvent(
        this.watcher,
        fsEvent
      );
      done.resolve(eventObservable);
    });
    return done.promise;
  }

  /**
   * starts the watcher
   * @returns Promise<void>
   */
  start(): Promise<void> {
    let done = plugins.smartpromise.defer<void>();
    this.status = 'starting';
    this.watcher = plugins.chokidar.watch(
      this.watchStringmap.getStringArray(),
      this.chokidarOptions
    );
    this.watcher.on('ready', () => {
      this.status = 'watching';
      this.watchingDeferred.resolve();
      done.resolve();
    });
    return done.promise;
  }

  /**
   * stop the watcher process if watching
   */
  stop() {
    let closeWatcher = () => {
      this.watcher.close();
    };
    if (this.status === 'watching') {
      console.log('closing while watching');
      closeWatcher();
    } else if (this.status === 'starting') {
      this.watchingDeferred.promise.then(() => {
        closeWatcher();
      });
    }
  }
}
