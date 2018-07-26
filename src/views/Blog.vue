<template>
  <div>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-title class="text-xs-center">
              <h3 class="display-1 mb-0" style="flex-basis: 100%;">{{ blog.node.title }}</h3>
              <div class="caption" style="flex-basis: 100%;display: flex;justify-content:center;">
                <div class="px-2">创建日期:{{ normalizeDate(blog.node.createdAt) }}</div>
                <div class="px-2">最近修改:{{ normalizeDate(blog.node.updatedAt) }}</div>
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

export default {
  data () {
    return {}
  },
  computed: {
    compiledMarkdown () {
      return this.$markdown(this.blog.node.body)
    },
    ...mapState([
      'blog', 'blogs'
    ])
  },
  created () {
    if (!this.blog.node) {
      this.$router.push('/')
    }
  },
  methods: {
    normalizeDate (date) {
      return date.slice(0, 10)
    },
    ...mapMutations({
      setBlog: 'SET_BLOG'
    })
  }
}
</script>
``
