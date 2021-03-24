import initShader from './loader/shaders.js';
import GLObject from './objects/GLObject.js';
import { makePyramidEdges } from './objects/Pyramid.js';
import Renderer from './renderer.js';
import { fGenerator, blockGenerator } from './utils/generator.js';
import { cylinderGenerator } from './objects/cylinder.js'
import { orthographic } from './utils/projection.js';

let canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
let gl = canvas.getContext('webgl2');

async function main() {
    if (!gl) {
        alert('Your browser does not support WebGL');
        return;
    }
    let program = await initShader(gl, 'vert.glsl', 'frag.glsl');

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    // Set base orthographic projection matrix
    let left = 0;
    let right = gl.canvas.clientWidth;
    let bottom = gl.canvas.clientHeight;
    let top = 0;
    let near = 400;
    let far = -400;
    let baseProjection = orthographic(left, right, bottom, top, near, far);
    // Declare reusable variables
    let vertices, colors;

    [vertices, colors] = fGenerator();
    const glObject = new GLObject(0, program, gl, gl.TRIANGLES);
    glObject.setBaseProjectionMatrix(baseProjection);
    glObject.setVertexArray(vertices);
    glObject.setColor(colors);
    glObject.setPosition(45, 150, 0);
    glObject.setRotation(40, 25, 325);
    glObject.setScale(1, 1, 1);
    glObject.bind();
    
    [vertices, colors] = blockGenerator(
        50, 50, 50,
        [200, 70, 120],
        [80, 70, 200],
        [255, 0, 0],
        [70, 200, 210],
        [200, 200, 70],
        [160, 160, 220]
    );
    const glObject2 = new GLObject(0, program, gl, gl.TRIANGLES);
    glObject2.setBaseProjectionMatrix(baseProjection);
    glObject2.setVertexArray(vertices);
    glObject2.setColor(colors);
    glObject2.setPosition(300, 200, 0);
    glObject2.setRotation(90, 0, 0);
    glObject2.setScale(1, 1, 1);
    glObject2.bind();
    
    [vertices, colors] = cylinderGenerator(
        100, 100,
        [255, 0, 0],
        [0, 0, 255],
        [0, 255, 0]
    );
    const cylinder = new GLObject(0, program, gl, gl.TRIANGLES);
    cylinder.setBaseProjectionMatrix(baseProjection);
    cylinder.setVertexArray(vertices);
    cylinder.setColor(colors);
    cylinder.setPosition(400, 400, 0);
    cylinder.setRotation(0, 90, 0);
    cylinder.setScale(1, 1, 1);
    cylinder.bind();

    [vertices, colors] = blockGenerator(
        50, 50, 300,
        [200, 70, 120],
        [80, 70, 200],
        [255, 0, 0],
        [70, 200, 210],
        [200, 200, 70],
        [160, 160, 220]
    );
    const cube = new GLObject(0, program, gl, gl.TRIANGLES);
    cube.setBaseProjectionMatrix(baseProjection);
    cube.setVertexArray(vertices);
    cube.setColor(colors);
    cube.setPosition(200, 200, 0);
    cube.setRotation(0, 90, 0);
    cube.setScale(1, 1, 1);
    cube.bind();

    const pyramid = makePyramidEdges(program, gl, baseProjection);
    // renderer.addObject(glObject);
    // renderer.addObject(glObject2);
    // renderer.addObject(cube);
    // renderer.objects.forEach(i => {
        //     console.log(i);
        // })
    const renderer = new Renderer();
    renderer.addObject(glObject);
    renderer.addObject(glObject2);
    renderer.addObject(cylinder);
    renderer.addObject(pyramid);
    function render() {
        gl.clearColor(1, 1, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        // Trying animation
        let x, y, z;
        [x, y, z] = glObject.getRotation();
        glObject.setRotation(x + 1, y, z);
        [x, y, z] = glObject2.getRotation();
        glObject2.setRotation(x + 0.5, y + 1, z + 2);
        [x, y, z] = cylinder.getRotation();
        cylinder.setRotation(x + 0.1, y + 1 , z + 0.5);
        [x, y, z] = cube.getRotation();
        cube.setRotation(x + 0.1, y + 1 , z);
        [x,y,z] = pyramid.getRotation();
        pyramid.setRotation(x+0.5,y+0.5,z+0.5);
        renderer.render();
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();
