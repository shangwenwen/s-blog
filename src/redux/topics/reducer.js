import { fromJS } from 'immutable'
import { topicsConstants } from './constants'

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

export function topicsReducer(state = initStates, action) {
  switch (action.type) {
    case topicsConstants.GET_TOPICS_REQUEST:
      return state.set('isPending', true)
    case topicsConstants.GET_TOPICS_FAILURE:
      return state.merge({
        'error': action.error,
        'isPending': false
      })
    case 'SAVE_SCROLL_TOP':
      return state.merge({
        'scrollTop': action.top,
      })
    case topicsConstants.GET_TOPICS_SUCCESS: {
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
    default:
      return state
  }
}
