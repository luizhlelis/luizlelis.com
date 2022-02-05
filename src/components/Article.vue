<template>
  <div>
    <markdown-it-vue style="margin-top: 150px; margin-left: 100px; margin-right: 100px;" class="md-body" :content="content" />
  </div>
</template>

<script>
  import MarkdownItVue from 'markdown-it-vue'
  import ArticleMd from "../../public/typesense.js"

  import 'markdown-it-vue/dist/markdown-it-vue.css'
  export default {
    name: 'Article',
    components: {
      MarkdownItVue
    },
    data () {
      return {
        content: ArticleMd
        //content: '# Hello World'
      }
    }
  }
</script>