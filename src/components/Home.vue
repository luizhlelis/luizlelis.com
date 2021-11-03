<template>
  <section id="hero">
    <!-- Photo by <a href="https://unsplash.com/@markusspiske?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Markus Spiske</a> on <a href="https://unsplash.com/s/photos/rainbow?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> -->
    <v-parallax dark src="@/assets/bgHero.jpg" height="750">
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="center">
            <v-col cols="12" md="6" xl="8">
              <h1 :class="fontSizeH1">Luiz Lelis</h1>
              <h2 :class="fontSizeH2">Software Engineer</h2>
              <body :class="fontSizeBody">
                Currently working with back-end development
                and infrastructure. Main technologies and languages:
                C#, Python, Go, JavaScript, AWS, Azure Cloud and
                Azure Devops.
              </body>
              <v-btn
                rounded
                outlined
                large
                dark
                @click="$vuetify.goTo('#features')"
                class="mt-5"
              >
                <body :class="fontSizeBody">
                  About me
                </body>
                <v-icon class="ml-2">mdi-arrow-down</v-icon>
              </v-btn>
              <div class="video d-flex align-center py-4">
                <a @click.stop="dialog = true" class="playBut">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                    x="0px"
                    y="0px"
                    width="60px"
                    height="60px"
                    viewBox="0 0 213.7 213.7"
                    enable-background="new 0 0 213.7 213.7"
                    xml:space="preserve"
                  >
                    <polygon
                      class="triangle"
                      id="XMLID_18_"
                      fill="none"
                      stroke-width="7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      points="73.5,62.5 148.5,105.8 73.5,149.1 "
                    />

                    <circle
                      class="circle"
                      id="XMLID_17_"
                      fill="none"
                      stroke-width="7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      cx="106.8"
                      cy="106.8"
                      r="103.3"
                    />
                  </svg>
                </a>
                <p class="subheading ml-2 mb-0" :class="fontSizeBody">
                  Tech Talk (PT-BR)
                </p>
              </div>
            </v-col>
            <v-col cols="12" md="6" xl="4" class="hidden-sm-and-down"> </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="svg-border-waves text-white">
        <v-img src="@/assets/borderWaves.svg" />
      </div>
    </v-parallax>
    <v-container fluid id="features" class="mt-2">
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="space-around">
            <!-- <v-col cols="12" class="text-center">
              <h1 class="font-weight-light display-2">Title</h1>
              <h1 class="font-weight-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h1>
            </v-col> -->
            <v-col
              cols="12"
              sm="4"
              class="text-center"
              v-for="(feature, i) in features"
              :key="i"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="card"
                  shaped
                  :link="true"
                  :href="feature.link"
                  target="_blank"
                  :elevation="hover ? 10 : 4"
                  :class="{ up: hover }"
                  style="vertical-align: middle; display: table-cell; height: 250px;"
                >
                  <v-img
                    :src="feature.img"
                    max-width="100px"
                    class="d-block ml-auto mr-auto"
                    :class="{ 'zoom-efect': hover }"
                  ></v-img>
                  <h1 :class="fontSizeH2" class="font-weight-regular">{{ feature.title }}</h1>
                  <h4 :class="fontSizeBody" class="font-weight-regular">{{ feature.text }}</h4>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" max-width="640px">
      <v-card>
        <youtube
          :video-id="videoId"
          :host="'https://youtube.com'"
          :player-height="heightPlayerSize"
          :player-width="widthPlayerSize"
        ></youtube>
      </v-card>
    </v-dialog>
    <div class="svg-border-waves">
      <img src="~@/assets/wave2.svg" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      videoId: "jCjPL_80bpA",
      features: [
        {
          img: require("@/assets/blog-image-typesense.png"),
          title: "dev.to",
          text: "⚡ 🔍 Typesense search engine: an easier-to-use alternative to ElasticSearch",
          link: "https://dev.to/luizhlelis/typesense-search-engine-an-easier-to-use-alternative-to-elasticsearch-33dg"
        },
        {
          img: require("@/assets/blog-image-trace.png"),
          title: "dev.to",
          text: "Using W3C Trace Context standard in distributed tracing",
          link: "https://dev.to/luizhlelis/using-w3c-trace-context-standard-in-distributed-tracing-3743"
        },
        {
          img: require("@/assets/blog-image-integration-test.png"),
          title: "snippets",
          text: "How to Run Integration Tests Using Docker Compose and .NET 5",
          link: "https://blog.avenuecode.com/how-to-run-integration-tests-using-docker-compose-and-.net-5"
        },
      ],
    };
  },
  watch: {
    // dialog(value) {
    //   if (!value) {
    //     this.pause();
    //   }
    // },
  },
  methods: {
    // ready(event) {
    //   this.player = event.target;
    // },
    // change() {
    //   // when you change the value, the player will also change.
    //   // If you would like to change `playerVars`, please change it before you change `videoId`.
    //   // If `playerVars.autoplay` is 1, `loadVideoById` will be called.
    //   // If `playerVars.autoplay` is 0, `cueVideoById` will be called.
    //   this.videoId = "another video id";
    // },
    // stop() {
    //   this.player.stopVideo();
    // },
    // pause() {
    //   this.player.pauseVideo();
    // },
  },
  computed: {
    fontSizeH1 () {
      console.log(this.$vuetify.breakpoint.name)
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'font-h1-xs'
        case 'sm': return 'font-h1-sm'
        case 'md': return 'font-h1-md'
        case 'lg': return 'font-h1-lg'
        case 'xl': return 'font-h1-xl'
      }
      return ''
    },
    fontSizeH2 () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'font-h2-xs'
        case 'sm': return 'font-h2-sm'
        case 'md': return 'font-h2-md'
        case 'lg': return 'font-h2-lg'
        case 'xl': return 'font-h2-xl'
      }
      return ''
    },
    fontSizeBody () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'font-body-xs'
        case 'sm': return 'font-body-sm'
        case 'md': return 'font-body-md'
        case 'lg': return 'font-body-lg'
        case 'xl': return 'font-body-xl'
      }
      return ''
    },
    heightPlayerSize () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return this.$vuetify.breakpoint.height - 75
        case 'sm': return this.$vuetify.breakpoint.height - 110
      }
      return 360
    },
    widthPlayerSize () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return this.$vuetify.breakpoint.width - 50
        case 'sm': return this.$vuetify.breakpoint.width - 130
      }
      return 640
    },
  },
};
</script>

