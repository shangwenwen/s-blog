import constants from './constants'

// actions creates
const login = () => ({
  type: constants.LOGIN
})

const loginSuccess = (user) => ({
  type: constants.LOGIN_SUCCESS,
  user
})

const loginFailure = (error) => ({
  type: constants.LOGIN_FAILURE,
  error
})

const logout = () => ({
  type: constants.LOGOUT
})

export default { login, loginSuccess, loginFailure, logout }
