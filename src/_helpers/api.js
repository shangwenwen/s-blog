import axios from 'axios'

const checkStatus = (response) => {
  if(response.status === 200 || response.status === 304) {
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
      data: data,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(checkStatus),
  get: (url, parms) => axios({
      method: 'get',
      url: url,
      parms: parms,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(checkStatus)
}
