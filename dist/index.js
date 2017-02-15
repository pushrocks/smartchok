"use strict";
const plugins = require("./smartchok.plugins");
const lik_1 = require("lik");
/**
 * Smartchok allows easy wathcing of files
 */
class Smartchok {
    /**
     * constructor of class smartchok
     */
    constructor(watchArrayArg, optionsArg = {}) {
        this.watchStringmap = new lik_1.Stringmap();
        this.status = 'idle';
        this.watchingDeferred = plugins.q.defer(); // used to run things when watcher is initialized
        this.eventObservablemap = new plugins.lik.Observablemap(); // register one observable per event
        this.watchStringmap.addStringArray(watchArrayArg);
        this.chokidarOptions = optionsArg;
    }
    /**
     * adds files to the list of watched files
     */
    add(pathArrayArg) {
        this.watchStringmap.addStringArray(pathArrayArg);
        if (this.status !== 'idle') {
            this.watchingDeferred.promise.then(() => {
                this.watcher.add(pathArrayArg);
            });
        }
    }
    /**
     * removes files from the list of watched files
     */
    remove(pathArg) {
        this.watchStringmap.removeString(''); // TODO
        this.watchingDeferred.promise.then(() => {
            this.watcher.unwatch(pathArg);
        });
    }
    /**
     * gets an observable for a certain event
     */
    getObservableFor(fsEvent) {
        let done = plugins.q.defer();
        this.watchingDeferred.promise.then(() => {
            let eventObservable = this.eventObservablemap.getObservableForEmitterEvent(this.watcher, fsEvent);
            done.resolve(eventObservable);
        });
        return done.promise;
    }
    /**
     * starts the watcher
     * @returns Promise<void>
     */
    start() {
        let done = plugins.q.defer();
        this.status = 'starting';
        this.watcher = plugins.chokidar.watch(this.watchStringmap.getStringArray(), this.chokidarOptions);
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
        }
        else if (this.status === 'starting') {
            this.watchingDeferred.promise.then(() => { closeWatcher(); });
        }
    }
}
exports.Smartchok = Smartchok;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0NBQThDO0FBQzlDLDZCQUErQjtBQUsvQjs7R0FFRztBQUNIO0lBUUU7O09BRUc7SUFDSCxZQUFZLGFBQXVCLEVBQUUsYUFBNEMsRUFBRTtRQVZuRixtQkFBYyxHQUFHLElBQUksZUFBUyxFQUFFLENBQUE7UUFFaEMsV0FBTSxHQUFxQixNQUFNLENBQUE7UUFFekIscUJBQWdCLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQVEsQ0FBQSxDQUFDLGlEQUFpRDtRQUM1Rix1QkFBa0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUEsQ0FBQyxvQ0FBb0M7UUFNL0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDakQsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUE7SUFDbkMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsR0FBRyxDQUFDLFlBQXNCO1FBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ2hELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7WUFDaEMsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO0lBRUgsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLE9BQWU7UUFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBQyxPQUFPO1FBQzVDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQy9CLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0gsZ0JBQWdCLENBQUMsT0FBaUI7UUFDaEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQThCLENBQUE7UUFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDakMsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7WUFDakcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUMvQixDQUFDLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3JCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLO1FBQ0gsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQVEsQ0FBQTtRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQTtRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ2pHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtZQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQTtZQUN4QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUE7WUFDL0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSTtRQUNGLElBQUksWUFBWSxHQUFHO1lBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDdEIsQ0FBQyxDQUFBO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtZQUNyQyxZQUFZLEVBQUUsQ0FBQTtRQUNoQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLFlBQVksRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDOUQsQ0FBQztJQUNILENBQUM7Q0FDRjtBQWpGRCw4QkFpRkMifQ==