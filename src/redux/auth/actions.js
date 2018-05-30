import { authService } from './service'
import { authConstants } from './constants'
// import cookies from 'js-cookie'

function login(username, password) {
  // action creates
  const request = () => ({
    type: authConstants.AUTH_LOGIN_REQUEST
  })

  const success = (user) => ({
    type: authConstants.AUTH_LOGIN_SUCCESS,
    user
  })

  const failure = (error) => ({
    type: authConstants.AUTH_LOGIN_FAILURE,
    error
  })

  return async dispatch => {
    try {
      dispatch(request())

      await authService.login(username, password)
        .then(
          res => {
            if (res.data.code === -200 && res.data.data === '') {
              return dispatch(failure(res.data.message))
            }

            return dispatch(success(res.data.data))
          }
        )
        .catch(
          error => {
            return dispatch(failure(error))
          }
        )
    } catch (error) {
      dispatch(failure(error))
    }
  }
}

function logout() {
  const logout = () => ({
    type: authConstants.AUTH_LOGOUT
  })

  return async (dispatch) => {
    try {
      await authService.logout()
        .then(() => {
          dispatch(logout())
        })
    } catch (error) {
      console.log('登出错误')
    }
  }
}

export const authActions = { login, logout }
