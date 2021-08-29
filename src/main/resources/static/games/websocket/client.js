class Bootstrap {

    constructor(addr, onload) {
        this.socket = new WebSocket( "wss://" + addr );
        this.observer = {}
        this.onload = onload;
        this.bindEventListener();
    }

    subscribe(eventName, eventListener) {
        this.observer[eventName] = eventListener;
    }

    bindEventListener() {
        this.socket.onopen = this._open.bind(this);
        this.socket.onclose = this._close.bind(this);
        this.socket.onmessage = this._receive.bind(this);
        this.socket.onerror = this._error.bind(this);
    }

    _open(e) {
        console.log('opened socket')
        this.onload(this);
    }

    _close(e) {
        console.log('dispose connection');
    }

    _receive(e) {
        const json = JSON.parse(e.data);

        if(!this.observer[json.event]) {
            return;
        }

        this.observer[json.event](json.sender, JSON.stringify(json.element))
    }

    _error(e) {
        console.log('occured error ' + e.data);
    }

}

class Packet {

    constructor(event, className) {
        this.packet = {
            event: event,
            sender: '',
            className, className,
            element: {}
        }
    }

    set(packetName, element) {
        this.packet[packetName] = element;
    }

    toPacket() {
        return JSON.stringify(this.packet);
    }

}

export {
    Bootstrap, 
    Packet
};