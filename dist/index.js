"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUE4QztBQUM5Qyw2QkFBK0I7QUFLL0I7O0dBRUc7QUFDSDtJQVFFOztPQUVHO0lBQ0gsWUFBWSxhQUF1QixFQUFFLGFBQTRDLEVBQUU7UUFWbkYsbUJBQWMsR0FBRyxJQUFJLGVBQVMsRUFBRSxDQUFBO1FBRWhDLFdBQU0sR0FBcUIsTUFBTSxDQUFBO1FBRXpCLHFCQUFnQixHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFRLENBQUEsQ0FBQyxpREFBaUQ7UUFDNUYsdUJBQWtCLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFBLENBQUMsb0NBQW9DO1FBTS9GLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ2pELElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFBO0lBQ25DLENBQUM7SUFFRDs7T0FFRztJQUNILEdBQUcsQ0FBQyxZQUFzQjtRQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNoRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQ2hDLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztJQUVILENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxPQUFlO1FBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUMsT0FBTztRQUM1QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUMvQixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNILGdCQUFnQixDQUFDLE9BQWlCO1FBQ2hDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUE4QixDQUFBO1FBQ3hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2pDLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQ2pHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDL0IsQ0FBQyxDQUFDLENBQUE7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSztRQUNILElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFRLENBQUE7UUFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUE7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUNqRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUE7WUFDeEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQy9CLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNoQixDQUFDLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUk7UUFDRixJQUFJLFlBQVksR0FBRztZQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ3RCLENBQUMsQ0FBQTtRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUE7WUFDckMsWUFBWSxFQUFFLENBQUE7UUFDaEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxZQUFZLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzlELENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUFqRkQsOEJBaUZDIn0=