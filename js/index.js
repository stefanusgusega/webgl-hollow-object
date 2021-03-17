import initShader from './loader/shaders.js'
import GLObject from './objects/GLObject.js'
import Renderer from './renderer.js'
import { orthographic } from './utils/projection.js'

let canvas = document.getElementById('canvas')
canvas.width = 800
canvas.height = 600
let gl = canvas.getContext('webgl2')

async function main() {
    if (!gl) {
        alert('Your browser does not support WebGL')
        return
    }
    let program = await initShader(gl, 'vert.glsl', 'frag.glsl')
    
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    
    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)
    
    // Set base orthographic projection matrix
    let left = 0
    let right = gl.canvas.clientWidth
    let bottom = gl.canvas.clientHeight
    let top = 0
    let near = 400
    let far = -400
    let baseProjection = orthographic(left, right, bottom, top, near, far)
    
    const glObject = new GLObject(0, program, gl, gl.TRIANGLES)
    glObject.setBaseProjectionMatrix(baseProjection)
    glObject.setVertexArray(vertices)
    glObject.setColor(colors)
    glObject.setPosition(45, 150, 0)
    glObject.setRotation(40, 25, 325)
    glObject.setScale(1, 1, 1)
    glObject.bind()

    const glObject2 = new GLObject(0, program, gl, gl.TRIANGLES)
    glObject2.setBaseProjectionMatrix(baseProjection)
    glObject2.setVertexArray(vertices)
    glObject2.setColor(colors)
    glObject2.setPosition(300, 350, 0)
    glObject2.setRotation(60, 60, 60)
    glObject2.setScale(1, 1, 1)
    glObject2.bind()

    // TODO: VERTICENYA MASIH SALAH HAHAH
    const cube = new GLObject(0, program, gl, gl.TRIANGLES)
    cube.setBaseProjectionMatrix(baseProjection)
    cube.setVertexArray(cubeVertices)
    cube.setColor(cubeColors)
    cube.setPosition(400, 400, 0)
    cube.setRotation(0, 0, 0)
    cube.setScale(1, 1, 1)
    cube.bind()

    const renderer = new Renderer()
    renderer.addObject(glObject)
    renderer.addObject(glObject2)
    renderer.addObject(cube)
    function render() {
        gl.clearColor(1,1,1,1)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
        // Trying animation
        let [x, y, z] = glObject.getRotation()
        glObject.setRotation(x + 1, y, z)
        let [x2, y2, z2] = glObject2.getRotation()
        glObject2.setRotation(x2 + 0.5, y2 + 1, z2 + 2)
        let [x3, y3, z3] = cube.getRotation()
        cube.setRotation(x3+1, y3, z3)
        
        renderer.render()
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}
// CUBE VERTICES AND COLOR EXAMPLE
const cubeVertices = [
    // front side
      0,   0, 0,
      0, 100, 0,
    100,   0, 0,
      0, 100, 0,
    100, 100, 0,
    100,   0, 0,
    // back side
      0,   0, 100,
    100,   0, 100,
      0, 100, 100,
    100,   0, 100,
    100, 100, 100,
      0, 100, 100,
    // upper side
      0, 0,   0,
      0, 0, 100,
    100, 0, 100,
    100, 0,   0,
    // bottom side
      0, 100,   0,
    100, 100,   0,
      0, 100, 100,
    100, 100,   0,
    100, 100, 100,
      0, 100, 100,
    // right side
    100,   0,   0,
    100,   0, 100,
    100, 100,   0,
    100,   0, 100,
    100, 100, 100,
    100, 100,   0,
    // left side
    0,   0,   0,
    0,   0, 100,
    0, 100,   0,
    0,   0, 100,
    0, 100, 100,
    0, 100,   0,
]

const cubeColors = [
    // front side
    200, 70, 120,
    200, 70, 120,
    200, 70, 120,
    200, 70, 120,
    200, 70, 120,
    200, 70, 120,
    // back side
    80, 70, 200,
    80, 70, 200,
    80, 70, 200,
    80, 70, 200,
    80, 70, 200,
    80, 70, 200,
    // upper side
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    // 70, 200, 210,
    // 70, 200, 210,
    // 70, 200, 210,
    // 70, 200, 210,
    // 70, 200, 210,
    // 70, 200, 210,
    // bottom side
    200, 200, 70,
    200, 200, 70,
    200, 200, 70,
    200, 200, 70,
    200, 200, 70,
    200, 200, 70,
    // right side
    140, 210, 80,
    140, 210, 80,
    140, 210, 80,
    140, 210, 80,
    140, 210, 80,
    140, 210, 80,
    // left side
    160, 160, 220,
    160, 160, 220,
    160, 160, 220,
    160, 160, 220,
    160, 160, 220,
    160, 160, 220,
]

// 'F' OBJECT VERTICES AND COLOR EXAMPLES USING gl.TRIANGLES
const vertices = [
    // left column front
    0,   0,  0,
    0, 150,  0,
    30,   0,  0,
    0, 150,  0,
    30, 150,  0,
    30,   0,  0,

    // top rung front
    30,   0,  0,
    30,  30,  0,
    100,   0,  0,
    30,  30,  0,
    100,  30,  0,
    100,   0,  0,

    // middle rung front
    30,  60,  0,
    30,  90,  0,
    67,  60,  0,
    30,  90,  0,
    67,  90,  0,
    67,  60,  0,

    // left column back
      0,   0,  30,
     30,   0,  30,
      0, 150,  30,
      0, 150,  30,
     30,   0,  30,
     30, 150,  30,

    // top rung back
     30,   0,  30,
    100,   0,  30,
     30,  30,  30,
     30,  30,  30,
    100,   0,  30,
    100,  30,  30,

    // middle rung back
     30,  60,  30,
     67,  60,  30,
     30,  90,  30,
     30,  90,  30,
     67,  60,  30,
     67,  90,  30,

    // top
      0,   0,   0,
    100,   0,   0,
    100,   0,  30,
      0,   0,   0,
    100,   0,  30,
      0,   0,  30,

    // top rung right
    100,   0,   0,
    100,  30,   0,
    100,  30,  30,
    100,   0,   0,
    100,  30,  30,
    100,   0,  30,

    // under top rung
    30,   30,   0,
    30,   30,  30,
    100,  30,  30,
    30,   30,   0,
    100,  30,  30,
    100,  30,   0,

    // between top rung and middle
    30,   30,   0,
    30,   60,  30,
    30,   30,  30,
    30,   30,   0,
    30,   60,   0,
    30,   60,  30,

    // top of middle rung
    30,   60,   0,
    67,   60,  30,
    30,   60,  30,
    30,   60,   0,
    67,   60,   0,
    67,   60,  30,

    // right of middle rung
    67,   60,   0,
    67,   90,  30,
    67,   60,  30,
    67,   60,   0,
    67,   90,   0,
    67,   90,  30,

    // bottom of middle rung.
    30,   90,   0,
    30,   90,  30,
    67,   90,  30,
    30,   90,   0,
    67,   90,  30,
    67,   90,   0,

    // right of bottom
    30,   90,   0,
    30,  150,  30,
    30,   90,  30,
    30,   90,   0,
    30,  150,   0,
    30,  150,  30,

    // bottom
    0,   150,   0,
    0,   150,  30,
    30,  150,  30,
    0,   150,   0,
    30,  150,  30,
    30,  150,   0,

    // left side
    0,   0,   0,
    0,   0,  30,
    0, 150,  30,
    0,   0,   0,
    0, 150,  30,
    0, 150, 0
]

const colors = [
    // left column front
    200,  70, 120,
    200,  70, 120,
    200,  70, 120,
    200,  70, 120,
    200,  70, 120,
    200,  70, 120,

    // top rung front
    200,  70, 120,
    200,  70, 120,
    200,  70, 120,
    200,  70, 120,
    200,  70, 120,
    200,  70, 120,

    // middle rung front
    200,  70, 120,
    200,  70, 120,
    200,  70, 120,
    200,  70, 120,
    200,  70, 120,
    200,  70, 120,

    // left column back
    80, 70, 200,
    80, 70, 200,
    80, 70, 200,
    80, 70, 200,
    80, 70, 200,
    80, 70, 200,

    // top rung back
    80, 70, 200,
    80, 70, 200,
    80, 70, 200,
    80, 70, 200,
    80, 70, 200,
    80, 70, 200,

    // middle rung back
    80, 70, 200,
    80, 70, 200,
    80, 70, 200,
    80, 70, 200,
    80, 70, 200,
    80, 70, 200,

    // top
    70, 200, 210,
    70, 200, 210,
    70, 200, 210,
    70, 200, 210,
    70, 200, 210,
    70, 200, 210,

    // top rung right
    200, 200, 70,
    200, 200, 70,
    200, 200, 70,
    200, 200, 70,
    200, 200, 70,
    200, 200, 70,

    // under top rung
    210, 100, 70,
    210, 100, 70,
    210, 100, 70,
    210, 100, 70,
    210, 100, 70,
    210, 100, 70,

    // between top rung and middle
    210, 160, 70,
    210, 160, 70,
    210, 160, 70,
    210, 160, 70,
    210, 160, 70,
    210, 160, 70,

    // top of middle rung
    70, 180, 210,
    70, 180, 210,
    70, 180, 210,
    70, 180, 210,
    70, 180, 210,
    70, 180, 210,

    // right of middle rung
    100, 70, 210,
    100, 70, 210,
    100, 70, 210,
    100, 70, 210,
    100, 70, 210,
    100, 70, 210,

    // bottom of middle rung.
    76, 210, 100,
    76, 210, 100,
    76, 210, 100,
    76, 210, 100,
    76, 210, 100,
    76, 210, 100,

    // right of bottom
    140, 210, 80,
    140, 210, 80,
    140, 210, 80,
    140, 210, 80,
    140, 210, 80,
    140, 210, 80,

    // bottom
    90, 130, 110,
    90, 130, 110,
    90, 130, 110,
    90, 130, 110,
    90, 130, 110,
    90, 130, 110,

    // left side
    160, 160, 220,
    160, 160, 220,
    160, 160, 220,
    160, 160, 220,
    160, 160, 220,
    160, 160, 220
]

main()