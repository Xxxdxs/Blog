import { serviceFactory } from './config'

const request = serviceFactory()

// const token = '4779af1172beb87433228b61c6ac0885400abd28'

export const createBlog = (content) => {
  return request({
    url: '/repos/Xxxdxs/Xxxdxs.github.io/issues',
    method: 'post',
    data: {
      ...content
    }
  })
}

export const testToken = () => {
  return request({
    url: '/user'
  })
}
