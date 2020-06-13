<template>
    <div class="ad">
        <!-- 这两个无意义 , 只是为了引起 界面刷新 -->
        <div v-if="state"></div>
        <div v-if="item_play"></div>
    </div>
</template>
<script>
// 我也不想这么做 ... 不要问我 ... 
import AudioMP3_0 from "../assets/raw/0.mp3"
import AudioMP3_1 from "../assets/raw/1.mp3"
import AudioMP3_2 from "../assets/raw/2.mp3"
import AudioMP3_3 from "../assets/raw/3.mp3"
import AudioMP3_4 from "../assets/raw/4.mp3"
import AudioMP3_5 from "../assets/raw/5.mp3"
import AudioMP3_6 from "../assets/raw/6.mp3"
import AudioMP3_7 from "../assets/raw/7.mp3"
import AudioMP3_8 from "../assets/raw/8.mp3"
import AudioMP3_9 from "../assets/raw/9.mp3"

export default {
    name:"audioOperate",
    data() {
        return {
            audios:[],
            audio_paths:[]
        }
    },
    props:["state" , "item_play"],

    mounted() {
        this.audio_paths = [AudioMP3_0,  AudioMP3_1,  AudioMP3_2,  AudioMP3_3, 
         AudioMP3_4,  AudioMP3_5,  AudioMP3_6,  AudioMP3_7,  AudioMP3_8,  AudioMP3_9];
        this.mq_init_audios();
    },
    beforeUpdate() { 
        if (this.state) {
            let volumes = [];
            if (this.item_play.extra == "random") {
                let i = 0;
                while (i < 10) {
                    volumes.push(Math.random());
                    i++;
                }
            } else volumes = this.item_play.volume;
            this.mq_set_volumes(volumes);
        }
        this.mq_set_audio_state(this.state);
    },
    methods: {
        mq_init_audios() {
            let i = 0;
            while (i < 10) {
                let t = new Audio(this.audio_paths[i]);
                t.loop = true;
                this.audios.push(t);
                i++;
            }
        },

        mq_set_volumes(volumes) {
            this.audios.forEach((item, idx) => {
                item.volume = volumes[idx];
            });
        },

        mq_set_audio_state(state) {
            this.audios.forEach(item => {
                if (state) {
                    if (item.paused) {
                        item.play();
                    }
                }
                else item.pause();
            });
        },
    },
}
</script>
<style scoped>
.ad {
    display: none;
}
</style>