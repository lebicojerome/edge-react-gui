// @flow
/* global __DEV__ */

import React, {Component} from 'react'
import {Provider} from 'react-redux'
import configureStore from './lib/configureStore'
import Main from './modules/MainConnector'
import {log, logToServer} from './util/logger'
import ENV from '../env.json'

import './util/polyfills'

const store: {} = configureStore({})

const perfTimers = {}
const perfCounters = {}

if (!__DEV__) {
  // $FlowFixMe: suppressing this error until we can find a workaround
  console.log = log
}

if (ENV.LOG_SERVER) {
  let originalLog = console.log
  // $FlowFixMe: suppressing this error until we can find a workaround
  console.log = function () {
    logToServer(arguments)
    originalLog.apply(this, arguments)
  }
}

const clog = console.log

const PERF_LOGGING_ONLY = false

if (PERF_LOGGING_ONLY) {
// $FlowFixMe: suppressing this error until we can find a workaround
  console.log = () => {}
}

// $FlowFixMe: suppressing this error until we can find a workaround
global.pstart = function (label: string) {
// $FlowFixMe: suppressing this error until we can find a workaround
  if (typeof perfTimers[label] === 'undefined') {
    perfTimers[label] = Date.now()
  } else {
    clog('Error: PTimer already started')
  }
}

// $FlowFixMe: suppressing this error until we can find a workaround
global.pend = function (label: string) {
// $FlowFixMe: suppressing this error until we can find a workaround
  if (typeof perfTimers[label] === 'number') {
    const elapsed = Date.now() - perfTimers[label]
    clog('PTIMER: ' + label + ': ' + elapsed + 'ms')
    perfTimers[label] = undefined
  } else {
    clog('Error: PTimer not started')
  }
}

// $FlowFixMe: suppressing this error until we can find a workaround
global.pcount = function (label: string) {
// $FlowFixMe: suppressing this error until we can find a workaround
  if (typeof perfCounters[label] === 'undefined') {
    perfCounters[label] = 1
  } else {
    perfCounters[label] = perfCounters[label] + 1
    if (perfCounters[label] % 10 === 0) {
      clog('PCOUNT: ' + label + ': ' + perfCounters[label])
    }
  }
}

export default class App extends Component<{}> {
  render () {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}
