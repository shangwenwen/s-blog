import { Api } from '../_helpers'

const login = (username, password) => Api.post('/frontend/user/login', { username, password })
const logout = () => Api.post('/frontend/user/logout', {})

export const userService = { login, logout }
