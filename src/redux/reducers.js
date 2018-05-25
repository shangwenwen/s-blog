import { combineReducers } from 'redux'
import { authReducer } from './auth'
import { userReducer } from './user'
import { topicsReducer } from './topics'
import { postReducer } from './post'

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  topics: topicsReducer,
  post: postReducer
})
