import helpers from '../../helpers'

const fetchTopics = (params) => {
  return helpers.api.get('/frontend/article/list', params)
}

export default { fetchTopics }
