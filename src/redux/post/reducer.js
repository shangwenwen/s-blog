import { fromJS } from 'immutable'
import { postConstants } from './constants'

const initStates = fromJS({
  data: {},
  pathname: '',
  isPending: false,
  error: null
})

export function postReducer(state = initStates, action) {
  switch (action.type) {
    case postConstants.GET_POST_REQUEST:
      return state.merge({
        'isPending': true
      })
    case postConstants.GET_POST_SUCCESS: {
      const { pathname, data } = action
      return state.merge({
        'data': data,
        'pathname': pathname,
        'isPending': false
      })
    }
    case postConstants.GET_POST_FAILURE:
      return state.merge({
        'isPending': false,
        'error': action.error
      })
    default:
      return state
  }
}
