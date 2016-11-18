"use strict";
require("typings-test");
const should = require("should");
const smartfile = require("smartfile");
const smartchok = require("../dist/index");
describe('smartchok', function () {
    let testSmartchok;
    let testAddObservable;
    let testSubscription;
    it('should create a new instance', function () {
        testSmartchok = new smartchok.Smartchok([]);
        should(testSmartchok).be.instanceof(smartchok.Smartchok);
    });
    it('should add some files to watch and start', function (done) {
        testSmartchok.add(['./test/assets/**/*.txt']);
        testSmartchok.start().then(() => {
            testSmartchok.add(['./test/assets/**/*.md']);
            done();
        }).catch(err => { console.log(err); });
    });
    it('should get an observable for a certain event', function (done) {
        testSmartchok.getObservableFor('add').then((observableArg) => {
            testAddObservable = observableArg;
            done();
        }).catch(err => { console.log(err); });
    });
    it('should register an add operation', function (done) {
        this.timeout(5000);
        testSubscription = testAddObservable.subscribe(x => {
            done();
        });
        smartfile.memory.toFs('HI', './test/assets/hi.txt');
    });
    it('should stop the watch process', function () {
        testSmartchok.stop();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUNyQixpQ0FBZ0M7QUFDaEMsdUNBQXNDO0FBRXRDLDJDQUEwQztBQUUxQyxRQUFRLENBQUMsV0FBVyxFQUFDO0lBQ2pCLElBQUksYUFBa0MsQ0FBQTtJQUN0QyxJQUFJLGlCQUFxQyxDQUFBO0lBQ3pDLElBQUksZ0JBQWlDLENBQUE7SUFDckMsRUFBRSxDQUFDLDhCQUE4QixFQUFDO1FBQzlCLGFBQWEsR0FBRyxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDM0MsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQzVELENBQUMsQ0FBQyxDQUFBO0lBQ0YsRUFBRSxDQUFDLDBDQUEwQyxFQUFDLFVBQVMsSUFBSTtRQUN2RCxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFBO1FBQzdDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDdkIsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQTtZQUM1QyxJQUFJLEVBQUUsQ0FBQTtRQUNWLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3pDLENBQUMsQ0FBQyxDQUFBO0lBQ0YsRUFBRSxDQUFDLDhDQUE4QyxFQUFDLFVBQVMsSUFBSTtRQUMzRCxhQUFhLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYTtZQUNyRCxpQkFBaUIsR0FBRyxhQUFhLENBQUE7WUFDakMsSUFBSSxFQUFFLENBQUE7UUFDVixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN6QyxDQUFDLENBQUMsQ0FBQTtJQUNGLEVBQUUsQ0FBQyxrQ0FBa0MsRUFBQyxVQUFTLElBQUk7UUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNsQixnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1QyxJQUFJLEVBQUUsQ0FBQTtRQUNWLENBQUMsQ0FBQyxDQUFBO1FBQ0YsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLHNCQUFzQixDQUFDLENBQUE7SUFDdEQsQ0FBQyxDQUFDLENBQUE7SUFDRixFQUFFLENBQUMsK0JBQStCLEVBQUM7UUFDL0IsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ3hCLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUEifQ==