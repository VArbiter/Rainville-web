<template>
    <div class="tl">
        <transition name="fade">
            <div v-if="tl_show_timer_list">
                <ul v-if="tl_cn_flag" class="tl-timerlist" :style="style_obj">
                    <li v-for="(item, idx) in timelist" :key="idx" @click.stop="tl_timer_select(item)">
                        <a>{{item + " 分钟"}}</a>
                    </li>
                </ul>
                <ul v-else class="tl-timerlist" :style="style_obj">
                    <li v-for="(item, idx) in timelist" :key="idx" @click.stop="tl_timer_select(item)">
                        <a>{{item + " minutes"}}</a>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    name:"timerlist",
    data() {
        return {
            timelist:[],
            style_obj:{}
        }
    },
    props:["tl_cn_flag" , "tl_show_timer_list"],

    mounted() {
        this.timelist = [...this.rainville.timers];
        this.timelist.splice(0,1); // 去掉 0

        if (this.pc_or_mobile.is_pc) {
            this.style_obj = {
                backgroundColor: "rgba(255,255,255,.2)",
                color: "#D4D5DA"
            }
        }
        else {
            this.style_obj = {
                backgroundColor: "rgb(255,255,255)",
                color: "#272C32"
            }
        }
    },

    methods: {
        tl_timer_select(item) {
            this.$emit("tl_posted_time" , item);
        }
    },
}
</script>
<style scoped lang="scss">
@import "../../styles/defines.scss";

.fade-enter-active, .fade-leave-active {
    transition: opacity .25s
}
.fade-enter, .fade-leave-to {
    opacity: 0
}

.tl {
    width:200px;

    &-timerlist {
        margin-top: 20px;
        list-style: none;
        background-color: $white-opacity-2;
        border-radius: 5px;
        color:$text-white;
        font-size: $text-default-size;
        z-index: $z-index-large;

        li {
            width:100%;
            border-bottom: 1px dashed $main-color;
            padding-left: 10px;
            height: 25px;
            line-height: 25px;

            a {
                width:100%;
                cursor: pointer;
            }
        }
    }
}


</style>