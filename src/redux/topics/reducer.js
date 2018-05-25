import { fromJS } from 'immutable'
import { topicsConstants } from './constants'

// userReducer
const initStates = fromJS({
  lists: [],
  hasNext: 0,
  page: 1,
  isPending: false,
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
    case topicsConstants.GET_TOPICS_SUCCESS: {
      const { page, list, hasNext } = action
      const lists = (page === 1) ? [].concat(list) : state.toJS().data.concat(list)
      return state.merge({
        'lists': lists,
        'page': page,
        'hasNext': hasNext,
        'isPending': false,
        'error': null
      })
    }
    default:
      return state
  }
}
