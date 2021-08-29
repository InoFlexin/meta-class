import { Packet } from '../websocket/client.js';

const PlayerMoveEvent = 'onPlayerMove';
const PlayerJoinEvent = 'onPlayerJoin';
const PlayerQuitEvent = 'onPlayerQuit';

class PlayerNetEventListener {

    constructor( bootstrap, gameUpdater ) {
        this.bootstrap = bootstrap;
        this.gameUpdater = gameUpdater;
        console.log('constructor: ' + gameUpdater);
    }

    bind() {
        this.bootstrap.subscribe(PlayerMoveEvent, this._listenPlayerMove.bind(this));
        this.bootstrap.subscribe(PlayerJoinEvent, this._listenPlayerJoin.bind(this));
        this.bootstrap.subscribe(PlayerQuitEvent, this._listenPlayerQuit.bind(this));
    }

    _listenPlayerMove( sender, data ) {
        if(data != undefined) {
            this.gameUpdater.updatePlayerMove( sender, JSON.parse(data) );
        }
    }

    _listenPlayerLookChange( sender, data ) {
        if(data != undefined) {
            this.gameUpdater.updatePlayerLook( sender, JSON.parse(data) );
        }
    }

    _listenPlayerJoin( sender, data ) {
        if(data != undefined) {
            this.gameUpdater.addPlayer( sender, JSON.parse(data) );
        }
    }

    _listenPlayerQuit( sender, data ) {
        if(data != undefined) {
            this.gameUpdater.removePlayer( sender );
        }
    }

}

class PlayerNetSender {

    constructor( bootstrap, sender, className ) {
        this.bootstrap = bootstrap;
        this.packet = new Packet('', className);
        this.packet.set('sender', sender);
    }

    broadcast(eventName, payload) {
        this.packet.set('event', eventName);
        this.packet.set('element', payload);
        this._send(this.packet);
    }

    _send(packet) {
        this.bootstrap.socket.send( packet.toPacket() );
    }

}

export {
    PlayerNetEventListener, 
    PlayerNetSender,

    PlayerMoveEvent,
    PlayerQuitEvent,
    PlayerJoinEvent
};