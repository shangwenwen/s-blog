import { Map } from 'immutable'
import userConstants from './constants'
import authConstants from '../auth/constants'

// userReducer
export default function reducer(state = new Map(), action) {
  switch (action.type) {
    case userConstants.GET_USER_REQUEST:
      return state.set('isPending', true)
    case userConstants.GET_USER_FAILURE:
      return state.merge({
        'isPending': false,
        'error': action.error
      })
    case userConstants.GET_USER_SUCCESS:
      return state.merge({
        'username': action.user.username,
        'createDate': action.user.creat_date,
        'email': action.user.email,
        'isPending': false,
        'error': null
      })
    case authConstants.AUTH_LOGOUT:
      return new Map()
    default:
      return state
  }
}
