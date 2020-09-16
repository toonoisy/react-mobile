import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import App from './App'
import '@utils/flexible'

import "@assets/css/common.css";
import "@assets/css/reset.css";
// import "@assets/css/iconfont.css";

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))