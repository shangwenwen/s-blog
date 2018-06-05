import constants from './constants'

// action creates
const load = () => ({
  type: constants.LOAD
})

const loadSuccess = (data, pathname) => ({
  type: constants.LOAD_SUCCESS,
  data,
  pathname
})

const loadFailure = (error) => ({
  type: constants.LOAD_FAILURE,
  error
})

export default { load, loadSuccess, loadFailure }
