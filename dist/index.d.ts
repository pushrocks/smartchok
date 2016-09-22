/// <reference types="chokidar" />
/// <reference types="q" />
import * as plugins from './smartchok.plugins';
import { Stringmap } from 'lik';
export declare type TSmartchokStatus = 'idle' | 'starting' | 'watching';
export declare type TFsEvent = 'add' | 'addDir' | 'change' | 'error' | 'unlink' | 'unlinkDir' | 'ready' | 'raw';
export declare class Smartchok {
    watchStringmap: Stringmap;
    chokidarOptions: plugins.chokidar.WatchOptions;
    status: TSmartchokStatus;
    private watcher;
    private watchingDeferred;
    private eventObservablemap;
    constructor(watchArrayArg: string[], optionsArg?: plugins.chokidar.WatchOptions);
    /**
     * adds files to the list of watched files
     */
    add(pathArrayArg: string[]): void;
    /**
     * removes files from the list of watched files
     */
    remove(pathArg: string): void;
    /**
     * gets an observable for a certain event
     */
    getObservableFor(fsEvent: TFsEvent): plugins.q.Promise<plugins.rx.Observable<any>>;
    /**
     * starts the watcher
     * @returns Promise<void>
     */
    start(): plugins.q.Promise<void>;
    /**
     * stop the watcher process if watching
     */
    stop(): void;
}
