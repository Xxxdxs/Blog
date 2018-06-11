<template>
  <v-layout row wrap>
    <v-flex xs12 sm8 md9 xl10>
      <v-layout row wrap>
        <v-flex xs12 sm12 md6 lg4 xl3 v-for="item in blogs" :key="item.node.id" :class="[isXSDevice? 'px-0': 'px-2', 'mb-2']">
          <v-card hover style="text-align: left">
            <v-card-title primary-title>
              <div class="headline" style="width: 100%;">{{ item.node.title }}</div>
              <div>{{ item.node.createdAt }}</div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <div v-html="item.node.bodyHTML" style="width: 100%;"></div>
            </v-card-text>
            <v-card-text class="primary--text">
              <div @click="readMore(item)">Read More</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex sm4 md3 xl2 v-if="!isXSDevice">
      <v-layout row wrap>
        <v-flex class="pa-2">
          <v-card>
            <v-card-title>
              tag-cloud
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>页脚</v-flex>
  </v-layout>
</template>

<script>
import blogApi from '@/api/blogQuery'
import { mapMutations } from 'vuex'
export default {
  props: {
    isXSDevice: Boolean
  },
  data () {
    return {
      blogs: []
    }
  },
  created () {
    if (this.$store.state.blogs.length) {
      this.blogs = this.$store.state.blogs
    } else {
      blogApi.getLatestBlogs().then((res) => {
        this.blogs = res.data.data.repository.issues.edges
        this.setBlogs(this.blogs)
      })
    }
  },
  methods: {
    readMore (item) {
      this.setBlog(item)
      this.$router.push({
        path: `/blog/${item.node.number}`
      })
    },
    ...mapMutations({
      setBlogs: 'SET_BLOGS',
      setBlog: 'SET_BLOG'
    })
  }
}
</script>
