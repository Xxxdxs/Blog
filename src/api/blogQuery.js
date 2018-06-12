import { serviceFactory, GRAPHQL } from './config'

const request = serviceFactory(GRAPHQL)

const blogApi = {
  getLatestBlogs (lastID = null) {
    return request({
      method: 'post',
      data: {
        query: `
          query {
            repository(owner: "Xxxdxs", name: "Xxxdxs.github.io") {
              issues(orderBy: {field: CREATED_AT, direction: DESC},
                first: 10, states: OPEN, after: ${lastID}) {
                  edges {
                    node {
                      id
                      title
                      createdAt
                      bodyHTML
                      number
                      body
                    }
                  }
                }
                labels(first: 100) {
                  nodes {
                    name
                  }
                }
              }
            }
          `
      }
    })
  },
  getLabels () {
    return request({
      method: 'post',
      data: {
        query: `
            query {
              repository(owner: "Xxxdxs", name: "Xxxdxs.github.io") {
                labels(first: 100) {
                  nodes {
                    name
                  }
                }
              }
            }
          `
      }
    })
  },
  getBlogsByLabel (label, lastID = null) {
    return request({
      method: 'post',
      data: {
        query: `
          query {
            repository(owner: "Xxxdxs", name: "Xxxdxs.github.io") {
              issues(first: 10, labels: ${label}, after: ${lastID}) {
                edges {
                  node {
                    id
                    title
                    createdAt
                    bodyHTML
                    number
                    body
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

export default blogApi
