class KeyController {

    constructor() {
        this.moveForward = false;
        this.jump = false;
    }

    bind() {
        window.onkeydown = (e) => this._listenKeyDown(e);
        window.onkeyup = (e) => this._listenKeyUp(e);  
    }

    _listenKeyUp( e ) {
        if( e.key === 'w' ) {
            this.moveForward = false;
        }
    }

    _listenKeyDown( e ) {
        if( e.key === 'w' ) {
            this.moveForward = true;
        }
        if( e.code === 'Space' ) {
            this.jump = true;
        }
    }

}

class MouseLookController {

    constructor() {
        this.x = 0;
    }

    bind() {
        window.onmousemove = (e) => this._listenMouseMove(e);
    }

    _listenMouseMove( e ) {
        this.x = e.movementX;
    }

}

export {
    KeyController,
    MouseLookController
}