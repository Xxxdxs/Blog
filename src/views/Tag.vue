<template>
  <div class="tag">
    <h1>tag</h1>
    <div>
      {{ text }}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      text: ''
    }
  },
  created () {
    this.text = this.$route.params.id
  }
}
</script>
