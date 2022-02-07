<template>
  <div>
    <v-img
      class="article-img"
      :lazy-src="imgRef"
      :src="imgRef">
    </v-img>
    <markdown-it-vue class="markdown-it md-body" :content="content" />
  </div>
</template>

<script>
  import MarkdownItVue from 'markdown-it-vue'
  import ArticleMd from "../../public/articles.js"

  import 'markdown-it-vue/dist/markdown-it-vue.css'
  export default {
    name: 'Article',
    components: {
      MarkdownItVue
    },
    props: {
      articleId: {
        type: String,
        required: true
      },
      imgRef: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        content: ArticleMd[this.articleId]
      }
    },
    created() {
      this.$vuetify.theme.isDark = true;
    }
  }
</script>

<style>

  .markdown-body .highlight pre, .markdown-body pre {
    background-color: #1E1E1E;
  }

  .markdown-body li {
    color: white;
  }

  .markdown-body a {
    color: #0366d6 !important;
    text-decoration: none;
  }

  .theme--dark.v-application code {
    background-color: transparent;
    color: lightgray;
  }

  @media (min-width: 600px)
  {
    .article-img {
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      margin-top: 150px;
      margin-left: 100px;
      margin-right: 100px;
    }

    .markdown-it {
      margin-top: 50px;
      margin-left: 100px;
      margin-right: 100px;
      margin-bottom: 50px;
    }

    .markdown-body h1 {
      color: white;
      font-size: 3rem;
    }

    .markdown-body h2 {
      color: white;
      font-size: 1.5rem;
    }
    
    .markdown-body p, .markdown-body h3 {
      color: white;
      font-size: 1.25rem;
    }
  }

  @media (max-width: 600px)
  {
    .article-img {
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      margin-top: 100px;
      margin-left: 12px;
      margin-right: 12px;
    }

    .markdown-it {
      margin-top: 20px;
      margin-left: 12px;
      margin-right: 12px;
      margin-bottom: 50px;
    }

    .markdown-body h1 {
      color: white;
      font-size: 1.875rem;
    }

    .markdown-body h2 {
      color: white;
      font-size: 1.25rem;
    }
    
    .markdown-body p, .markdown-body h3 {
      color: white;
      font-size: 1.125rem;
    }
  }
</style>