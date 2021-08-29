const WSS_PORT = '9090';
const WSS_HOST = '45.76.211.222'
const WSS_LOCAL_HOST = '127.0.0.1';

let localUuid;
let localDisplayName;
let localStream;
let serverConnection;
let peerConnections = {};
let usernameToUuid = {};
let streams = {};

const peerConnectionConfig = {
    iceServers: [
        { urls: 'stun:stun.stunprotocol.org:3478' },
        { urls: 'stun:stun.l.google.com:19302' }
    ]
};

// media 관련 설정
const mediaStreamConstraints = {
    video: {
        width: 1280,
        height: 720,
        facingMode: 'user'
    },
    audio: true
};

// ==================================================================================================================

function webrtcStart(localName) {
    localUuid = createUUID();
    localDisplayName = localName;
    usernameToUuid[localDisplayName] = localUuid;
    console.log('run webrtc');

    if(navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
            .then(stream => {
                localStream = stream;
                streams[localDisplayName] = localStream;
                console.log('setup local stream');
            }).catch(errorHandle)
            .then(() => {
                serverConnection = new WebSocket('wss://45.76.211.222:9090');
                serverConnection.onmessage = gotMessageFromServer;
                serverConnection.onopen = (event) => {
                    serverConnection.send(JSON.stringify({
                        'displayName': localDisplayName,
                        'uuid': localUuid,
                        'dest': 'ALL'
                    }));
                    console.log('sended');
                }
            }).catch(errorHandle);
    }
    else {
        alert('당신의 브라우저에선 getUserMedia API를 지원하지 않습니다. 관리자에게 문의하세요.');
    }
}

function gotMessageFromServer(message) {
    let signal = JSON.parse(message.data);
    let peerUuid = signal.uuid;

    console.log('got message: ' + message);

    if(peerUuid == localUuid || (signal.dest != localUuid && signal.dest != 'ALL')) {
        return;
    }

    if(signal.displayName && signal.dest == 'ALL') {
        setUpPeer(peerUuid, signal.displayName);
        serverConnection.send(JSON.stringify({ 'displayName': localDisplayName, 'uuid': localUuid, 'dest': peerUuid }));
    }
    else if(signal.displayName && signal.dest == localUuid) {
        setUpPeer(peerUuid, signal.displayName, true);
    }
    else if(signal.sdp) {
        peerConnections[peerUuid].pc.setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
            if(signal.sdp.type == 'offer') {

                peerConnections[peerUuid].pc.createAnswer()
                    .then(description => createdDescription(description, peerUuid))
                    .catch(errorHandle)

            }
        }).catch(errorHandle);
    }
    else if(signal.ice) {
        peerConnections[peerUuid].pc.addIceCandidate(new RTCIceCandidate(signal.ice)).catch(errorHandle);
    }

}

function setUpPeer(peerUuid, displayName, initCall = false) {
    peerConnections[peerUuid] = {
        'displayName': displayName,
        'pc': new RTCPeerConnection(peerConnectionConfig)
    };
    peerConnections[peerUuid].pc.onicecandidate = event => gotIceCandidate(event, peerUuid);
    peerConnections[peerUuid].pc.ontrack = event => gotRemoteStream(event, peerUuid, displayName);
    peerConnections[peerUuid].pc.oniceconnectionstatechange = event => checkPeerDisconnect(event, peerUuid);

    for(const track of localStream.getTracks()) {
        peerConnections[peerUuid].pc.addTrack(track);
    }

    if(initCall) {
        peerConnections[peerUuid].pc.createOffer().then(description => createdDescription(description, peerUuid));
    }
}

function createdDescription(description, peerUuid) {
    console.log(`got description, peer ${peerUuid}`);

    peerConnections[peerUuid].pc.setLocalDescription(description).then(function () {
      serverConnection.send(JSON.stringify({ 'sdp': peerConnections[peerUuid].pc.localDescription, 'uuid': localUuid, 'dest': peerUuid }));
    }).catch(errorHandle);
  }

function gotIceCandidate(event, peerUuid) {
    if(event.candidate != null) {
        serverConnection.send(JSON.stringify({ 'ice': event.candidate, 'uuid': localUuid, 'dest': peerUuid }));
    }
}

function gotRemoteStream(event, peerUuid, displayName) {
    const remoteStream = new MediaStream();
    remoteStream.addTrack(event.track, remoteStream);
    const video = document.createElement('video');

    video.setAttribute('autoplay', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('id', displayName);
    video.style.display = 'none';
    video.srcObject = remoteStream;
    console.log(video);
    
    document.body.append(video);
    streams[displayName] = video;

    video.play();

    console.log('got remote stream');
}

function checkPeerDisconnect(event, peerUuid) {
    if(!peerConnections.hasOwnProperty(peerUuid)) {
        removeVideo(peerUuid);
        return;
    }

    var state = peerConnections[peerUuid].pc.iceConnectionState;
    console.log(`connection with peer ${peerUuid} ${state}`);

    if (state === "failed" || state === "closed" || state === "disconnected") {
      delete peerConnections[peerUuid];
      removeVideo(peerUuid);
    }
}

function removeVideo(peerUuid) {
    document.body.removeChild(document.getElementById('' + peerUuid));
}

function createUUID() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
  
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function getStream(displayName) {
    return streams[displayName];
}

function createVideoElement(displayName) {
    if(!checkExistsStream(displayName)) {
        return false;
    }

    return streams[displayName];
}

function checkExistsStream(username) {
    return streams[username] !== undefined;
}

const errorHandle = (error) => {
    console.log("error: " + error);
}

export {
    getStream,
    webrtcStart,
    createVideoElement,

    usernameToUuid,
    localStream
};