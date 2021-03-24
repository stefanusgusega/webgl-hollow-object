import { mmult, inverse, lookAt } from './utils/matrix.js'

class Renderer {
    constructor() {
        this.objects = []
        this.count
        this.cameraAngle = [0, 0, 0]
        this.cameraPosition = [0, 0, 200]
        this.cameraMat = this.computeCamera()
    }

    addObject(obj) {
        this.objects.push(obj)
        this.count++
    }

    removeObject(id) {
        const idx = this.objects.findIndex(obj => obj.id === id)
        this.objects.splice(idx, 1)
        this.count--
    }

    changeProjection(projectionMat) {
        for (const obj of this.objects) {
            obj.setBaseProjectionMatrix(projectionMat);
        }
    }

    setCameraAngle(xDegree, yDegree, zDegree) {
        this.cameraAngle = [xDegree, yDegree, zDegree]
        this.cameraMat = this.computeCamera()
    }
    getCameraAngle() {
        return this.cameraAngle
    }

    setCameraPosition(xPos, yPos, zPos) {
        this.cameraPosition = [xPos, yPos, zPos]
        this.cameraMat = this.computeCamera()
    }
    getCameraPosition() {
        return this.cameraPosition
    }

    computeCamera() {
        // Get translation matrix
        // camera always look at the origin
        const [tx, ty, tz] = this.cameraPosition;
        const translateMat = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            tx, ty, tz, 1,
        ]
        // Get rotation matrix
        function deg2rad(degrees) {
            return degrees * Math.PI / 180
        }
        const [rx, ry, rz] = this.cameraAngle;
        const sx = Math.sin(deg2rad(rx))
        const cx = Math.cos(deg2rad(rx))
        const xRotationMat = [
            1,  0,   0, 0,
            0,  cx, sx, 0,
            0, -sx, cx, 0,
            0,   0,  0, 1,
        ]
        const sy = Math.sin(deg2rad(ry))
        const cy = Math.cos(deg2rad(ry))
        const yRotationMat = [
            cy, 0, -sy, 0,
             0, 1,   0, 0,
            sy, 0,  cy, 0,
             0, 0,   0, 1,
        ]
        const sz = Math.sin(deg2rad(rz))
        const cz = Math.cos(deg2rad(rz))
        const zRotationMat = [
             cz, sz, 0, 0,
            -sz, cz, 0, 0,
              0,  0, 1, 0,
              0,  0, 0, 1,
        ]
        const rotationMat = mmult(mmult(zRotationMat, yRotationMat), xRotationMat)
        const cameraMat = mmult(translateMat, rotationMat)
        return cameraMat
    }

    render() {
        let targetPosition = [0, 0, 0]
        let cameraPosition = [
            this.cameraMat[12],
            this.cameraMat[13],
            this.cameraMat[14],
        ]
        let up = [0, 1, 0]
        let cameraMat = lookAt(cameraPosition, targetPosition, up)
        let viewMat = inverse(cameraMat)
        for (const obj of this.objects) {
            obj.setViewProjectionMat(viewMat)
            obj.draw()
        }
    }
}

export default Renderer