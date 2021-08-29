import { distanceOnGround, makeMatrixOf3D, collesion } from './math-util.js';
import { PlayerLook, ModelEngine } from './engine.js';
import { PlayerJoinEvent, PlayerMoveEvent, PlayerQuitEvent } from './net-minecraft.js';

let engines;

class Player {

    constructor(vector3, keyController, lookable, username) {
        this.location = vector3;
        this.isOnGround = false;
        this.isJump = false;
        this.keyController = keyController;
        this.look = lookable;
        this.vy = 0.5;
        this.speed = 5.0;
        this.vyGravity = 2.0
        this.gravirty = 10.0;
        this.username = username;
        this.webcam = undefined;
    }

    updateIfPlayerIsFlying(delta, blocks) {
        const pos = JSON.parse(JSON.stringify(this.location));
        let pos2 = JSON.parse(JSON.stringify(this.location));
        pos2.y -= (this.gravirty * delta);

        if(distanceOnGround(pos2, blocks) <= 1.5) {
            if(this.isJump) {
                this.isJump = false;
                this.keyController.jump = false;
                this.vy = 0.5;
            }
            return true;
        }
        else {
            this.location.y = pos2.y;
            this.location.x = pos.x;
            this.location.z = pos.z;
        }    

        return false;
    }

    update(delta, blocks) {
        let pos = JSON.parse(JSON.stringify(this.location));

        if(this.keyController.jump) {
            if(!this.isOnGround) {
                this.keyController.jump = false;
                return;
            }
            this.isJump = true;
            this.isOnGround = false;
        }

        if(this.isJump) {
            if(this.vy <= 0) {
                this.isOnGround = this.updateIfPlayerIsFlying(delta, blocks);
            }
            else {
                this.vy -= (this.vyGravity * delta);
                this.location.y += this.vy;
            }
        }

        if(!this.isJump) {
            this.isOnGround = this.updateIfPlayerIsFlying(delta, blocks);
        }

        let weight = this.speed * delta;

        if(this.keyController.moveForward) {
            this.location.x += this.look.direction.x * weight;
            this.location.z += this.look.direction.z * weight;

            if(collesion(this.location, blocks)) {
                this.location.x -= this.look.direction.x * weight;
                this.location.z -= this.look.direction.z * weight;
            }
        }

        let comparePos = JSON.parse(JSON.stringify(pos));
        if(!this.isOnGround && distanceOnGround(comparePos, blocks) <= 1.5 &&
            collesion(comparePos, blocks)) {
            this.location.x = pos.x;
            this.location.y = Math.floor(pos.y + 0.1);
            this.location.z = pos.z;
            return;
        }
    }

    updateVideo(engine) {
        if(!this.webcam) {
            const video = engine.createVideoObject(this.location, this.username);

            if(video) {
                this.webcam = video;
            }
        }
        else {
            this.webcam.position.set(this.location.x + 1, this.location.y, this.location.z + 1);
        }
    }

    updateModel() {
        if(this.model !== undefined) {
            this.model.position.set(this.location.x, this.location.y - 1, this.location.z);
            this.model.rotation.y = this.look.direction.y / 0.9;
        }
    }

}

class World {
    
    constructor( x, y, z, blockGenerator, blockFetcher ) {
        this.players = [];
        this.blocks = makeMatrixOf3D(x, y, z);
        this.blocksDimessionOf1 = [];
        this.sizeX = x;
        this.sizeY = y;
        this.sizeZ = z;
        this.blockGenerator = blockGenerator;
        this.blockFetcher = blockFetcher;
    }

    getBlocks() {
        return this.blocks;
    }

    generateWorld() {
        let vector = new THREE.Vector3();
        for(let x = 0; x < this.sizeX; x++) {
            for(let y = 1; y < this.sizeY; y++) {
                for(let z = 0; z < this.sizeZ; z++) {
                    vector.x = x;
                    vector.y = y;
                    vector.z = z;

                    this.blocks[x][y][z] = this.blockGenerator( vector, '1' );
                    this.blocksDimessionOf1.push(this.blocks[x][y][z]);
                }
            }
        }
    }

    createBlock(vector) {
        this.blocks[vector.x][vector.y][vector.z] = this.blockGenerator( vector, '1' );
        this.blocksDimessionOf1.push(this.blocks[vector.x][vector.y][vector.z]);
    }

}

class GameUpdater {

    constructor(world, player, netSender ) {
        this.world = world;
        this.clientPlayer = player;
        this.netSender = netSender;
        this.players = {};
        this.users = [];

        netSender.broadcast(PlayerJoinEvent, {
            x: player.location.x,
            y: player.location.y,
            z: player.location.z,
            lookX: player.look.direction.x,
            lookY: player.look.direction.y,
            lookZ: player.look.direction.z
        });
    }

    update(delta, engine) {
        if(engines === undefined) {
            engines = engine;
        }

        this.clientPlayer.update(delta, this.world.blocksDimessionOf1);
        engine.updateCameraPos(this.clientPlayer.location);

        this.netSender.broadcast(PlayerMoveEvent, {
            x: this.clientPlayer.location.x,
            y: this.clientPlayer.location.y,
            z: this.clientPlayer.location.z,
            lookX: this.clientPlayer.look.direction.x,
            lookY: engine.angle,
            lookZ: this.clientPlayer.look.direction.z,
        });

        for(let i = 0; i < this.users.length; i++) {
            //this.players[this.users[i]].updateModel();
            this.players[this.users[i]].updateVideo(engine);
        }
    }

    addPlayer( sender, playerJson ) {
        if( sender !== this.clientPlayer.username ) {
            console.log('joined: ' + sender);
            const location = new THREE.Vector3(playerJson.x, playerJson.y, playerJson.z);
            const look = new PlayerLook(playerJson.lookX, playerJson.lookY, playerJson.lookZ);

            if(this.players[sender] === undefined) {
                this.players[sender] = new Player(location, undefined, look, sender);
                this.users.push(sender);
                console.log('added');
                //engines.modelEngine.createPlayer(this.players[sender]);
            }
        }
    }

    removePlayer( sender ) {
        if( sender !== this.clientPlayer.username ) {
            this.players[sender].model.remove();
            this.players.delete( sender );
        }
    }

    updatePlayerMove( sender, moveJson ) {
        if( sender !== this.clientPlayer.username ) {
            if(!this.players[sender]) {
                this.addPlayer( sender, moveJson );
            }

            this.players[sender].location.set( moveJson.x, moveJson.y, moveJson.z );
            this.players[sender].look.direction.set( moveJson.lookX, moveJson.lookY, moveJson.lookZ );
        }
    }

}

export {
    Player,
    World,
    GameUpdater
}
