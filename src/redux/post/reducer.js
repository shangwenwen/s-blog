import { fromJS } from 'immutable'
import constants from './constants'

// reducer
const initStates = fromJS({
  data: {},
  pathname: '',
  isPending: false,
  error: null
})

export default function reducer(state = initStates, action) {
  switch (action.type) {
    case constants.LOAD:
      return state.merge({
        'isPending': true
      })
    case constants.LOAD_SUCCESS: {
      const { data } = action
      return state.merge({
        'data': data,
        'isPending': false
      })
    }
    case constants.LOAD_FAILURE:
      return state.merge({
        'isPending': false,
        'error': action.error
      })
    default:
      return state
  }
}
