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
        this.watchingDeferred = plugins.smartq.defer(); // used to run things when watcher is initialized
        this.eventObservablemap = new plugins.smartrx.Observablemap(); // register one observable per event
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
        let done = plugins.smartq.defer();
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
        let done = plugins.smartq.defer();
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
            this.watchingDeferred.promise.then(() => {
                closeWatcher();
            });
        }
    }
}
exports.Smartchok = Smartchok;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRjaG9rLmNsYXNzZXMuc21hcnRjaG9rLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRjaG9rLmNsYXNzZXMuc21hcnRjaG9rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQStDO0FBQy9DLDZCQUFnQztBQWNoQzs7R0FFRztBQUNIO0lBUUU7O09BRUc7SUFDSCxZQUFZLGFBQXVCLEVBQUUsYUFBNEMsRUFBRTtRQVZuRixtQkFBYyxHQUFHLElBQUksZUFBUyxFQUFFLENBQUM7UUFFakMsV0FBTSxHQUFxQixNQUFNLENBQUM7UUFFMUIscUJBQWdCLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQVEsQ0FBQyxDQUFDLGlEQUFpRDtRQUNsRyx1QkFBa0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxvQ0FBb0M7UUFNcEcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUM7SUFDcEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsR0FBRyxDQUFDLFlBQXNCO1FBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxPQUFlO1FBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7T0FFRztJQUNILGdCQUFnQixDQUFDLE9BQWlCO1FBQ2hDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUF3QyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUN0QyxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsNEJBQTRCLENBQ3hFLElBQUksQ0FBQyxPQUFPLEVBQ1osT0FBTyxDQUNSLENBQUM7WUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUs7UUFDSCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBUSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQ25DLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLEVBQ3BDLElBQUksQ0FBQyxlQUFlLENBQ3JCLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJO1FBQ0YsSUFBSSxZQUFZLEdBQUcsR0FBRyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDO1FBQ0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUN0QyxZQUFZLEVBQUUsQ0FBQztRQUNqQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ3RDLFlBQVksRUFBRSxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUM7Q0FDRjtBQWhGRCw4QkFnRkMifQ==