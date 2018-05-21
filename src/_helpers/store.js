import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../_reducers'

export const configureStore = (preloadedState) => {

  let middleware = compose(
    applyMiddleware(thunk)
  )

  /* eslint-disable */
  if (process.env.NODE_ENV !== 'production') {
    middleware = compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  }
  /* eslint-enable */

  const store = createStore(rootReducer, preloadedState, middleware)

  return store
}
