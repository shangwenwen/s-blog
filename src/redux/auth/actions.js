import constants from './constants'
import service from './service'

function login(username, password) {
  const request = () => ({
    type: constants.LOGIN_REQUEST
  })

  const success = (user) => ({
    type: constants.LOGIN_SUCCESS,
    user
  })

  const failure = (error) => ({
    type: constants.LOGIN_FAILURE,
    error
  })

  return async (dispath) => {
    dispath(request())
    const { data } = await service.login(username, password)

    if (data.code === 200) {
      return dispath(success(data.user))
    }

    return dispath(failure(data.error))
  }
}

function logout() {
  const request = () => ({
    type: constants.LOGOUT_REQUEST
  })

  return async (dispath) => {
    dispath(request())
    await service.logout()
  }
}

export default { login, logout }
