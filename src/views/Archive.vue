<template>
  <div class="archive">
    <Timeline :timeline="timeline"></Timeline>
  </div>
</template>
<script>
import Timeline from './Timeline'
import blogApi from '../api/blogQuery'
import { groupBlogs } from '../common/js/tool' 
export default {
  data () {
    return {
      timeline: []
    }
  },
  computed: {
    compiledMarkdown () {
      return this.$markdown(this.test)
    }
  },
  created () {
    this.blogs = []
    this._getBlogsOrderByTime()
  },
  methods: {
    _getBlogsOrderByTime () {
      blogApi.getBlogsOrderByTime().then(res => {
        this.blogs = res.data.data.repository.issues.nodes
        this.timeline = this._groupBlogs(this.blogs)
      })
    },
    _groupBlogs (blogs) {
      return groupBlogs(blogs)
    }
  },
  components: {
    Timeline
  }
}
</script>
