import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from '@/api/cookie'
import UserApi from '@/api/user'

Vue.use(Vuex)

const TOKEN_KEY = 'TOKEN_KEY'
export default new Vuex.Store({
  state: {
    token: Cookie.getAttribute(TOKEN_KEY),
    user: {},
    labels: [],
    blogs: [],
    blog: {}
  },
  mutations: {
    SET_TOKEN: (state, value) => {
      state.token = value
      Cookie.setAttribute(TOKEN_KEY, value, 30)
    },
    REMOVE_TOKEN: (state) => {
      state.token = null
      Cookie.remove(TOKEN_KEY)
    },
    SET_LABELS: (state, value) => {
      state.labels = value
    },
    SET_BLOGS: (state, value) => {
      state.blogs = value
    },
    SET_BLOG: (state, value) => {
      console.log(value)
      state.blog = value
    }
  },
  actions: {
    verifyToken ({ commit }, accessToken) {
      UserApi.verifyToken(accessToken).then((response) => {
        commit('SET_TOKEN', accessToken)
        Vue.prototype.$notify({
          title: '成功',
          message: 'Token绑定成功',
          type: 'success'
        })
      }).catch((err) => {
        alert(err)
      })
    },
    removeToken ({ commit }) {
      commit('REMOVE_TOKEN')
      Vue.prototype.$message({
        message: 'Token取消绑定',
        type: 'info'
      })
    }
  }
})
