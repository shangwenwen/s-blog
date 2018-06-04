import { postConstants } from './constants'
import { postService } from './service'

// action creates
const load = () => ({
  type: postConstants.GET_POST_REQUEST
})

const loadSuccess = (data, pathname) => ({
  type: postConstants.GET_POST_SUCCESS,
  data,
  pathname
})

const loadFailure = (error) => ({
  type: postConstants.GET_POST_FAILURE,
  error
})

export const postActions = { load,loadSuccess,loadFailure }
