import { Map } from 'immutable'
import { authConstants } from '../_constants'

// userReducer
export function authReducer(state = new Map(), action) {
  switch (action.type) {
    case authConstants.AUTH_LOGIN_REQUEST:
      return state.set('isPending', true)
    case authConstants.AUTH_LOGIN_FAILURE:
      return state.merge({
        'error': action.error,
        'isPending': false
      })
    case authConstants.AUTH_LOGIN_SUCCESS:
      return state.merge({
        'token': action.user,
        'isPending': false,
        'error': null
      })
    case authConstants.AUTH_LOGOUT:
      return new Map()
    default:
      return state
  }
}
