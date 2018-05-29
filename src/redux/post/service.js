import { Api } from '../../helpers'

const getPost = (id) => {
  return Api.get('/frontend/article/item', { id })
}

export const postService = { getPost }
