import { Map } from 'immutable'
import { userConstants } from '../_constants'

// userReducer
export function userReducer(state = new Map(), action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return state.set('isPending', true)
    case userConstants.LOGIN_FAILURE:
      return state.merge({
        'error': action.error,
        'isPending': false
      })
    case userConstants.LOGIN_SUCCESS:
      return state.merge({
        'username': action.payload.username,
        'token': action.payload.token,
        'isPending': false,
        'error': null
      })
    case userConstants.LOGOUT:
      return new Map()
    default:
      return state
  }
}
