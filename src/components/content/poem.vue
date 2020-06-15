<template>
    <div class="mp">
        <!-- 无意义 , 只是为了引起界面刷新 -->
        <div v-if="mp_cn_flag"></div>
        <div class="mp-main-title">
            {{app.app_name}}
            <span class="mp-main-desc">{{app.app_description}}</span>
        </div>
        <div class="mp-main-poem">
            <div v-for="(item , idx) in poem" :key="idx">{{item}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name:"poem", 
    data() {
        return {
            app: {},
        }
    },
    props: ['mp_cn_flag'],

    beforeUpdate() { 
        this.mp_change_lang(this.mp_cn_flag);
    },
    mounted() {
        this.mp_change_lang(true);
    },
    methods: {
        mp_change_lang(flag) {
            if (flag) {
                this.app = this.rainville.display.zh_hans.app;
            }
            else {
                this.app = this.rainville.display.en.app;
            }
            this.poem = this.app.app_poem.split("\n");
        }
    },

}
</script>
<style lang="scss" scoped>
@import "../../styles/defines.scss";
.mp {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 30px;
    color: $text-white;
    vertical-align: bottom;

    &-main {
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
}
</style>