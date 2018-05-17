import { userService } from '../_services'
import { userConstants } from '../_constants'
import Cookies from 'js-cookie'

export const userActions = {
  login,
  logout
}

// login

function login(username, password) {
  return async(dispatch) => {
    try {
      dispatch(request({username}))
      await userService.login(username, password)
        .then((res) => {
          // console.log(res.data)
          // dispatch(success(res.data))
          console.log(Cookies.get())
          if (res.data.code === 200) {
            // dispatch(success(res.data.data))
          }
        }).catch((error) => {

        })
    } catch(e) {

    } finally {

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
  return async(dispatch) => {
    try {
      await userService.logout()
        .then(() => {
          dispatch(logout())
          console.log('登出成功')
        })
    } catch(error) {
      console.log('登出失败')
    }
  }

  function logout() {
    return {
      type: userConstants.LOGOUT
    }
  }
}
