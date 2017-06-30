import 'typings-global'
export import lik = require('lik')
export import chokidar = require('chokidar')
export import path = require('path')
export import smartq = require('smartq')
export import rx = require('rxjs/Rx')

// workaround
import {Operator} from 'rxjs/Operator'
import {Observable} from 'rxjs/Observable'
declare module 'rxjs/Subject' {
  interface Subject<T> {
    lift<R>(operator: Operator<T, R>): Observable<R>
  }
}
