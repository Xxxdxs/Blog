<template>
  <!-- <div v-html="this.blog.node ?this.blog.node.bodyHTML: ''"></div> -->
  <div>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h3 class="headline mb-0" style="width: 100%">{{ this.blog.node.title }}</h3>
            <div>{{ this.blog.node.createdAt }}</div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div v-html="this.blog.node? this.blog.node.bodyHTML: ''"></div>
          </v-card-text>
        </v-card>
      </v-flex>
  </v-layout>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
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
