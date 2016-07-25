
import install from './install'
import start from './start'
import init from './init'
import * as theme from './theme'

import './polyfills'
import './error-handler'
import './fastclick'

import ActionSheet from './components/action-sheet/action-sheet'
import Dialog from './components/dialog/dialog'
import Modal from './components/modal/modal'
import Notify from './components/notify/notify'

import AppFullscreen from './app-fullscreen'
import AppVisibility from './app-visibility'
import Cookies from './cookies'
import Platform from './platform'
import Events from './events'
import Keycodes from './keycodes'
import Loading from './loading'
import Utils from './utils'
import { LocalStorage, SessionStorage } from './web-storage'

let Quasar = {
  version: '0.5.0',
  install,
  start,
  theme,

  ActionSheet,
  Dialog,
  AppFullscreen,
  AppVisibility,
  Cookies,
  Platform,
  Events,
  Keycodes,
  Loading,
  Modal,
  Notify,
  Utils,
  LocalStorage,
  SessionStorage
}

init(Quasar)

export default Quasar