<style lang="scss">
.circle {
  stroke: white;
  stroke-dasharray: 650;
  stroke-dashoffset: 650;
  -webkit-transition: all 0.5s ease-in-out;
  opacity: 0.3;
}

.playBut {
  /*  border: 1px solid red;*/
  display: inline-block;
  -webkit-transition: all 0.5s ease;

  .triangle {
    -webkit-transition: all 0.7s ease-in-out;
    stroke-dasharray: 240;
    stroke-dashoffset: 480;
    stroke: white;
    transform: translateY(0);
  }

  &:hover {
    .triangle {
      stroke-dashoffset: 0;
      opacity: 1;
      stroke: white;
      animation: nudge 0.7s ease-in-out;

      @keyframes nudge {
        0% {
          transform: translateX(0);
        }
        30% {
          transform: translateX(-5px);
        }
        50% {
          transform: translateX(5px);
        }
        70% {
          transform: translateX(-2px);
        }
        100% {
          transform: translateX(0);
        }
      }
    }

    .circle {
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }
}
</style>

<style>
.font-h1-xs {
  font-size: 8vw;
}

.font-h1-sm {
  font-size: 6vw;
}

.font-h1-md {
 font-size: 4vw;
}

.font-h1-lg {
 font-size: 4vw;
}

.font-h1-xl {
 font-size: 4vw;
}

.font-h2-xs {
  font-size: 5vw;
}

.font-h2-sm {
  font-size: 4vw;
}

.font-h2-md {
 font-size: 2vw;
}

.font-h2-lg {
 font-size: 2vw;
}

.font-h2-xl {
 font-size: 2vw;
}

.font-body-xs {
  font-size: 4vw;
}

.font-body-sm {
  font-size: 3.5vw;
}

.font-body-md {
 font-size: 1.5vw;
}

.font-body-lg {
 font-size: 1.5vw;
}

.font-body-xl {
 font-size: 1.5vw;
}

.btn-play {
  transition: 0.2s;
}

.svg-border-waves .v-image {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100%;
  overflow: hidden;
}

#hero {
  z-index: 0;
}
.svg-border-waves img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: -2px;
  z-index: -1;
}

.card {
  min-height: 300px;
  padding: 10px;
  transition: 0.5s ease-out;
}

.card .v-image {
  margin-bottom: 15px;
  transition: 0.75s;
}

.card h1 {
  margin-bottom: 10px;
}

.zoom-efect {
  transform: scale(1.1);
}

.up {
  transform: translateY(-20px);
  transition: 0.5s ease-out;
}
</style>

<style>
section {
  position: relative;
}
</style>
