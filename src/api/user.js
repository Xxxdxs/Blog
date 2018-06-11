import { serviceFactory } from './config2'

const request = serviceFactory()

const userApi = {
  verifyToken (token) {
    return request({
      url: '/user'
    })
  }
}

export default userApi
