<template>
  <div>
    <h1>Archive页面</h1>
    <div v-html="compiledMarkdown"></div>
    <pre><code>hello world<br/>hello world</code></pre>
  </div>
</template>
<script>
export default {
  data () {
    return {
      test: '## hello world\r\n ```helo world\r\nhello\r\nhello```'
    }
  },
  computed: {
    compiledMarkdown () {
      return this.$markdown(this.test)
    }
  }
}
</script>
