<template>
    <section id="videos">
        <div class="svg-top-waves text-white">
            <v-img v-show="$vuetify.theme.isDark" src="@/assets/border-waves-gray.svg" />
            <v-img v-show="!$vuetify.theme.isDark" src="@/assets/border-waves-white.svg" />
        </div>
        <v-container fluid id="articles" class="mt-2">
            <v-row align="center" justify="center">
                <v-card class="video-card" shaped :link="false">
                    <youtube :width="300" video-id="rqade8-xjyc" ref="youtube"></youtube>
                </v-card>
                <v-card class="video-card" shaped :link="false">
                    <youtube :width="300" video-id="nntTf9ZCo5Q" ref="youtube"></youtube>
                </v-card>
                <v-card class="video-card" shaped :link="false">
                    <youtube :width="300" video-id="jCjPL_80bpA" ref="youtube"></youtube>
                </v-card>
            </v-row>
        </v-container>
    </section>
</template>
  
<script>
export default {
    methods: {
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
</style>