<template>
  <div class="new">
    <v-container>
      <v-layout row wrap class="py-3">
        <v-flex xs12>
          <v-text-field
            v-model="title"
            label="标题"
            required
            autofocus
          ></v-text-field>
          <v-text-field
            v-model="labels"
            style="width: 100%"
            label="标签"
            placeholder="多个标签用逗号隔开"
            required
          ></v-text-field>
        </v-flex>
        <mavon-editor style="min-width: 100%" v-model="body"></mavon-editor>
      </v-layout>
      <v-divider class="mt-2" style="height: 2px"></v-divider>
      <v-layout row wrap justify-end>
        <v-btn class="mx-0 white--text" color="blue accent-4" @click="createBlog" ripple>提交</v-btn>
      </v-layout>
      <v-snackbar
        v-model="snackbar"
        :color="color"
        bottom
        multi-line
      >{{ snackbarMessage }}
        <v-btn flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>
<script>
import * as blogEditApi from '@/api/blogEdit' 

export default {
  data () {
    return {
      title: '',
      labels: '',
      body: '',
      snackbar: false,
      snackbarMessage: '',
      color: ''
    }
  },
  computed: {
    content () {
      return {
        title: this.title,
        labels: this._handleLabels(this.labels),
        body: this.body
      }
    }
  },
  methods: {
    createBlog () {
      blogEditApi.createBlog(this.content).then((res) => {
        if (res.status === 201) {
          this.snackbarMessage = '上传成功'
          this.snackbar = true
          this.color = 'success'
        }
      }).catch((err) => {
        this.snackbarMessage = err.code
        this.snackbar = true
        this.color = 'error'
      }) 
    },
    _handleLabels (labels) {
      return labels.split(',').map((ele) => ele.trim())
    }
  }
}
</script>
