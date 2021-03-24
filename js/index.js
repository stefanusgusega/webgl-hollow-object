import initShader from './loader/shaders.js';
import GLObject from './objects/GLObject.js';
import { cubeGenerator } from './objects/Cube.js';
import { makePyramidEdges } from './objects/Pyramid.js';
import Renderer from './renderer.js';
import { cylinderGenerator } from './objects/cylinder.js'
import { oblique, orthographic, perspective, CABINET_PROJECTION_ANGLE } from './utils/projection.js';

let canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
let gl = canvas.getContext('webgl2');


/* Setting max translation of each x, y, z */
document.getElementById('transX').max = canvas.width;
document.getElementById('transY').max = canvas.height;
document.getElementById('transZ').max = (canvas.width + canvas.height) / 2;

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

    /* Projection */
    var proj = document.getElementById('proj');
    /* For fov*/
    var fovSlider = document.getElementById("fov");
    var fovVal = document.getElementById("fovVal");
    fovVal.innerHTML = fovSlider.value; // Display the default slider value
    
    // Update the current slider value (each time you drag the slider handle)
    fovSlider.oninput = function() {
      fovVal.innerHTML = this.value;
    }
    
    var fov = parseInt(fovSlider.value);
    let baseProjection;
    if (proj.value === '0') {
        // Set base orthographic projection matrix
        let left = 0;
        let right = gl.canvas.clientWidth;
        let bottom = gl.canvas.clientHeight;
        let top = 0;
        let near = 400;
        let far = -400;
        baseProjection = orthographic(left, right, bottom, top, near, far);
    }
    else if (proj.value === '1') {
        // set base perspective matrix
        function deg2rad(degrees) {
            return degrees * Math.PI / 180
        }
        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        var zNear = 1;
        var zFar = 2000;
        baseProjection = perspective(deg2rad(fov), aspect, zNear, zFar);
    }
    else if (proj.value === '2') {
        // Set base orthographic projection matrix
        let left = 0;
        let right = gl.canvas.clientWidth;
        let bottom = gl.canvas.clientHeight;
        let top = 0;
        let near = 400;
        let far = -400;
        baseProjection = orthographic(left, right, bottom, top, near, far);
    }
    
    
    // Declare reusable variables
    let vertices, colors;

    [vertices, colors] = cylinderGenerator(
        75, 75,
        [255, 0, 0],
        [0, 0, 255],
        [0, 255, 0]
    );
    const cylinder = new GLObject(2, 'cylinder', program, gl, gl.TRIANGLES);
    cylinder.setBaseProjectionMatrix(baseProjection);
    cylinder.setVertexArray(vertices);
    cylinder.setColor(colors);
    cylinder.setPosition(50, 50, 0);
    cylinder.setRotation(60, 60, 0);
    cylinder.setScale(1, 1, 1);
    cylinder.bind();

    [vertices, colors] = cubeGenerator();
    const cube = new GLObject(0, 'cube', program, gl, gl.TRIANGLES);
    cube.setBaseProjectionMatrix(baseProjection);
    cube.setVertexArray(vertices);
    cube.setColor(colors);
    cube.setPosition(45, 150, 0);
    cube.setRotation(40, 25, 325);
    cube.setScale(1, 1, 1);
    cube.bind();

    const pyramid = makePyramidEdges(1, program, gl, baseProjection);
    
    const renderer = new Renderer();
    renderer.addObject(cube);
    renderer.addObject(pyramid);
    renderer.addObject(cylinder);

    /* Adding option to object option based on the object defined */
    var select = document.getElementById('object');
    renderer.objects.forEach(i => {
        var opt = document.createElement('option');
        opt.text = i.name;
        opt.value = i.id;
        select.add(opt);
    })

    // EVENT CALLBACKS
    const updateSlider = (id) => {
        let obj = renderer.objects[id]

        let tempXTrans, tempYTrans, tempZTrans,
            tempXRot, tempYRot, tempZRot,
            tempXScale, tempYScale, tempZScale;
        [tempXTrans, tempYTrans, tempZTrans] = obj.getPosition();
        [tempXRot, tempYRot, tempZRot] = obj.getRotation();
        [tempXScale, tempYScale, tempZScale] = obj.getScale();
        // update trans slider
        transXSlider.value = tempXTrans;
        transXVal.innerHTML = transXSlider.value;
        transYSlider.value = tempYTrans;
        transYVal.innerHTML = transYSlider.value;
        transZSlider.value = tempZTrans;
        transZVal.innerHTML = transZSlider.value;
        // update rot slider
        rotXSlider.value = tempXRot;
        rotXVal.innerHTML = rotXSlider.value;
        rotYSlider.value = tempYRot;
        rotYVal.innerHTML = rotYSlider.value;
        rotZSlider.value = tempZRot;
        rotZVal.innerHTML = rotZSlider.value;
        // update scale slider
        scaXSlider.value = tempXScale;
        scaXVal.innerHTML = scaXSlider.value;
        scaYSlider.value = tempYScale;
        scaYVal.innerHTML = scaYSlider.value;
        scaZSlider.value = tempZScale;
        scaZVal.innerHTML = scaZSlider.value;
    }
    const updateObj = changeType => {
        let id = select.value;
        if (changeType == 'transX' || changeType == 'transY' || changeType == 'transZ') {
            let x = transXSlider.value;
            let y = transYSlider.value;
            let z = transZSlider.value;
            let obj = renderer.objects[id];
            obj.setPosition(x, y, z);
        } else if (changeType == 'rotX' || changeType == 'rotY' || changeType == 'rotZ') {
            let x = rotXSlider.value;
            let y = rotYSlider.value;
            let z = rotZSlider.value;
            let obj = renderer.objects[id];
            obj.setRotation(x, y, z);
        } else if (changeType == 'scaX' || changeType == 'scaY' || changeType == 'scaZ') {
            let x = scaXSlider.value;
            let y = scaYSlider.value;
            let z = scaZSlider.value;
            let obj = renderer.objects[id];
            obj.setScale(x, y, z);
        }
    }
    const updateProjection = val => {
        var fov = parseInt(fovSlider.value);
        let baseProjection;
        if (val === '0') {
            // Set base orthographic projection matrix
            let left = 0;
            let right = gl.canvas.clientWidth;
            let bottom = gl.canvas.clientHeight;
            let top = 0;
            let near = 400;
            let far = -400;
            baseProjection = orthographic(left, right, bottom, top, near, far);
            renderer.objects.forEach(obj => {
                let [x, y, z] = obj.getPosition();
                if (z < -100) {
                    obj.setPosition(x, y, 0);
                    updateSlider(obj.id);
                }
            })
        }
        else if (val === '1') {
            // set base perspective matrix
            function deg2rad(degrees) {
                return degrees * Math.PI / 180
            }
            var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
            var zNear = 1;
            var zFar = 2000;
            baseProjection = perspective(deg2rad(fov), aspect, zNear, zFar);
            renderer.objects.forEach(obj => {
                let [x, y, z] = obj.getPosition();
                if (z > -100) {
                    obj.setPosition(x, y, -600);
                    updateSlider(obj.id);
                }
            })
        }
        else if (val === '2') {
            // Set base orthographic projection matrix
            let left = 0;
            let right = gl.canvas.clientWidth;
            let bottom = gl.canvas.clientHeight;
            let top = 0;
            let near = 400;
            let far = -400;
            baseProjection = oblique(left, right, bottom, top, near, far, CABINET_PROJECTION_ANGLE);
        }
        console.log(fovSlider.value)
        console.log(baseProjection)
        renderer.changeProjection(baseProjection);
    }
    // EVENT LISTENERS
    select.addEventListener('change', (e) => {
        updateSlider(e.target.value)
    })
    proj.addEventListener('change', (e) => {
        updateProjection(e.target.value)
    })
    fovSlider.addEventListener('input', (e) => {
        updateProjection(proj.value)
    })
    transXSlider.addEventListener('input', (e) => {
        updateObj(e.target.id)
    })
    transYSlider.addEventListener('input', (e) => {
        updateObj(e.target.id)
    })
    transZSlider.addEventListener('input', (e) => {
        updateObj(e.target.id)
    })
    rotXSlider.addEventListener('input', (e) => {
        updateObj(e.target.id)
    })
    rotYSlider.addEventListener('input', (e) => {
        updateObj(e.target.id)
    })
    rotZSlider.addEventListener('input', (e) => {
        updateObj(e.target.id)
    })
    scaXSlider.addEventListener('input', (e) => {
        updateObj(e.target.id)
    })
    scaYSlider.addEventListener('input', (e) => {
        updateObj(e.target.id)
    })
    scaZSlider.addEventListener('input', (e) => {
        updateObj(e.target.id)
    })

    //update initial value
    updateSlider(select.value)
    

    function render() {
        gl.clearColor(1, 1, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        
        renderer.render();
        
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();