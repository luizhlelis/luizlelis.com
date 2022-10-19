<template>
  <div ref="vueUtterances">
    <!-- utterances script here -->
  </div>
</template>

<script>
export default {
    mounted() {
        let utterances = document.createElement("script");
        utterances.async = true;
        utterances.setAttribute("src", "https://utteranc.es/client.js");
        utterances.setAttribute("repo", "luizhlelis/luizlelis.com");
        utterances.setAttribute("issue-term", "pathname");
        utterances.setAttribute("label", "comment");
        utterances.setAttribute("theme", "preferred-color-scheme");
        utterances.setAttribute("crossorigin", "anonymous");
        this.$refs.vueUtterances.appendChild(utterances);
    },
  watch: {
    theme: function(newTheme, oldTheme) {
      console.log(newTheme);
      console.log(oldTheme);
      this.$refs.vueUtterances.querySelector("iframe").contentWindow.postMessage(
        {
          type: "set-theme",
          theme: newTheme, // theme you want
        },
        "https://utteranc.es"
      );
    },
  }
}
</script>
