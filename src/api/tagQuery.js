import { serviceFactory, GRAPHQL } from './config2'

const request = serviceFactory(GRAPHQL)

const tagApi = {
  getTagList () {
    return request({
      method: 'post',
      data: {
        query: `
          query {
            repository(owner: "Xxxdxs", name: "Xxxdxs.github.io") {
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
