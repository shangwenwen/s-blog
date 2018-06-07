import constants from './constants'

// action creates
const load = () => ({
  type: constants.LOAD
})

const loadSuccess = (list, hasNext) => ({
  type: constants.LOAD_SUCCESS,
  page: params.page,
  list,
  hasNext,
  pathname: params.pathname
})

const loadFailure = (error) => ({
  type: constants.LOAD_FAILURE,
  error
})

const scrollTop = () => ({
  type: constants.SCROLL_TOP,
  scrollTop
})

export default { load, loadSuccess, loadFailure, scrollTop }
