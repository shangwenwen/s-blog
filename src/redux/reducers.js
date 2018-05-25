import { combineReducers } from 'redux'
import { authReducer } from './auth'
import { userReducer } from './user'
import { topicsReducer } from './topics'

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  topics: topicsReducer
})
