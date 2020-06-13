<template>
    <div class="hd">
        <a class="hd-btn-language-switch" @click.stop="mq_fn_btn_lang_switch">{{btn_switch_name}}</a>
        <a class="hd-btn-about" @click.stop="mq_fn_btn_about">{{btn_about_name}}</a>
        <a class="hd-btn-playlist" @click.stop="mq_fn_btn_play_list">{{btn_list_name}}</a>
        <a class="hd-btn-timer" @click.stop="mq_fn_btn_timer">{{btn_timer_name}}</a>
        <a class="hd-btn-time-remain" :title="btn_stop_hint" @click.stop="mq_fn_btn_stop_timer">{{time_remain}}</a>
    </div>
</template>
<script>
export default {
    name:"hd_header",
    data() {
        return {
            btn_switch_name:"Switch to English",
            btn_list_name:"雨声",
            btn_about_name:"关于",
            btn_timer_name:"定时",
            btn_stop_hint:"单击停止",
            cn_flag:true
        }
    },
    props:["time_remain"],

    methods: {
        mq_fn_btn_lang_switch() {
            this.cn_flag = !this.cn_flag;
            this.$emit("change_cn_flag", this.cn_flag);

            if (this.cn_flag) {
                this.btn_switch_name = "Switch to English";
                this.btn_list_name = "雨声" ;
                this.btn_about_name = "关于";
                this.btn_timer_name = "定时";
                this.btn_stop_hint = "单击停止";
            } else {
                this.btn_switch_name = "切换为中文";
                this.btn_list_name = "Rain" ;
                this.btn_about_name = "About";
                this.btn_timer_name = "Timer";
                this.btn_stop_hint = "Click to stop.";
            }
        },

        mq_fn_btn_play_list() {
            this.$emit("show_playlist");
        },

        mq_fn_btn_about(){
            this.$emit("show_about");
        },

        mq_fn_btn_timer() {
            this.$emit("show_timer");
        },

        mq_fn_btn_stop_timer() {
            this.$emit("stop_timer");
        }
    },
}
</script>
<style scoped lang="scss">
@import "../../styles/defines.scss";

.hd {
    width: 100%;
    height: 40px;
    line-height: 40px;

    &-btn-language-switch ,
    &-btn-about,
    &-btn-playlist,
    &-btn-timer,
    &-btn-time-remain {
        padding-right:20px;
        font-size: $text-default-size;
        color: $text-white;
        background-color: transparent;
        border: none;
        cursor:pointer;

        float:right;
    }
}

</style>