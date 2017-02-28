import EventEmitter from 'events'
import SocketController from './socket-controller'

export default class  {
    constructor(config) {
        console.log("Game constructed!")
        this.config = config;
        this.started = false;
    }
    init() {
        class CustomEmitter extends EventEmitter {}
        this.emitter = new CustomEmitter();
        global.events = this.emitter;


        /*
        this.socketController = new SocketController();
        this.socketController.init(); */
    }

    load(onLoad) {

        onLoad();

    }

    start() {
        this.resize();
        $('.slider').unslider(
            { 
                autoplay: true, 
                delay: 5000,
                arrows: false,
                infinite: true
            }
        );
    }

    animate(dt) {
        this.update(dt);
        this.render();
    }

    update(dt) {
    }

    render() {
    }

    resize() {
    }
}
