import { mmult } from '../utils/matrix.js'

class GLObject {
    constructor(id, name, shader, gl, primitiveType) {
        this.id = id
        this.name = name
        this.shader = shader
        this.gl = gl
        this.primitiveType = primitiveType
    }

    setVertexArray(va, offset, nPoints) {
        this.va = va
        this.offset = offset || 0
        this.n = nPoints || this.va.length / 3
        this.projectionMat = this.getProjectionMatrix()
    }
    getVertexArray() {
        return this.va
    }

    setPosition(x, y, z) {
        this.pos = [x, y, z]
        this.projectionMat = this.getProjectionMatrix()
    }
    getPosition() {
        return this.pos
    }

    setRotation(xDegree, yDegree, zDegree) {
        this.rot = [xDegree, yDegree, zDegree]
        this.projectionMat = this.getProjectionMatrix()
    }
    getRotation() {
        return this.rot
    }

    setScale(x, y, z) {
        this.scale = [x, y, z]
        this.projectionMat = this.getProjectionMatrix()
    }
    getScale() {
        return this.scale
    }

    setBaseProjectionMatrix(baseProjMat) {
        this.base = baseProjMat
        this.projectionMat = this.getProjectionMatrix()
    }

    setColor(ca) {
        this.ca = ca
    }
    getColor() {
        this.ca
    }

    setIndices(indices) {
        this.indices = indices
    }

    getProjectionMatrix() {
        if (this.base === undefined || this.pos === undefined || this.rot === undefined || this.scale === undefined) return null
        // Get translation matrix
        const [tx, ty, tz] = this.pos
        const translateMat = [
            1,  0,  0,  0,
            0,  1,  0,  0,
            0,  0,  1,  0,
            tx, ty, tz, 1,
        ]
        // Get rotation matrix
        function deg2rad(degrees) {
            return degrees * Math.PI / 180
        }
        const [rx, ry, rz] = this.rot;
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
        // get scale matrix
        const [k1, k2, k3] = this.scale
        const scaleMat = [
            k1, 0,  0,  0,
            0, k2,  0,  0,
            0,  0, k3,  0,
            0,  0,  0,  1,
        ]
        const projectionMat = mmult(mmult(mmult(rotationMat, scaleMat), translateMat), this.base)
        return projectionMat
    }

    bind() {
        const gl = this.gl
        // Bind position buffer
        this.positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.va), gl.STATIC_DRAW)
        // Bind color buffer
        this.colorBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(this.ca), gl.STATIC_DRAW)
        if (this.indices) {
            this.indexBuffer = gl.createBuffer()
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW)
        }
    }

    draw() {
        const gl = this.gl
        gl.useProgram(this.shader)
        // Get locations
        let positionLocation = gl.getAttribLocation(this.shader, "a_position")
        let colorLocation = gl.getAttribLocation(this.shader, "a_color")
        let matrixLocation = gl.getUniformLocation(this.shader, "u_matrix")
        // Set position
        gl.enableVertexAttribArray(positionLocation)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer)
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0)
        // Set color
        gl.enableVertexAttribArray(colorLocation)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer)
        gl.vertexAttribPointer(colorLocation, 3, gl.UNSIGNED_BYTE, true, 0, 0)
        // Set projection matrix
        gl.uniformMatrix4fv(matrixLocation, false, this.projectionMat)
        // Draw
        if (this.indices) {
            gl.drawElements(this.primitiveType, this.n, gl.UNSIGNED_SHORT, this.offset)   
        } else {
            gl.drawArrays(this.primitiveType, this.offset, this.n)
        }
    }
}

export default GLObject