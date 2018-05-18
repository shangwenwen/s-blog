import axios from 'axios'

export default {
  POST: (url, data) => axios({
    method: 'POST',
    url: url,
    data: data
  })
}
