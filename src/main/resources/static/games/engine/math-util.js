let distanceOnGround = (pos, blocks) => {
    let distance = 1000000000;
    for(let i = 0; i < blocks.length; i++) {
        let blockPos = blocks[i].position;
        let calc = Math.sqrt(
            Math.pow(pos.x - blockPos.x, 2) + Math.pow(pos.y - blockPos.y, 2) + Math.pow(pos.z - blockPos.z, 2)
        );
        distance = Math.min(distance, calc);
    }

    return distance;
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

let makeMatrixOf3D = ( sizeX, sizeY, sizeZ ) => {
    let arr3D = new Array(sizeX);
    
    for(let x = 0; x < sizeX; x++) {
        arr3D[x] = new Array(100);

        for(let y = 0; y < 100; y++) {
            arr3D[x][y] = new Array(sizeZ);
        } 
    }

    return arr3D;
}

let _getBorderPos = (pos, range) => {
    return {
        minX: pos.x - range,
        maxX: pos.x + range,
        minY: pos.y - range,
        maxY: pos.y + range,
        minZ: pos.z - range,
        maxZ: pos.z + range
    };
}

// pos1, pos2의 충돌여부 검사
let aabbCollesion = (pos1, pos2) => {
    let conversionPos1 = _getBorderPos(pos1, 0.5);
    let conversionPos2 = _getBorderPos(pos2, 0.5);

    if(conversionPos1.maxX >= conversionPos2.minX &&
        conversionPos1.minX <= conversionPos2.maxX &&
        conversionPos1.maxY >= conversionPos2.minY &&
        conversionPos1.minY <= conversionPos2.maxY &&
        conversionPos1.maxZ >= conversionPos2.minZ &&
        conversionPos1.minZ <= conversionPos2.maxZ) {
            return true;
    }

    return false;
}

let collesion = (pos, blocks) => {
    for(let i = 0; i < blocks.length; i++) {
        let collesion = aabbCollesion(pos, blocks[i].position);

        if(collesion) {
            return true;
        }
    }

    return false;
}

export {
    distanceOnGround,
    makeMatrixOf3D,
    clamp,
    aabbCollesion,
    collesion
};