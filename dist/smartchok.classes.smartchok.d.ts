import * as plugins from './smartchok.plugins';
export declare type TSmartchokStatus = 'idle' | 'starting' | 'watching';
export declare type TFsEvent = 'add' | 'addDir' | 'change' | 'error' | 'unlink' | 'unlinkDir' | 'ready' | 'raw';
/**
 * Smartchok allows easy wathcing of files
 */
export declare class Smartchok {
    watchStringmap: plugins.lik.Stringmap;
    chokidarOptions: plugins.chokidar.WatchOptions;
    status: TSmartchokStatus;
    private watcher;
    private watchingDeferred;
    private eventObservablemap;
    /**
     * constructor of class smartchok
     */
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
    getObservableFor(fsEvent: TFsEvent): Promise<plugins.smartrx.rxjs.Observable<any>>;
    /**
     * starts the watcher
     * @returns Promise<void>
     */
    start(): Promise<void>;
    /**
     * stop the watcher process if watching
     */
    stop(): void;
}
