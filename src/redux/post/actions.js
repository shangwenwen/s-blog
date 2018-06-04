import { postConstants } from './constants'

// action creates
const load = () => ({
  type: postConstants.LOAD
})

const loadSuccess = (data, pathname) => ({
  type: postConstants.LOAD_SUCCESS,
  data,
  pathname
})

const loadFailure = (error) => ({
  type: postConstants.LOAD_FAILURE,
  error
})

export const postActions = { load, loadSuccess, loadFailure }
