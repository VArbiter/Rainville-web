class PCorMobile {
    constructor() {
        this.mq_detect();
    }
    system = {
        win: false,
        mac: false,
        xll: false,
        ipad: false
    }
    is_pc = false;

    // 简易判断是 PC 访问还是 手机 访问
    mq_detect() {
        let p = navigator.platform;
        this.system.win = p.indexOf("Win") == 0;
        this.system.mac = p.indexOf("Mac") == 0;
        this.system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
        this.system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;

        this.is_pc = (this.system.win || this.system.mac || this.system.xll || this.system.ipad);
    }
}

export default PCorMobile;