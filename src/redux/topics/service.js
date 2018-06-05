import helpers from '../../helpers'

const getTopics = (params) => {
  return helpers.api.get('/frontend/article/list', params)
}

export const TopicsService = { getTopics }
