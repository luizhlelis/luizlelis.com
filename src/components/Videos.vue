<template>
    <section id="videos">
        <div class="svg-top-waves text-white">
            <v-img v-show="$vuetify.theme.isDark" src="@/assets/border-waves-gray.svg" />
            <v-img v-show="!$vuetify.theme.isDark" src="@/assets/border-waves-white.svg" />
        </div>
        <v-container fluid id="articles" class="mt-2">
            <v-row align="center" justify="center">
                <v-card class="video-card" shaped :link="false" v-for="(video, i) in videosPage" :key="i">
                    <youtube :width="300" :video-id="video.id" :player-vars="video.playerVars" ref="youtube"></youtube>
                </v-card>
            </v-row>
            <div class="text-center custom-video-pagination">
                <v-pagination v-model="page" @input="next" :length="2" circle light></v-pagination>
            </div>
        </v-container>
    </section>
</template>
  
<script>
export default {
    mounted() {
        this.videosPage = this.videos[1];
    },
    data() {
        return {
            page: 1,
            videosPage: [],
            videos: {
                1: [
                    {
                        id: "dzkSEr3VHRU",
                        playerVars: {}
                    },
                    {
                        id: "rqade8-xjyc",
                        playerVars: {}
                    },
                    {
                        id: "nntTf9ZCo5Q",
                        playerVars: {}
                    },
                    {
                        id: "jCjPL_80bpA",
                        playerVars: {}
                    }
                ],
                2: [
                    {
                        id: "7DkrciPeRhI",
                        playerVars: {
                            start: 6751
                        }
                    },
                    {
                        id: "xiEgs6D5qSE",
                        playerVars: {}
                    }
                ]
            }
        }
    },
    methods: {
        next() {
            this.videosPage = this.videos[this.page];
        },
        playVideo() {
            this.$refs.youtube.player.playVideo()
        }
    }
}
</script>

<style>
.video-card {
    min-height: 300px;
    padding: 10px;
    transition: 0.5s ease-out;
    margin: 10px;
}

.svg-top-waves .v-image {
    -webkit-transform: rotate(180deg);
    bottom: 0;
    left: 0;
    height: 3rem;
    width: 100%;
    overflow: hidden;
}

.svg-top-waves img {
    -webkit-transform: rotate(180deg);
    bottom: 0;
    left: 0;
    width: 100%;
    margin-bottom: -2px;
    z-index: -1;
}

.custom-video-pagination li {
    z-index: 2;
}
</style>