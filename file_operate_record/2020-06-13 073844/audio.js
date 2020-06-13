class AudioOperate {
    constructor() {
        this.audios = [];
        this.state = false;
        this.mq_init_audios();
    }

    audios;
    state;
    holder;

    mq_init_audios() {

        this.holder = document.createElement("div");
        // this.holder.style.display = "none";

        let i = 0;
        while (i < 10) {
            let p = "@/assets/raw/" + i;
            let t = new Audio();
            t.loop = true;
            t.autoplay = true;
            t.controls = true;

            let src = document.createElement("source");
            src.src = p + ".mp3";
            src.type = "audio/mp3";

            t.appendChild(src);

            let src1 = document.createElement("source");
            src1.src = p + ".wav";
            src1.type = "audio/wav";

            t.appendChild(src1);

            this.audios.push(t);

            this.holder.appendChild(t);
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
            // console.log(item);
            // return;
            if (state) {
                if (item.paused) {
                    item.play();
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