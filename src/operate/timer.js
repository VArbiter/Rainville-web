class CountDownTimer {
    timer;
    time;
    callback;

    mq_set_countdown(time) {
        this.time = time * 60; // 将分钟转换成为秒
        this.mq_cancel_timer();
        let that = this;
        this.timer = setInterval(() => {
            if (that.callback) {
                that.time--;
                let hour = ("0" + Math.floor(that.time / 3600)).slice(-2),
                    minutes = ("0" + Math.floor(that.time / 60 % 60)).slice(-2),
                    seconds = ("0" + Math.floor(that.time % 60)).slice(-2);
                let flag = that.time <= 0;
                that.callback(`${hour} : ${minutes} : ${seconds}` , flag);
                if (flag) {
                    that.mq_cancel_timer(that.timer);
                }
            } 
        }, 1000);
    }

    mq_cancel_timer() {
        clearInterval(this.timer);
    }   
}

export default CountDownTimer;