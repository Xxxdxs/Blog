<template>
  <div class="tag">
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
      timeline: [],
      tag: ''
    }
  },
  created () {
    this.blogs = []
    this.i = 0
    this._getBlogsByTagOrderByTime(this.$route.params.id)
  },
  watch: {
    $route: 'pathWatch',
    tag: function (newValue) {
      this.timeline = []
      this._getBlogsByTagOrderByTime(newValue)
    }
  },
  methods: {
    pathWatch (to, from) {
      if (to.path.indexOf('/tag') === 0) {
        this.tag = to.params.id
      }
    },
    _getBlogsByTagOrderByTime (tag) {
      if (!tag) {
        return
      }
      blogApi.getBlogsByTagOrderByTime(tag).then(res => {
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
