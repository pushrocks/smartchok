import 'typings-test'
import * as should from 'should'
import * as smartfile from 'smartfile'
import * as rx from 'rxjs/Rx'
import * as smartchok from '../dist/index'

describe('smartchok',function(){
    let testSmartchok: smartchok.Smartchok
    let testAddObservable: rx.Observable<any>
    let testSubscription: rx.Subscription
    it('should create a new instance',function(){
        testSmartchok = new smartchok.Smartchok([])
        should(testSmartchok).be.instanceof(smartchok.Smartchok)
    })
    it('should add some files to watch and start',function(done){
        testSmartchok.add(['./test/assets/**/*.txt'])
        testSmartchok.start().then(() => {
            testSmartchok.add(['./test/assets/**/*.md'])
            done()
        }).catch(err => { console.log(err) })
    })
    it('should get an observable for a certain event',function(done){
        testSmartchok.getObservableFor('add').then((observableArg) => {
            testAddObservable = observableArg
            done()
        }).catch(err => { console.log(err) })
    })
    it('should register an add operation',function(done){
        this.timeout(5000)
        testSubscription = testAddObservable.subscribe(x => {
            done()
        })
        smartfile.memory.toFs('HI','./test/assets/hi.txt')
    })
    it('should stop the watch process',function() {
        testSmartchok.stop()
    })
})
