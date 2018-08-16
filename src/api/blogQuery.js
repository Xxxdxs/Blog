import { serviceFactory, GRAPHQL, OWNER, REPO_NAME } from './config'

const request = serviceFactory(GRAPHQL)

const blogApi = {
  getLatestBlogs (endCursor = null) {
    return request({
      method: 'post',
      data: {
        query: `
          query {
            repository(owner: "${OWNER}", name: "${REPO_NAME}") {
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
            repository(owner: "${OWNER}", name: "${REPO_NAME}") {
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
  getBlogByNumber (number) {
    return request({
      method: 'post',
      data: {
        query: `
          query {
            repository(owner: "${OWNER}", name: "${REPO_NAME}") {
              issue(number: ${number}) {
                    id
                    title
                    createdAt
                    number
                    body
                    updatedAt
                }
              }
            }          
        `
      }
    })
  },
  getBlogsOrderByTime () {
    return request({
      method: 'post',
      data: {
        query: `
          query {
            repository(owner: "${OWNER}", name: "${REPO_NAME}") {
              issues(orderBy: {field: CREATED_AT, direction: DESC},
                first: 100, states: OPEN) {
                  nodes {
                    id
                    title
                    createdAt
                    number
                  }
                }
              }
            }
         `
      }
    })
  },
  getBlogsByTagOrderByTime (tag) {
    return request({
      method: 'post',
      data: {
        query: `
          query {
            repository(owner: "${OWNER}", name: "${REPO_NAME}") {
              issues(orderBy: {field: CREATED_AT, direction: DESC},labels: "${tag}",first: 100, states: OPEN) {
                  nodes {
                    id
                    title
                    createdAt
                    number
                  }
                }
              }
            }
         `
      }
    })
  }
}

export default blogApi
