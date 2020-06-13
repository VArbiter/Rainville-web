class AudioOperate {
    constructor() {
        this.audios = [];
        this.state = false;
        this.mq_init_audios();
    }

    audios;
    state;

    mq_init_audios() {

        let i = 0;
        while (i < 10) {
            let p = "./assets/raw/" + i + ".mp3";
            let t = new Audio(p);
            t.loop = true;
            this.audios.push(t);
            i++;
        }
    }

    mq_set_volumes(volumes) {
        this.audios.forEach((item, idx) => {
            item.volume = volumes[idx];
        });
    }

    mq_set_audio_state(state) {
        if (state == this.state) return;

        this.state = state;
        this.audios.forEach(item => {
            if (state) {
                if (item.paused) {
                    item.playAudio();
                }
            }
            else item.pause();
        });
    }

    mq_fetch_useable_data(obj) {
        this.mq_set_volumes(obj.volume);
    }
}

export default AudioOperate;