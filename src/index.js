import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { configureStore, history } from './_helpers'

import AppContainer from './App'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <AppContainer />
    </Router>
  </Provider>,
  document.getElementById('root')
)
