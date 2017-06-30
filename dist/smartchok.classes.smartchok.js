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
    }
    /**
     * removes files from the list of watched files
     */
    remove(pathArg) {
        this.watchStringmap.removeString(pathArg);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRjaG9rLmNsYXNzZXMuc21hcnRjaG9rLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRjaG9rLmNsYXNzZXMuc21hcnRjaG9rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQThDO0FBQzlDLDZCQUErQjtBQUsvQjs7R0FFRztBQUNIO0lBUUU7O09BRUc7SUFDSCxZQUFhLGFBQXVCLEVBQUUsYUFBNEMsRUFBRTtRQVZwRixtQkFBYyxHQUFHLElBQUksZUFBUyxFQUFFLENBQUE7UUFFaEMsV0FBTSxHQUFxQixNQUFNLENBQUE7UUFFekIscUJBQWdCLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQVEsQ0FBQSxDQUFDLGlEQUFpRDtRQUM1Rix1QkFBa0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUEsQ0FBQyxvQ0FBb0M7UUFNL0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDakQsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUE7SUFDbkMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsR0FBRyxDQUFDLFlBQXNCO1FBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ2xELENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBRSxPQUFlO1FBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzNDLENBQUM7SUFFRDs7T0FFRztJQUNILGdCQUFnQixDQUFFLE9BQWlCO1FBQ2pDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUE4QixDQUFBO1FBQ3hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2pDLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQ2pHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDL0IsQ0FBQyxDQUFDLENBQUE7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSztRQUNILElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFRLENBQUE7UUFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUE7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUNqRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUE7WUFDeEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQy9CLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNoQixDQUFDLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUk7UUFDRixJQUFJLFlBQVksR0FBRztZQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ3RCLENBQUMsQ0FBQTtRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUE7WUFDckMsWUFBWSxFQUFFLENBQUE7UUFDaEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxZQUFZLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzlELENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUF4RUQsOEJBd0VDIn0=