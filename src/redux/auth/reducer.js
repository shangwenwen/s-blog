import { Map } from 'immutable'
import constants from './constants'

// userReducer
export default function reducer(state = new Map(), action) {
  switch (action.type) {
    case constants.LOGIN:
      return state.set('isPending', true)
    case constants.LOGIN_FAILURE:
      return state.merge({
        'error': action.error,
        'isPending': false
      })
    case constants.LOGIN_SUCCESS:
      return state.merge({
        'token': action.user,
        'isPending': false,
        'error': null
      })
    case constants.LOGOUT:
      return new Map()
    default:
      return state
  }
}
