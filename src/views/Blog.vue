<template>
  <div>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h3 class="headline mb-0" style="width: 100%">{{ blog.node.title }}</h3>
            <div>{{ blog.node.createdAt }}</div>
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
    ...mapMutations({
      setBlog: 'SET_BLOG'
    })
  }
}
</script>
``
