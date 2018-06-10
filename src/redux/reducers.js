import { combineReducers } from 'redux'
import auth from './auth'
import user from './user'
import topics from './topics'
import post from './post'

export default combineReducers({
  auth: auth.reducer,
  user: user.reducer,
  topics: topics.reducer,
  post: post.reducer
})
