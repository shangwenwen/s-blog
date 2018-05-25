import { fromJS } from 'immutable'
import { postConstants } from './constants'

const initStates = fromJS({
  data: ''
})

export function postReducer(state = initStates, action) {
  switch (action.type) {
    case postConstants.GET_POST_REQUEST:
      return state.merge({
        data: ''
      })
    default:
      return state
  }
}
