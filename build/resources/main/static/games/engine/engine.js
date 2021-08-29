import { clamp } from "./math-util.js";
import { OBJLoader } from '../three.js/examples/jsm/loaders/OBJLoader.js'
import { createVideoElement, webrtcStart } from "../webrtc/multiple-user-video.js";

const cameraFetchType = 1;
const sceneFetchType = 2;

class ModelEngine {

    constructor(scene) {
        this.scene = scene;
    }

    createPlayer(player) {
        let sc = this.scene;
        const model3d = new OBJLoader().load(
            './textures/lego_obj.obj',
            function ( object ) {
                if(player != undefined) {
                    object.scale.set(0.05, 0.05, 0.05);
                    object.position.set(player.location.x, player.location.y, player.location.z);
                    player.model = object;

                    sc.add( object );
                }
            },

            function ( xhr ) {

            },

            function ( error ) {
                console.log('An error happend ' + error);
            }
        );
    }

}

class Graphics3DEngine {

    /**
     * 
     * @param skyColor Setup color all background 
     */
    constructor( skyColor, texturePath ) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer();
        this.skyColor = skyColor;
        this.geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
        this.textureEngine = new TextureEngine( texturePath );
    }

    connect() {
        this.scene.background = new THREE.Color( this.skyColor );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );
    }

    createMesh( vector, textureName ) {
        try {
            const material = this.textureEngine._getMeshMaterial('');//this.textureEngine.loadedMaterial[textureName];
            const cube = new THREE.Mesh( this.geometry, material )

            cube.position.x = vector.x;
            cube.position.y = vector.y;
            cube.position.z = vector.z;

            this.scene.add( cube );

            return cube;
        } catch ( e ) {
            console.log( e.message );
        }

        return null;
    }

    fetch( fetchType, changePoint, vector3 ) {
        if( fetchType === cameraFetchType) {
            for( let i = 0; i < changePoint.length; i++ ) {
                if( changePoint[i] === 'x' ) {
                    this.camera.position.x = vector3.x * this.delta;
                }
                else if( changePoint[i] === 'y' ) {
                    this.camera.position.y = vector3.y * this.delta;
                }
                else if( changePoint[i] === 'z' ) {
                    this.camera.position.z = vector3.z * this.delta;
                }
            }           
        }
        else if( fetchType === sceneFetchType ) {
            this.scene.add(vector3);
        }
    }

    update() {
        this.renderer.render( this.scene, this.camera );
    }

}

class TextureEngine {

    /**
     * @param texturePath Path of all texture files in directory
     */
    constructor( texturePath ) {
        this.texturePath = texturePath;
        this.loader = new THREE.TextureLoader();
        this.loadedTexture = {};
        this.loadedMaterial = {};
    }

    /**
     * @param textureName The name of the texture file to be loaded
     * 
     * @return 텍스쳐 파일을 로드합니다. 다만 이미 로드가 된 텍스쳐 파일이라면 캐싱되어있는 텍스쳐 오브젝트를 반환합니다.
     */
    getTexture( textureName ) {
        // const texture = this._getTextureName( textureName );
        const texture = './textures/1.png';

        if( !this.loadedTexture[texture] ) {
            this.loadedTexture[texture] = this.loader.load( texture );
            this.loadedMaterial[texture] = this._getMeshMaterial( this.loadedTexture[texture] );
        }

        return this.loadedTexture[texture];
    }

    getMeshMaterial( textureName ) {
        const texture = this._getTextureName( textureName );
        const textureObject = this.getTexture( textureName );

        if( !this.loadedMaterial[texture] ) {
            throw textureName + ' is not loaded';
        }

        return textureObject;
    }

    /**
     * @param texture Loaded texture object
     * 
     * @return 로드된 텍스쳐파일을 적용한 Material을 반환합니다
     */
    _getMeshMaterial( texture ) {
        // return new THREE.MeshBasicMaterial( { map: texture } );
        return new THREE.MeshBasicMaterial( { color: 0x00f000 } );
    }

    _getTextureName( textureName ) {
        return this.texturePath + textureName + ".png";
    }

}

class Engine {
    
    constructor(graphicsEngine, lookable, mouseController, gameUpdater) {
        this.delta = 0;
        this.clock = new THREE.Clock();
        this.graphicsEngine = graphicsEngine;
        this.lookable = lookable;
        this.mouseController = mouseController;
        this.gameUpdater = gameUpdater;
        this.angle = 0;
        this.modelEngine = new ModelEngine(this.graphicsEngine.scene);
    }

    _animation() {
        requestAnimationFrame( () => this._animation() );

        this.delta = this.clock.getDelta();
        this.calcCameraAngle();
        this.lookable.update(this.graphicsEngine.camera);
        this.gameUpdater.update(this.delta, this);

        this.graphicsEngine.update();
    }

    init(username) {
        this.graphicsEngine.connect(); // initialize graphic engine
        this._animation(); // start graphic render
        setTimeout(() => {
            webrtcStart(username);            
        }, 3000);
        console.log('init engine...');
    }

    calcCameraAngle() {
        let rotateX = this.mouseController.x * 1.5 * this.deltaTime();
    
        this.angle -= rotateX;
        this.angle = clamp( this.angle, -10, 10 );

        this.graphicsEngine.camera.rotation.y = this.angle;
    }

    deltaTime() {
        return this.delta;
    }

    createBlock( vector, textureName ) {
        return this.graphicsEngine.createMesh( vector, textureName );
    }

    updateCameraPos(pos) {
        this.graphicsEngine.camera.position.x = pos.x;
        this.graphicsEngine.camera.position.y = pos.y;
        this.graphicsEngine.camera.position.z = pos.z;
    }

    createVideoObject(pos, username) {
        const localVideo = createVideoElement(username);
        if(!localVideo) {
            return false;
        }

        const videoTexture = new THREE.VideoTexture(localVideo);
        const geometry = new THREE.BoxBufferGeometry( 2, 2, 2 );
        const videoMaterial =  new THREE.MeshBasicMaterial( {map: videoTexture} );
        const mesh = new THREE.Mesh( geometry, videoMaterial );

        this.graphicsEngine.scene.add(mesh);
        return mesh;
    }

}

/**
 * Wrapped camera rotation
 * 
 */
class PlayerLook {
    
    constructor() {
        this.direction = new THREE.Vector3();
    }

    update(camera) {
        camera.getWorldDirection(this.direction);
    }

    getLook() {
        return this.direction;
    }

}

export {
    Graphics3DEngine,
    Engine,
    PlayerLook,
    ModelEngine,
    sceneFetchType,
}