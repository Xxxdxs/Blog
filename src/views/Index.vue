<template>
  <div class="index">
    <v-app>
      <v-navigation-drawer v-model="drawer" width="200" fixed temporary>
        <v-toolbar color="blue accent-4">
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="headline white--text">
                Second Life
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list dense class="pt-0">
          <v-list-tile v-for="item in navs" ripple :key="item.title" :to="'/' + item.title">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title style="text-transform: uppercase">{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
        <v-toolbar app color="blue accent-4" >
          <v-toolbar color="transparent" flat style="max-width: 1200px;margin: 0 auto;">
            <v-toolbar-side-icon v-if="isXSDevice" @click="toggleSiderbar" class="white--text"></v-toolbar-side-icon>
            <v-toolbar-title  class="headline white--text">Halo Halo</v-toolbar-title>
              <v-toolbar-items v-if="!isXSDevice">
                <v-btn flat ripple exact
                  v-for="item in navs"
                  :key="item.title"
                  :to="'/' + item.title"
                  class="white--text">{{ item.title }}</v-btn>
              </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon class="white--text">search</v-icon>
            </v-btn>
            <!-- <v-btn icon @click="gotoNewBlogPage">
              <v-icon class="white--text">create</v-icon>
            </v-btn> -->
          </v-toolbar>
        </v-toolbar>
      <v-content>
        <v-container fluid :class="{ 'px-0 mx-0': isXSDevice }" style="max-width: 1200px; position: relative;">
          <keep-alive>
            <router-view 
            :deviceSizeType="deviceSizeType"
            :isXSDevice="isXSDevice"></router-view>
          </keep-alive>
          <v-fab-transition>
            <v-btn style="background: #2962FF;bottom: 80px;" v-show="scrolled" fab small fixed right @click="scrollToTop">
              <v-icon color="white">keyboard_arrow_up</v-icon>
            </v-btn>
          </v-fab-transition>          
        </v-container>
      </v-content>
      <v-footer class="indigo lighten-1 white--text text-xs-center" height="100">
        <!-- <div>&copy; {{ new Date().getFullYear() }}</div> -->
        <v-layout row wrap justify-center>
          <v-flex xs12>
            <div>GithubBlog@0.0.1</div>
          </v-flex>
          <v-flex xs12>
            <div class="social">
              <a href="https://github.com/Xxxdxs">
                <span class="icon-github iconfont"></span>
              </a>
              <a href="https://weibo.com/u/1688253490">
                <span class="icon-weibo iconfont"></span>
              </a>
              <a href="https://twitter.com/Xxxdxsss">
                <span class="icon-twitter iconfont"></span>
              </a>
            </div>
          </v-flex>
          <v-flex xs12>
            <div>Xxxdxs&copy; {{ new Date().getFullYear() }}</div>
          </v-flex>
        </v-layout>
      </v-footer>
  </v-app>
  </div>
</template>

<script>
let timer = null
export default {
  data () {
    return {
      navs: [
        { title: 'home', icon: 'dashboard' },
        { title: 'archive', icon: 'dashboard' },
        { title: 'about', icon: 'question_answer' }
      ],
      drawer: false,
      scrolled: false
    }
  },
  computed: {
    isXSDevice () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        default: return false
      }
    },
    deviceSizeType () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'xs'
        case 'sm': return 'sm'
        case 'md': return 'md'
        case 'lg': return 'lg'
        case 'xl': return 'xl'
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    toggleSiderbar () {
      this.drawer = !this.drawer
    },
    gotoNewBlogPage () {
      this.$router.push({
        name: 'new'
      })
    },
    handleScroll () {
      this.scrolled = window.scrollY > 0
    },
    scrollToTop () {
      clearInterval(timer)
      timer = setInterval(function () {
        let offsetTop = document.documentElement.scrollTop || document.scrollingElement.scrollTop
        let speed = offsetTop > 3 ? Math.floor(offsetTop / 3) : 3
        document.documentElement.scrollTop = document.scrollingElement.scrollTop = offsetTop - speed
        console.log(offsetTop)
        if (offsetTop <= 0) {
          clearInterval(timer)
        }    
      }, 30)
    }
  }
}
</script>

<style scoped>
.social a {
  margin: 0 4px;
}
.iconfont {
  color: #fff;
  font-size: 2em;
}
</style>
