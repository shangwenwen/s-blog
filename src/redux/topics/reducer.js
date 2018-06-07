import { fromJS } from 'immutable'
import constants from './constants'

// userReducer
const initStates = fromJS({
  lists: [],
  hasNext: 0,
  page: 1,
  pathname: null,
  isPending: false,
  scrollTop: 0,
  error: null
})

export default function reducer(state = initStates, action) {
  switch (action.type) {
    case constants.LOAD:
      return state.set('isPending', true)
    case constants.LOAD_FAILURE:
      return state.merge({
        'error': action.error,
        'isPending': false
      })
    case constants.LOAD_SUCCESS: {
      const { page, list, hasNext, pathname } = action
      const lists = (page === 1) ? [].concat(list) : state.toJS().lists.concat(list)
      return state.merge({
        'lists': lists,
        'page': page,
        'pathname': pathname,
        'hasNext': hasNext,
        'isPending': false,
        'error': null
      })
    }
    case constants.SCROLL_TOP:
      return state.merge({
        'scrollTop': action.scrollTop,
      })
    default:
      return state
  }
}
