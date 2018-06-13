<template>
  <div class="tags-cloud">
    <v-badge right overlap 
     color="grey lighten-1"
     class="ma-2"
     v-for="item in tagList"
     :key="item.name">
      <span slot="badge">{{ item.issues.totalCount > 99? 99: item.issues.totalCount }}</span>
      <v-btn round small 
       class="ma-0" 
       :style="`background: #${item.color};text-transform: none;min-width: 4em`"
       :to="`/tag/${item.name}`">
        {{ item.name }}
      </v-btn>
    </v-badge>
  </div>
</template>

<script>
export default {
  props: {
    tagList: Array
  }
}
</script>
