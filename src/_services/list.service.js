import { Api } from '../_helpers'

const getList = (params) => {
  return Api.get('/frontend/article/list', params)
}

export const listService = { getList }
