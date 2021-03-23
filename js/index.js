import initShader from './loader/shaders.js';
import GLObject from './objects/GLObject.js';
import { makePyramidEdges } from './objects/Pyramid.js';
import Renderer from './renderer.js';
import { fGenerator, blockGenerator } from './utils/generator.js';
import { orthographic } from './utils/projection.js';

let canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
let gl = canvas.getContext('webgl2');
var objId = 0;


/* Setting max translation of each x, y, z */
document.getElementById('transX').max = canvas.width;
document.getElementById('transY').max = canvas.height;
document.getElementById('transZ').max = (canvas.width + canvas.height)/2;

/* For translation X */
var transXSlider = document.getElementById("transX");
var transXVal = document.getElementById("transXVal");
transXVal.innerHTML = transXSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
transXSlider.oninput = function() {
  transXVal.innerHTML = this.value;
}

/* For translation Y */
var transYSlider = document.getElementById("transY");
var transYVal = document.getElementById("transYVal");
transYVal.innerHTML = transYSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
transYSlider.oninput = function() {
  transYVal.innerHTML = this.value;
}

/* For translation Z */
var transZSlider = document.getElementById("transZ");
var transZVal = document.getElementById("transZVal");
transZVal.innerHTML = transZSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
transZSlider.oninput = function() {
  transZVal.innerHTML = this.value;
}

/* For rotation X */
var rotXSlider = document.getElementById("rotX");
var rotXVal = document.getElementById("rotXVal");
rotXVal.innerHTML = rotXSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
rotXSlider.oninput = function() {
  rotXVal.innerHTML = this.value;
}

/* For rotation Y */
var rotYSlider = document.getElementById("rotY");
var rotYVal = document.getElementById("rotYVal");
rotYVal.innerHTML = rotYSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
rotYSlider.oninput = function() {
  rotYVal.innerHTML = this.value;
}

/* For rotation Z */
var rotZSlider = document.getElementById("rotZ");
var rotZVal = document.getElementById("rotZVal");
rotZVal.innerHTML = rotZSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
rotZSlider.oninput = function() {
  rotZVal.innerHTML = this.value;
}

/* For scaling X */
var scaXSlider = document.getElementById("scaX");
var scaXVal = document.getElementById("scaXVal");
scaXVal.innerHTML = scaXSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
scaXSlider.oninput = function() {
  scaXVal.innerHTML = this.value;
}

/* For scaling Y */
var scaYSlider = document.getElementById("scaY");
var scaYVal = document.getElementById("scaYVal");
scaYVal.innerHTML = scaYSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
scaYSlider.oninput = function() {
  scaYVal.innerHTML = this.value;
}

/* For sacling Z */
var scaZSlider = document.getElementById("scaZ");
var scaZVal = document.getElementById("scaZVal");
scaZVal.innerHTML = scaZSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
scaZSlider.oninput = function() {
  scaZVal.innerHTML = this.value;
}

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

    const renderer = new Renderer();
    const pyramid = makePyramidEdges(objId++, program, gl, baseProjection);
    const pyramid2 = makePyramidEdges(objId++, program, gl, baseProjection);
    // renderer.addObject(glObject);
    // renderer.addObject(glObject2);
    // renderer.addObject(cube);
    renderer.addObject(pyramid);
    renderer.addObject(pyramid2);
    renderer.objects.forEach(i => {
        console.log(i);
    })

    /* Adding option to object option based on the object defined */
    var select = document.getElementById('object');
    renderer.objects.forEach(i => {
        var opt = document.createElement('option');
        opt.text = i.id;
        opt.value = i.id;
        select.add(opt);
    }) 

    
    var diffXTrans, diffYTrans, diffZTrans,
    diffXRot, diffYRot, diffZRot,
    diffXSca, diffYSca, diffZSca
    var object = renderer.objects[1];
    let xTrans,yTrans,zTrans,
    xRot, yRot, zRot,
    xScale, yScale, zScale;
    [xTrans, yTrans, zTrans] = object.getPosition();
    [xRot, yRot, zRot] = object.getRotation();
    [xScale, yScale, zScale] = object.getScale();
    object.setPosition(parseFloat(transXSlider.value), parseFloat(transYSlider.value), parseFloat(transZSlider.value));
    object.setRotation(parseFloat(rotXSlider.value), parseFloat(rotYSlider.value), parseFloat(rotZSlider.value));
    object.setScale(parseFloat(scaXSlider.value), parseFloat(scaYSlider.value), parseFloat(scaZSlider.value));
    function render() {
        /* Get the input from option select */
        var selectedObjId = parseInt(select.value);
        let obj = renderer.objects[selectedObjId];
        // console.log(selectedObj);
        gl.clearColor(1, 1, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        // Trying animation
        // let x, y, z;
        // [x, y, z] = glObject.getRotation();
        // glObject.setRotation(x + 1, y, z);
        // [x, y, z] = glObject2.getRotation();
        // glObject2.setRotation(x, y + 1 , z );
        // [x, y, z] = cube.getRotation();
        // cube.setRotation(x + 0.1, y + 1 , z);
        // [x,y,z] = pyramid.getRotation();
        // pyramid.setRotation(x+0.5,y+0.5,z+0.5);
        
        obj.setPosition(parseFloat(transXSlider.value), parseFloat(transYSlider.value), parseFloat(transZSlider.value));
        obj.setRotation(parseFloat(rotXSlider.value), parseFloat(rotYSlider.value), parseFloat(rotZSlider.value));
        obj.setScale(parseFloat(scaXSlider.value), parseFloat(scaYSlider.value), parseFloat(scaZSlider.value));
        
        renderer.render();
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();
