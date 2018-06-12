import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    labels: [],
    blogs: [],
    blog: {}
  },
  mutations: {
    SET_LABELS: (state, value) => {
      state.labels = value
    },
    SET_BLOGS: (state, value) => {
      state.blogs = value
    },
    SET_BLOG: (state, value) => {
      state.blog = value
    }
  },
  actions: {}
})
