"use strict";
const plugins = require("./smartchok.plugins");
const lik_1 = require("lik");
class Smartchok {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0NBQThDO0FBQzlDLDZCQUErQjtBQUsvQjtJQVFJLFlBQVksYUFBdUIsRUFBRSxhQUE0QyxFQUFFO1FBUG5GLG1CQUFjLEdBQUcsSUFBSSxlQUFTLEVBQUUsQ0FBQTtRQUVoQyxXQUFNLEdBQXFCLE1BQU0sQ0FBQTtRQUV6QixxQkFBZ0IsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBUSxDQUFBLENBQUMsaURBQWlEO1FBQzVGLHVCQUFrQixHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQSxDQUFDLG9DQUFvQztRQUc3RixJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUNqRCxJQUFJLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQTtJQUNyQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxHQUFHLENBQUMsWUFBc0I7UUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDaEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUNsQyxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7SUFFTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLENBQUMsT0FBZTtRQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFDLE9BQU87UUFDNUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDakMsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQ7O09BRUc7SUFDSCxnQkFBZ0IsQ0FBQyxPQUFpQjtRQUM5QixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBOEIsQ0FBQTtRQUN4RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUMvQixJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQTtZQUNqRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ2pDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDdkIsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUs7UUFDRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBUSxDQUFBO1FBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDakcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFBO1lBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUMvQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDbEIsQ0FBQyxDQUFDLENBQUE7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJO1FBQ0EsSUFBSSxZQUFZLEdBQUc7WUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ3hCLENBQUMsQ0FBQTtRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUE7WUFDckMsWUFBWSxFQUFFLENBQUE7UUFDbEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxZQUFZLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2hFLENBQUM7SUFDTCxDQUFDO0NBQ0o7QUE5RUQsOEJBOEVDIn0=