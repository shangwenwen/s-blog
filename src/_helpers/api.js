import axios from 'axios'

const apiConfig = {
  baseURL: '/api',
  timeout: 3000
}

const checkStatus = (response) => {
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

export const Api = {
  post: (url, data) => axios({
    method: 'post',
    url: url,
    baseURL: apiConfig.baseURL,
    data: data,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    timeout: apiConfig.timeout
  })
    .then(checkStatus),
  get: (url, params) => axios({
    method: 'get',
    url: url,
    baseURL: apiConfig.baseURL,
    params: params,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    timeout: apiConfig.timeout
  })
    .then(checkStatus)
}
