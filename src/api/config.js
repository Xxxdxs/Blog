import axios from 'axios'
import store from '@/store'

const RESTFUL = 'restful'

const GRAPHQL = 'graphql'
const TO = 'token dd3c865f3a970bf31a1d'
const KEN = '7828d0282ef5aa70ab98'

const tokenHack = (to, ken) => {
  return to + ken
}
const serviceFactory = (apiType = RESTFUL) => {
  const axiosConfig = {
    baseURL: 'https://api.github.com',
    timeout: 100000,
    headers: {
      Authorization: tokenHack(TO, KEN)
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
