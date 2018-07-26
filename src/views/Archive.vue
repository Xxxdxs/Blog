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
      timeline: [
        {
          date: '2018-07',
          list: [
            {
              id: '001',
              title: '第一篇文章'
            },
            {
              id: '002',
              title: '第二篇文章'
            },
            {
              id: '005',
              title: '第三篇文章'
            },
            {
              id: '007',
              title: '第四篇文章'
            }
          ]
        },
        {
          date: '2018-06',
          list: [
            {
              id: '003',
              title: '第三篇文章'
            },
            {
              id: '004',
              title: '第四篇文章'
            }
          ]
        }
      ]
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
