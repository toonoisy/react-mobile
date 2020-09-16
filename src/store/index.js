import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from './reducers'
import {isDevelopment} from '../config/index'

export default createStore(reducers, isDevelopment  
  ? composeWithDevTools(applyMiddleware(thunk))
  : applyMiddleware(thunk))