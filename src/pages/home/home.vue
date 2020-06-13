<template>
    <div class="hp" ref="hp_page" @click="hp_hide_float_page">
        <v-hd-header 
            :time_remain="remain_time"
            @change_cn_flag="mq_hd_lang_switch"
            @show_playlist="mq_hd_show_playlist"
            @show_about="mq_hd_show_about"
            @show_timer="mq_hd_show_timer"
            @stop_timer="mq_hd_stop_timer">
        </v-hd-header>
        <v-cr-playlist 
            class="hp-cr"
            :prop_cn_flag="cn_flag"
            :prop_show_play_list="show_play_list"
            @cr_begin_play="mq_cr_begin_play">
        </v-cr-playlist>
        <v-about 
            class="hp-ab"
            :ab_cn_flag="cn_flag"
            :ab_show_about="show_about">
        </v-about>
        <v-timer
            class="hp-tl"
            :tl_cn_flag="cn_flag"
            :tl_show_timer_list="show_timer"
            @tl_posted_time="mq_tl_timer_begin">
        </v-timer>
        <div class="hp-main">
            <div class="hp-main-title">
                {{app.app_name}} 
                <span class="hp-main-desc">{{app.app_description}}</span>
            </div>
            <div class="hp-main-poem">
                <div v-for="(item , idx) in poem" :key="idx">{{item}}</div>
            </div>
        </div>
        <v-weather
            :wt_cn_flag="cn_flag"
            @wt_stop_rainville="hp_stop_play">
        </v-weather>
        <div class="hp-footer">@copyright ElwinFrederick all rights reversed.</div>
        <v-audio
            :state="is_play"
            :item_play="playing_item">
        </v-audio>
    </div>
</template>
<script>
import Playlist from '@/components/content/playlist.vue'
import About from '@/components/content/about.vue'
import Timerlist from '@/components/content/timerlist.vue'
import HDHeader from '@/components/content/header.vue'
import Weather from '@/components/content/weather.vue'
import AudioOperate from "@/operate/audio.vue"

import CountDownTimer from "@/operate/timer.js"

const cd_timer = new CountDownTimer();

export default {
    name:"home",
    data() {
        return {
            app:{},
            poem:[],
            cn_flag:true,
            show_about:false,
            show_play_list:false,
            show_timer:false,
            is_play:false,
            playing_item:{},
            remain_time:""
        }
    },
    mounted() {
        this.mq_hd_lang_switch(true);
        cd_timer.callback = (str_time , is_stop) => {
            this.remain_time = str_time;
            if (is_stop) {
                this.hp_stop_play();
            }
        }
    },

    methods: {
        hp_hide_float_page() {
            this.show_play_list = false;
            this.show_about = false;
            this.show_timer = false;
        },

        mq_hd_lang_switch(flag) {
            if (flag) {
                this.app = this.rainville.display.zh_hans.app;
            }
            else {
                this.app = this.rainville.display.en.app;
            }
            this.poem = this.app.app_poem.split("\n");
            this.cn_flag = flag;
        },

        mq_hd_show_playlist (e) {
            this.show_play_list = !this.show_play_list;

            this.show_about = false;
            this.show_timer = false;
        },
        mq_hd_show_about () {
            this.show_about = !this.show_about;

            this.show_play_list = false;
            this.show_timer = false;
        },
        mq_hd_show_timer () {
            this.show_timer = !this.show_timer;

            this.show_play_list = false;
            this.show_about = false;
        },
        mq_hd_stop_timer(){
            cd_timer.mq_cancel_timer();
            this.remain_time = "";
        },
        hp_stop_play() {
            cd_timer.mq_cancel_timer();
            this.remain_time = "";
            this.is_play = false;
        },

        mq_cr_begin_play(item) {
            if (item.extra == "random") {
                item.volume = [Math.random()];
            }
            this.playing_item = item;
            this.is_play = true;
        },
        mq_tl_timer_begin(item) {
            cd_timer.mq_set_countdown(item);
            this.show_timer = false;
        }
    },

    components: {
        "v-cr-playlist":Playlist,
        "v-hd-header":HDHeader,
        "v-audio":AudioOperate,
        "v-about":About,
        "v-timer":Timerlist,
        "v-weather":Weather
    }
}
</script>

<style lang="scss">
@import "../../styles/defines.scss";

body {
    background-color: $main-color;
}

.hp {
    height: 100%;
    width: 100%;

    &-cr ,
    &-ab ,
    &-tl {
        position: absolute;
        right:20px;
    }

    &-main {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 50px;

        color: $text-white;
        vertical-align: bottom;

        &-title {
            font-size: $text-large;
        }
        &-desc {
            font-size: $text-small;
        }
        &-poem{
            display: flex;
            flex-direction: column;
            align-items: center;

            margin-top: 20px;
        }
    }

    &-footer {
        width: 100%;
        position:absolute;
        font-size: $text-small;
        color: $text-white;
        text-align:center;
        bottom:20px;
    }
}
</style>