import axios from 'axios'

export const userService = {
  login
}

function checkStatus(response) {
  // NProgress.done()
  if (response.status === 200 || response.status === 304) {
    return response
  }
  return {
    data: {
      code: -404,
      message: response.statusText,
      data: response.statusText
    }
  }
}

function login(username, password) {
  return axios({
    method: 'post',
    url: '/api/frontend/user/login',
    data: {
      username, password
    },
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
    .then(checkStatus)
}
