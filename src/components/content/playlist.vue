<template>
    <div class="cr">
        <transition name="fade">
            <div v-show="prop_show_play_list">
                <ul v-if="prop_cn_flag" class="cr-volume-list" :style="style_obj">
                    <li v-for="item in data_volume" :key="item.ol" @click.stop="cr_play_select(item)">
                        <a>{{ item.zh_hans }}</a>
                    </li>
                </ul>
                <ul v-else class="cr-volume-list" :style="style_obj">
                    <li v-for="item in data_volume" :key="item.ol" @click.stop="cr_play_select(item)">
                        <a>{{ item.en }}</a>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    name:"playlist",
    data() {
        return {
            data_volume:{},
            style_obj:{}
        }
    },

    mounted() {
        this.data_volume = this.rainville.data_volume;
        console.log(this.pc_or_mobile);
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
        cr_play_select(item) {
            this.$emit("cr_begin_play" , item);
        }
    },

    props:["prop_cn_flag" , "prop_show_play_list"]
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

.cr {
    width:200px;

    &-volume-list {
        margin-top: 20px;
        list-style: none;
        background-color: $white-opacity-10;
        border-radius: 5px;
        color:$text-black;
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

    &-volume-list:nth-last-child(1){
        border-bottom:none;
    }
}
</style>