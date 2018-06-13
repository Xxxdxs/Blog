import { serviceFactory, GRAPHQL } from './config'

const request = serviceFactory(GRAPHQL)

const blogApi = {
  getLatestBlogs (endCursor = null) {
    return request({
      method: 'post',
      data: {
        query: `
          query {
            repository(owner: "Xxxdxs", name: "Xxxdxs.github.io") {
              issues(orderBy: {field: CREATED_AT, direction: DESC},
                first: 100, states: OPEN, after: ${endCursor}) {
                  totalCount
                  edges {
                    cursor
                    node {
                      id
                      title
                      createdAt
                      updatedAt
                      number
                      body
                      labels(first: 100) {
                        nodes {
                          name
                          color
                        }
                      }
                    }
                  }
                  pageInfo {
                    endCursor
                  }
                }
              }
            }
          `
      }
    })
  },
  getBlogsByLabel (label) {
    return request({
      method: 'post',
      data: {
        query: `
          query {
            repository(owner: "Xxxdxs", name: "Xxxdxs.github.io") {
              label(name: ${label}) {
                issues(first: 100, states: OPEN) {
                  nodes {
                    title
                    number
                    createdAt
                  }
                }
              }
            }
          }
         `
      }
    })
  },
  getBlogByNumber () {
    return request({
      method: 'post',
      data: {
      }
    })
  }
}

export default blogApi
