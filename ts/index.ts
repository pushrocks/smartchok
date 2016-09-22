import * as plugins from './smartchok.plugins'
import { Stringmap } from 'lik'

export type TSmartchokStatus = 'idle' | 'starting' | 'watching'
export type TFsEvent = 'add' | 'addDir' | 'change' | 'error' | 'unlink' | 'unlinkDir' | 'ready' | 'raw'

export class Smartchok {
    watchStringmap = new Stringmap()
    chokidarOptions: plugins.chokidar.WatchOptions
    status: TSmartchokStatus
    private watcher
    private watchingDeferred = plugins.q.defer<void>() // used to run things when watcher is initialized
    private eventObservablemap = new plugins.lik.Observablemap() // register one observable per event

    constructor(watchArrayArg: string[], optionsArg: plugins.chokidar.WatchOptions = {}) {
        this.watchStringmap.addStringArray(watchArrayArg)
        this.chokidarOptions = optionsArg
    }

    /**
     * adds files to the list of watched files
     */
    add(pathArrayArg: string[]) {
        this.watchStringmap.addStringArray(pathArrayArg)
        this.watchingDeferred.promise.then(() => {
            this.watcher.add(pathArrayArg)
        })
    }

    /**
     * removes files from the list of watched files
     */
    remove(pathArg: string) {
        this.watchStringmap.removeString('') // TODO
        this.watchingDeferred.promise.then(() => {
            this.watcher.unwatch(pathArg)
        })
    }

    /**
     * gets an observable for a certain event
     */
    getObservableFor(fsEvent: TFsEvent): plugins.q.Promise<plugins.rx.Observable<any>> {
        let done = plugins.q.defer<plugins.rx.Observable<any>>()
        this.watchingDeferred.promise.then(() => {
            let eventObservable = this.eventObservablemap.getObservableForEmitterEvent(this.watcher, fsEvent)
            done.resolve(eventObservable)
        })
        return done.promise
    }

    /**
     * starts the watcher
     * @returns Promise<void>
     */
    start(): plugins.q.Promise<void> {
        let done = plugins.q.defer<void>()
        this.status = 'starting'
        this.watcher = plugins.chokidar.watch(this.watchStringmap.getStringArray(), this.chokidarOptions)
        this.watcher.on('ready', () => {
            this.status = 'watching'
            this.watchingDeferred.resolve()
            done.resolve()
        })
        return done.promise
    }

    /**
     * stop the watcher process if watching
     */
    stop() {
        let closeWatcher = () => {
            this.watcher.close()
        }
        if (this.status === 'watching') {
            console.log('closing while watching')
            closeWatcher()
        } else if (this.status === 'starting') {
            this.watchingDeferred.promise.then(() => { closeWatcher() })
        }
    }
}
