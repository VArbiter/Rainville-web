<template>
    <div class="wt" v-if="is_complete">
        <div class="wt-img">
            <i :class="iconfont"></i>
        </div>
        <div v-if="wt_cn_flag" class="wt-city-content">
            <div>{{`${data.wea}`}}</div>
            <div>{{`${data.country} , ${data.city}`}}</div>
        </div>
        <div v-else class="wt-city-content">
            <div>{{`${data.wea_img}`}}</div>
            <div>{{`${data.cityEn} , ${data.countryEn}`}}</div>
        </div>
        <div v-if="wt_cn_flag" class="wt-content">
            <div>{{`更新时间 : ${data.update_time}`}}</div>
            <div>{{`当前 : ${data.tem} ℃`}}</div>
            <div>{{`今日 : ${data.tem2} ℃ ~ ${data.tem1} ℃`}}</div>
            <div>{{`湿度 : ${data.humidity}`}}</div>
            <div>{{`风力 : ${data.win} , ${data.win_speed} , ${data.win_meter}`}}</div>
            <div>{{`PM2.5 : ${data.air_pm25} ( ${data.air_level} )`}}</div>
            <div>{{`能见度 : ${data.visibility}`}}</div>
            <div>{{`大气压 : ${data.pressure} hPa`}}</div>
        </div>
        <div v-else class="wt-content">
            <div>{{`Update time : ${data.update_time}`}}</div>
            <div>{{`Current : ${data.tem} ℃`}}</div>
            <div>{{`Today : ${data.tem2} ℃ ~ ${data.tem1} ℃`}}</div>
            <div>{{`Humidity : ${data.humidity}`}}</div>
            <div>{{`Wind speed : ${data.win} , ${data.win_speed} , ${data.win_meter}`}}</div>
            <div>{{`PM2.5 : ${data.air_pm25} ( ${data.air_level} )`}}</div>
            <div>{{`Visibility : ${data.visibility}`}}</div>
            <div>{{`Pressure : ${data.pressure} hPa`}}</div>
        </div>
    </div>
</template>
<script>

export default {
    name: "weather",
    data() {
        return {
            data:{},
            iconfont:"",
            is_complete: true
        }
    },
    props:["wt_cn_flag"],

    mounted() {
        this.wt_refresh_weather();
    },

    methods: {
        wt_refresh_weather() {
            let that = this;
            this.axios.get(`https://tianqiapi.com/api?version=v6&appid=17557774&appsecret=rTId4nVR`)
            .then(res => {
                console.log(res.data);
                that.data = {...res.data};
                that.iconfont = `iconfont icon-${that.data.wea_img}`;
            }).catch(e => {
                that.is_complete = false;
            })
        }
    },
}
</script>
<style scoped lang="scss">
@import url("../../assets/iconfont.css");
@import "../../styles/defines.scss";

.wt {
    width: 100%;
    color: $text-white;

    display: flex;
    flex-direction: column;
    align-items: center;

    &-img {
        margin-top: 30px;
        font-size: 50px;
    }

    &-city-content{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &-content{
        margin-top: 20px;
        width: 300px;
    }
}

</style>