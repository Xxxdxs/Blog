<template>
  <div>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-title class="text-xs-center">
            <h3 class="display-1 mb-0" style="flex-basis: 100%;">{{blog.title }}</h3>
            <div class="caption" style="flex-basis: 100%;display: flex;justify-content:center;">
              <div class="px-2">创建日期:{{ blog.id && normalizeDate(blog.createdAt) }}</div>
              <div class="px-2">最近修改:{{ blog.id && normalizeDate(blog.updatedAt) }}</div>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div v-html="compiledMarkdown"></div>
          </v-card-text>
        </v-card>
      </v-flex>
  </v-layout>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import blogApi from '../api/blogQuery'

export default {
  data () {
    return {
      number: -1
    }
  },
  computed: {
    compiledMarkdown () {
      if (!this.blog.body) {
        return
      }
      return this.$markdown(this.blog.body)
    },
    ...mapState([
      'blog', 'blogs'
    ])
  },
  created () {
    // if (!this.blog.number) {
    //   this.$router.push('/')
    // }
    this._getBlogByNumber(this.$route.params.id)
  },
  watch: {
    $route: 'pathWatch',
    number: function (newValue) {
      this.setBlog({})
      this._getBlogByNumber(newValue)
    }
  },
  methods: {
    normalizeDate (date) {
      if (!date) {
        return
      }
      return date.slice(0, 10)
    },
    pathWatch (to, from) {
      if (to.path.indexOf('/blog') === 0) {
        this.number = to.params.id
      }
    },
    _getBlogByNumber (number) {
      blogApi.getBlogByNumber(number).then(res => {
        if (res.data.errors) {
          this.$router.push('/')
          return
        }
        this.setBlog(res.data.data.repository.issue)
      })     
    },
    ...mapMutations({
      setBlog: 'SET_BLOG'
    })
  }
}
</script>
