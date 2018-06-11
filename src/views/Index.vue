<template>
  <div class="index">
    <v-app>
      <v-navigation-drawer v-model="drawer" width="200" absolute temporary>
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
          <v-list-tile v-for="item in items" ripple :key="item.title">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="blue accent-4" app>
        <v-toolbar-side-icon v-if="isXSDevice" @click="toggleSiderbar" class="white--text"></v-toolbar-side-icon>
        <v-toolbar-title  class="headline white--text">Halo Halo</v-toolbar-title>
        <v-toolbar-items v-if="!isXSDevice">
          <v-btn v-for="item in items" 
                 :key="item.title"
                 class="white--text"
                 flat 
                 ripple>{{ item.title }}</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text">search</v-icon>
        </v-btn>
        <v-btn icon @click="gotoNewBlogPage">
          <v-icon class="white--text">create</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content>
        <v-container fluid :class="{ 'px-0 mx-0': isXSDevice }">
          <router-view :isXSDevice="isXSDevice"></router-view>
        </v-container>
      </v-content>
      <v-footer class="pa-1">
        <v-spacer></v-spacer>
        <div>&copy; {{ new Date().getFullYear() }}</div>
        <div>v0.0.1</div>
        <v-spacer></v-spacer>
      </v-footer>
  </v-app>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'Archive', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
      drawer: false
    }
  },
  computed: {
    isXSDevice () {
      let ret
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': ret = true; break
        default: ret = false
      }
      return ret
    }
  },
  methods: {
    toggleSiderbar () {
      this.drawer = !this.drawer
    },
    gotoNewBlogPage () {
      this.$router.push({
        name: 'new'
      })
    }
  }
}
</script>

<style scoped>
</style>
