import { userService } from '../_services'
import { userConstants } from '../_constants'

export const userActions = {
  login,
  logout
}

// login
function login(username, password) {
  return async (dispatch) => {
    try {
      dispatch(request(username))

      await userService.login(username, password)
        .then(
          user => {
            dispatch(success(user))
          }
        )
        .catch((error) => {
          dispatch(failure(error))
        })
    } catch (error) {
      console.log('error:', error)
    } finally {
      console.log('finally')
    }
  }

  function request(user) {
    return {
      type: userConstants.LOGIN_REQUEST,
      user
    }
  }

  function success(user) {
    return {
      type: userConstants.LOGIN_SUCCESS,
      user
    }
  }

  function failure(error) {
    return {
      type: userConstants.LOGIN_FAILURE,
      error
    }
  }
}

// logout
function logout() {
  return async (dispatch) => {
    try {
      await userService.logout()
        .then(() => {
          dispatch(logout())
          console.log('登出成功')
        })
    } catch (error) {
      console.log('登出失败')
    }
  }

  function logout() {
    return {
      type: userConstants.LOGOUT
    }
  }
}
