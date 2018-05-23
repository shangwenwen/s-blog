import { Api } from '../../helpers'

const getTopics = (params) => {
  return Api.get('/frontend/article/list', params)
}

export const TopicsService = { getTopics }
