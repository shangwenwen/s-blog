import helpers from '../../helpers'

const login = (username, password) => {
  return helpers.api.post('/frontend/user/login', { username, password })
}

const logout = () => {
  return helpers.api.post('/frontend/user/logout', {})
}

export const authService = { login, logout }
