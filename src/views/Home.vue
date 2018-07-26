<template>
  <div class="home">
    <v-layout row wrap>
      <v-flex xs12 sm7 md8>
        <div class="waterfall" :style="`column-count: ${columnCount}; column-gap: 0;`">
          <div style="box-sizing:border-box;padding: 0 8px 8px;
                      page-break-inside:avoid" 
           v-for="item in currentPageBlogs"
           :key="item.node.id">
            <v-card
              style="text-align: left; cursor: default;position: static;"
              >
              <!-- 此处相对定位会导致chrome中出现不能点击bug -->
              <v-card-title primary-title>
                <div class="headline" style="width: 100%;color: #2962FF" @click="goToBlogPage(item)">
                  <span style="cursor: pointer;">{{ item.node.title }}</span>
                </div>
                <div>{{ normalizeDate(item.node.createdAt) }}</div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <div v-html="compileMarkdown(item.node.body)"></div>
              </v-card-text>
              <v-card-text style="color: #2962FF" class="py-0">
                <div @click="goToBlogPage(item)">
                  <span style="cursor: pointer;">阅读全文</span>
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text>
                <v-btn
                 small
                 class="ml-0"
                 v-for="label in item.node.labels.nodes"
                 :key="label.name"
                 :style="`background: #${label.color};`"
                 style="text-transform: none;min-width: 3em;"
                 :to="`/tag/${label.name}`"
                >{{ label.name }}
                </v-btn>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-flex>
      <v-flex sm5 md4 v-if="!isXSDevice">
        <v-layout row wrap>
          <v-flex>
            <v-card>
              <TagsCloud :tagList="tagList"></TagsCloud>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <div class="text-xs-center" style="margin: 0 auto;">
          <v-pagination :length="totalPage" v-model="page"></v-pagination>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import TagsCloud from './TagsCloud'
import blogApi from '@/api/blogQuery'
import tagApi from '@/api/tagQuery'
import { mapMutations } from 'vuex'

const READMORE_FLAG = '<!-- more -->'
const BLOG_COUNT_PER_PAGE = 10

export default {
  props: {
    isXSDevice: Boolean,
    deviceSizeType: String
  },
  data () {
    return {
      blogs: [],
      currentPageBlogs: [],
      tagList: [],
      page: 0,
      totalPage: 0
    }
  },
  computed: {
    columnCount () {
      switch (this.deviceSizeType) {
        case 'xs': return 1
        case 'sm': return 1
        case 'md': return 2
        case 'lg': return 2
        case 'xl': return 2
        default: return 1
      }
    }
  },
  created () {
    this._getLatestBlog()
    this._getTagList()
  },
  watch: {
    page (newValue, oldValue) {
      const startIndex = (newValue - 1) * BLOG_COUNT_PER_PAGE
      this.currentPageBlogs = this.blogs.slice(startIndex, startIndex + BLOG_COUNT_PER_PAGE)
    }
  },
  methods: {
    goToBlogPage (item) {
      this.setBlog(item)
      this.$router.push({
        path: `/blog/${item.node.number}`
      })
    },
    compileMarkdown (markdown) {
      return this.$markdown(this._cutMarkdown(markdown))
    }, 
    normalizeDate (date) {
      return date.slice(0, 10)
    },
    _getLatestBlog () {
      blogApi.getLatestBlogs().then((res) => {
        this.totalPage = Math.floor(res.data.data.repository.issues.totalCount / BLOG_COUNT_PER_PAGE) + 1
        this.page = 1
        this.blogs = res.data.data.repository.issues.edges
        this.setBlogs(this.blogs)
      })
    },
    _getTagList () {
      tagApi.getTagList().then((res) => {
        this.tagList = res.data.data.repository.labels.nodes
      })
    },
    _cutMarkdown (markdown) {
      if (markdown.includes(READMORE_FLAG)) {
        return markdown.split(READMORE_FLAG)[0]
      } else {
        return markdown.substr(0, 200)
      }
    },
    ...mapMutations({
      setBlogs: 'SET_BLOGS',
      setBlog: 'SET_BLOG'
    })
  },
  filters: {
    cutBodyHTML (content) {
    }
  },
  components: {
    TagsCloud
  }
}
</script>
