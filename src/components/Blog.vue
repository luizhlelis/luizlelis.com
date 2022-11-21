<template>
    <section id="blog">
        <v-container fluid id="articles" class="mt-2">
            <v-row align="center" justify="center">
                <v-col cols="10">
                    <v-row align="center" justify="space-around">
                        <v-col cols="12" sm="4" class="text-center" v-for="(feature, i) in articlesPage" :key="i">
                            <v-hover v-slot:default="{ hover }">
                                <v-card class="card" shaped :link="true" :href="feature.link" target="_blank"
                                    :elevation="hover ? 10 : 4" :class="{ up: hover }"
                                    style="vertical-align: middle; display: table-cell; height: 250px; z-index: 2;">
                                    <v-img :src="feature.img" max-width="100px" class="d-block ml-auto mr-auto"
                                        :class="{ 'zoom-efect': hover }"></v-img>
                                    <h1 :class="fontSizeH2" class="font-weight-regular">{{ feature.title }}</h1>
                                    <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button"
                                        data-text="Take a look at this post written by @luizhlelis"
                                        :data-url="feature.link" data-related="luizhlelis" data-lang="en"
                                        data-show-count="false">
                                    </a>
                                    <h4 :class="fontSizeBody" class="font-weight-regular">{{ feature.text }}</h4>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                    <div class="text-center custom-pagination">
                        <v-pagination v-model="page" @input="next" :length="3" circle light></v-pagination>
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <div class="svg-botton-waves">
            <v-img v-show="$vuetify.theme.isDark" src="~@/assets/botton-waves-gray.svg" alt="Gray Button Waves" />
            <v-img v-show="!$vuetify.theme.isDark" src="~@/assets/botton-waves-white.svg" alt="White Button Waves" />
        </div>
    </section>
</template>

<script>
export default {
    mounted() {
        let twitterScript = document.createElement('script')
        twitterScript.setAttribute('src', 'https://platform.twitter.com/widgets.js')
        twitterScript.setAttribute('charset', 'utf-8')
        document.head.appendChild(twitterScript)
        this.articlesPage = this.articles[1];
    },

    data() {
        return {
            page: 1,
            articlesPage: [],
            articles: {
                1: [
                    {
                        img: require("@/assets/blog-image-outbox.png"),
                        title: "",
                        text: "📦 Data consistency, outbox pattern and idempotency in a microservice architecture",
                        link: "/blog/outbox-pattern"
                    },
                    {
                        img: require("@/assets/blog-image-typesense.png"),
                        title: "",
                        text: "⚡ 🔍 Typesense search engine: an easier-to-use alternative to ElasticSearch",
                        link: "/blog/typesense"
                    },
                    {
                        img: require("@/assets/blog-image-trace.png"),
                        title: "",
                        text: "Using W3C Trace Context standard in distributed tracing",
                        link: "/blog/tracecontext"
                    }
                ],
                2: [
                    {
                        img: require("@/assets/blog-image-integration-test.png"),
                        title: "",
                        text: "How to Run Integration Tests Using Docker Compose and .NET 5",
                        link: "https://blog.avenuecode.com/how-to-run-integration-tests-using-docker-compose-and-.net-5"
                    },
                    {
                        img: require("@/assets/blog-image-go-self-signed.png"),
                        title: "",
                        text: "🔐 Building a self signed server in golang",
                        link: "/blog/go-lang-self-signed"
                    },
                    {
                        img: require("@/assets/blog-image-docker-hub.png"),
                        title: "",
                        text: ".NET Core 2.1 container images were deleted from Docker Hub!",
                        link: "/blog/dotnet-docker-images-deleted"
                    },
                ],
                3: [
                    {
                        img: require("@/assets/blog-image-trace-csharp.png"),
                        title: "",
                        text: "[c#] Using W3C Trace Context standard in distributed tracing",
                        link: "/blog/tracecontext-dotnet"
                    }
                ]
            }
        }
    },
    methods: {
        next() {
            this.articlesPage = this.articles[this.page];
        }
    },
    computed: {
        fontSizeH2() {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return 'font-h2-xs'
                case 'sm': return 'font-h2-sm'
                case 'md': return 'font-h2-md'
                case 'lg': return 'font-h2-lg'
                case 'xl': return 'font-h2-xl'
            }
            return ''
        },
        fontSizeBody() {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return 'font-body-xs'
                case 'sm': return 'font-body-sm'
                case 'md': return 'font-body-md'
                case 'lg': return 'font-body-lg'
                case 'xl': return 'font-body-xl'
            }
            return ''
        }
    }
}
</script>

<style>
.svg-botton-waves {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    margin-bottom: -2px;
    z-index: 1;
}

.custom-pagination li {
    z-index: 2;
}
</style>