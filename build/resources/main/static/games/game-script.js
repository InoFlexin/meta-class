import { Graphics3DEngine, Engine, PlayerLook, sceneFetchType, ModelEngine } from "./engine/engine.js";
import { KeyController, MouseLookController } from "./engine/event-binder.js";
import { Player, World, GameUpdater } from './engine/minecraft.js';
import { Bootstrap } from "./websocket/client.js";
import { PlayerNetEventListener, PlayerNetSender } from "./engine/net-minecraft.js";

const initGame = () => {
    const username = prompt("닉네임을 입력하세요");

    const bootstrap = new Bootstrap('45.76.211.222:9000', (net) => {
        const graphic = new Graphics3DEngine( 'lightblue', './textures/' );
        const keyController = new KeyController();
        const mouseController = new MouseLookController();
        const playerLook = new PlayerLook(); // lookable player

        const createBlockImpl = ( vector, textureName ) => {
            return graphic.createMesh( vector, textureName );
        }
        const fetchBlockImpl = ( block ) => {
            graphic.fetch(sceneFetchType, '', block);
        }
        
        let world = new World(10, 2, 10, createBlockImpl, fetchBlockImpl);
        let player = new Player(new THREE.Vector3(3, 5, 3), keyController, playerLook, username);
        
        const netSender = new PlayerNetSender( net, username, 'test-class' );
        let gameUpdater = new GameUpdater(world, player, netSender);

        // socket에서 받은 데이터를 GameUpdater로 넘겨주는 이벤트 리스너
        const netEventListener = new PlayerNetEventListener( net, gameUpdater );
        netEventListener.bind();
        
        world.generateWorld();
        world.createBlock(new THREE.Vector3(3,3,3));
        const engine = new Engine(graphic, playerLook, mouseController, gameUpdater);
        
        keyController.bind(); // binding to document keyboard event
        mouseController.bind();
        
        engine.init(username) // engine start 
    })
}

export {
    initGame
}
