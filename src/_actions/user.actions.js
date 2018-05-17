import {
  userService
}
from '../_services'
import {
  userConstants
}
from '../_constants'
import Cookies from 'js-cookie'

export const userActions = {
  login,
  logout
}

// login

function login(username, password) {
  const success = (result) => {
        dispatch({
            type: 'CREATE_POST_SUCCESS',
            payload: result
        })
        return result
    }

  return async(dispatch) => {
    try {
      dispatch(request())
      const res = await userService.login(username, password)
      return dispatch(success(res.data.data))
    } catch (e) {
      console.log(e)
    } finally {
      console.log('ss')
    }

  }

  function request() {
    return {
      type: userConstants.LOGIN_REQUEST
    }
  }

  function success(token) {
    return {
      type: userConstants.LOGIN_SUCCESS,
      token
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
