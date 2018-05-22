import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { configureStore } from './_helpers'
import { fromJS, Map } from 'immutable'
import cookies from 'js-cookie'

import AppContainer from './App'

// 初始化 USER
let token = cookies.get('user')

const store = configureStore(
  token
    ? { auth: fromJS({ token: token }) }
    : { auth: new Map() }
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AppContainer />
    </Router>
  </Provider>,
  document.getElementById('root')
)
