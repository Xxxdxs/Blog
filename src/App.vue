<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Roboto','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 16px;
  background: #f6f6f6;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
a {
  text-decoration: none;
}
code {
  padding: .2em .4em !important;
  background: rgba(27,31,35,.05) !important;
  color: #3f51b5 !important;
  border-radius: 3px !important;
  font-size: 85% !important;
  &::before {
    content: ''!important;
  }
}

pre {
  margin: 0 -16px !important; // card-text的默认padding16px
  display: block !important;
  padding: 10px 0 !important;
  line-height: 1.5em !important;
  overflow: auto !important;
  code {
    display: block !important;
    background: #2b303b !important;
    color: #c0c5ce !important;
    padding: .5em 16px !important;
    white-space: inherit !important;
    font-size: 1em !important;
    overflow-x: auto !important;
  }
}
</style>
