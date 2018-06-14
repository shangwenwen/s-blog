import constants from './constants'

// action creates
const load = () => ({
  type: constants.LOAD
})

const loadSuccess = (list, hasNext, page, pathname) => ({
  type: constants.LOAD_SUCCESS,
  page,
  list,
  hasNext,
  pathname
})

const loadFailure = (error) => ({
  type: constants.LOAD_FAILURE,
  error
})

const scrollTop = (scrollTop) => ({
  type: constants.SCROLL_TOP,
  scrollTop
})

export default { load, loadSuccess, loadFailure, scrollTop }
