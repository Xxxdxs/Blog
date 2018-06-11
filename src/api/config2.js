import axios from 'axios'
import store from '@/store'

const RESTFUL = 'restful'

const GRAPHQL = 'graphql'

const serviceFactory = (apiType = RESTFUL) => {
  const axiosConfig = {
    baseURL: 'https://api.github.com',
    timeout: 10000,
    headers: {
      Authorization: 'token 4779af1172beb87433228b61c6ac0885400abd28'
    }
  }
  if (apiType === GRAPHQL) {
    axiosConfig.baseURL = 'https://api.github.com/graphql'
  }

  const service = axios.create(axiosConfig)

  service.interceptors.request.use(
    (config) => {
      const token = store.state.token
      if (token) {
        config.headers.Authorization = token
      }
      return config
    },
    (err) => {
      return Promise.reject(err)
    }
  )

  return service
}

export {
  GRAPHQL, RESTFUL, serviceFactory
}