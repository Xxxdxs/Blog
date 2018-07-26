<template>
  <div class="timeline">
    <div class="tl-item" v-for="item in timeline" :key="item.date">
      <div class="tl-item-date-container">
        <v-icon>schedule</v-icon>
        <span class="tl-item-date">{{ item.date }}</span>
      </div>
      <div class="tl-item-content-container">
        <div class="tl-item-content">
          <v-layout row wrap>
            <v-flex v-for="blog in item.list" :key="blog.id" xs12 sm6>
              <v-card>
                <v-card-text>{{ blog.title }}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    timeline: Array
  }
}
</script>

<style>
.tl-item-date {
  margin-left: 4px;
  height: 24px;
  line-height: 1;
  vertical-align: middle;
}
.tl-item-content-container {
  position: relative;
}
.tl-item-content::before {
  display: block;
  content: '';
  position: absolute;
  left: 10px;
  top: 0;
  height: 100%;
  border-left: 2px dashed rgba(0,0,0,.54);
}
.tl-item-content-container {
  padding: 20px;
  padding-right: 0;
}
</style>
