import { serviceFactory, GRAPHQL, OWNER, REPO_NAME } from './config'

const request = serviceFactory(GRAPHQL)

const tagApi = {
  getTagList () {
    return request({
      method: 'post',
      data: {
        query: `
          query {
            repository(owner: "${OWNER}", name: "${REPO_NAME}") {
              labels(first: 100) {
                nodes {
                  name
                  color
                  issues(first: 100, states: OPEN) {
                    totalCount
                  }
                }
              }
            }
          }
        `
      }
    })
  }
}

export default tagApi
