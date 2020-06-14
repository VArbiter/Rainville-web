<template>
    <transition name="fade" >
        <div class="ab" v-if="ab_show_about" @click.stop="ab_holder" :style="style_obj">
            <img class="ab-logo ab-left" :src="logo" alt=""> 
            <div class="ab-right-content">
                <div v-if="ab_cn_flag">
                <div class="ab-app-name">{{display.zh_hans.app.app_name}}</div>
                <div class="ab-version">
                    <span>{{display.zh_hans.action.version}}</span>
                    :1.0.1
                </div>
            </div>
            <div v-else>
                <div class="ab-app-name">{{display.en.app.app_name}}</div>
                <div class="ab-version">
                    <span>{{display.en.action.version}}</span>
                    :1.0.1
                </div>
            </div>
            <a href="https://github.com/VArbiter" :style="style_a_obj">github.com/VArbiter</a>
            <a href="mailto:elwinfrederick@163.com" :style="style_a_obj">elwinfrederick@163.com</a>
            </div>
        </div>
    </transition>
</template>
<script>
import Logo1024 from "../../assets/icon-1024.png";

export default {
    name: "about",
    data() {
        return {
            display:{},
            logo:"",
            style_obj:{},
            style_a_obj:{}
        }
    },
    props:["ab_cn_flag" , "ab_show_about"],

    mounted() {
        this.display = this.rainville.display;
        this.logo = Logo1024;

        if (this.pc_or_mobile.is_pc) {
            this.style_obj = {
                backgroundColor: "rgba(255,255,255,.2)",
                color: "#D4D5DA"
            }
            this.style_a_obj = {
                color: "#D4D5DA"
            }
        }
        else {
            this.style_obj = {
                backgroundColor: "rgb(255,255,255)",
                color: "#272C32"
            }
            this.style_a_obj = {
                color: "#272C32"
            }
        }
    },

    methods: {
        ab_holder (){
            // 只是为了阻止冒泡 , 没有别的作用
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

.ab {
    width:240px;
    margin-top: 20px;
    color:$text-white;
    font-size: $text-default-size;
    z-index:$z-index-large;

    background-color: $white-opacity-2;
    border-radius: 5px;
    padding: 10px;

    display: flex;
    flex-direction: row;
    align-items: center;

    &-logo {
        width: 60px;
        height: 60px;
    }

    &-right-content{
        padding-left: 10px;
    }

    &-app-name {
        font-size: $text-medium;
    }

    a {
        display: block;
        font-size: $text-default-size;
        color:$text-white;
        text-decoration: none;
    }
}
</style>