<template>
  <div>
    <v-img
      class="article-img"
      :lazy-src="imgRef"
      :src="imgRef">
    </v-img>
    <markdown-it-vue class="markdown-it md-body" :content="content" />
    <github-comment />
  </div>
</template>

<script>
  import MarkdownItVue from 'markdown-it-vue'
  import ArticleMd from "../../public/articles.js"
  import GithubComment from "./GithubComment.vue"

  import 'markdown-it-vue/dist/markdown-it-vue.css'
  export default {
    name: 'Article',
    components: {
      MarkdownItVue,
      GithubComment
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
    background-color: #3c4a5d;
  }

  .markdown-body li {
    color: rgb(128, 128, 128);
  }

  .markdown-body a {
    color: rgb(88, 166, 255) !important;
    text-decoration: none;
  }

  .theme--dark.v-application code {
    background-color: #3c4a5d;
    color: lightgray;
  }

  .theme--light.v-application code {
    background-color: #3c4a5d;
    color: lightgray;
  }

  .hljs-doctag, .hljs-formula, .hljs-keyword {
    color: #ff7b72;
  }

  .hljs-addition, .hljs-attribute, .hljs-meta-string, .hljs-regexp, .hljs-string {
    color: #a5d6ff;
  }

  .hljs-bullet, .hljs-link, .hljs-meta, .hljs-selector-id, .hljs-symbol, .hljs-title {
    color: #d2a8ff;
  }

  .hljs-attr, .hljs-number, .hljs-selector-attr, .hljs-selector-class, .hljs-selector-pseudo, .hljs-template-variable, .hljs-type, .hljs-variable {
    color: #7ee787;
  }

  .hljs-built_in, .hljs-class .hljs-title {
    color: #d2a8ff;
}

  @media (min-width: 600px)
  {
    .article-img {
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      margin-top: 150px;
      margin-left: 100px;
      margin-right: 100px;
      margin-left: 184px;
      margin-right: 184px;
    }

    .markdown-it {
      margin-top: 50px;
      margin-left: 184px;
      margin-right: 184px;
      margin-bottom: 50px;
    }

    .markdown-body h1 {
      color: rgb(128, 128, 128);
      font-size: 3rem;
    }

    .markdown-body h2 {
      color: rgb(128, 128, 128);
      font-size: 1.5rem;
    }
    
    .markdown-body p, .markdown-body h3 {
      color: rgb(128, 128, 128);
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
      color: rgb(128, 128, 128);
      font-size: 1.875rem;
    }

    .markdown-body h2 {
      color: rgb(128, 128, 128);
      font-size: 1.25rem;
    }
    
    .markdown-body p, .markdown-body h3 {
      color: rgb(128, 128, 128);
      font-size: 1.125rem;
    }
  }
</style>