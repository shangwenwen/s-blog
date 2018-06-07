import constants from './constants'

// action creates
const load = () => ({
  type: constants.LOAD
})

const loadSuccess = (user) => ({
  type: constants.LOAD_SUCCESS,
  user
})

const loadFailure = (error) => ({
  type: constants.LOAD_FAILURE,
  error
})

export default { load, loadSuccess, loadFailure }
