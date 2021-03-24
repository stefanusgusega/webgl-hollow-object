import initShader from './loader/shaders.js';
import GLObject from './objects/GLObject.js';
import { cubeGenerator } from './objects/Cube.js';
import { makePyramidEdges } from './objects/Pyramid.js';
import Renderer from './renderer.js';
import { cylinderGenerator } from './objects/cylinder.js'
import { orthographic, perspective, oblique, CABINET_PROJECTION_ANGLE } from './utils/projection.js';

let canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
let gl = canvas.getContext('webgl2');


/* Setting max translation of each x, y, z */
document.getElementById('transX').max = canvas.width;
document.getElementById('transY').max = canvas.height;
document.getElementById('transZ').max = (canvas.width + canvas.height) / 2;
document.getElementById('camTransX').max = canvas.width;
document.getElementById('camTransY').max = canvas.height;
document.getElementById('camTransZ').max = 2000;

var resetCameraButton = document.getElementById("reset");

var camTransXSlider = document.getElementById("camTransX");
var camTransXVal = document.getElementById("camTransXVal");
camTransXVal.innerHTML = camTransXSlider.value;

camTransXSlider.oninput = function() {
    camTransXVal.innerHTML = this.value;
}

var camTransYSlider = document.getElementById("camTransY");
var camTransYVal = document.getElementById("camTransYVal");
camTransYVal.innerHTML = camTransYSlider.value;

camTransYSlider.oninput = function() {
    camTransYVal.innerHTML = this.value;
}

var camTransZSlider = document.getElementById("camTransZ");
var camTransZVal = document.getElementById("camTransZVal");
camTransZVal.innerHTML = camTransZSlider.value;

camTransZSlider.oninput = function() {
    camTransZVal.innerHTML = this.value;
}

var camRotXSlider = document.getElementById("camRotX");
var camRotXVal = document.getElementById("camRotXVal");
camRotXVal.innerHTML = camRotXSlider.value;

camRotXSlider.oninput = function() {
    camRotXVal.innerHTML = this.value;
}

var camRotYSlider = document.getElementById("camRotY");
var camRotYVal = document.getElementById("camRotYVal");
camRotYVal.innerHTML = camRotYSlider.value;

camRotYSlider.oninput = function() {
    camRotYVal.innerHTML = this.value;
}

var camRotZSlider = document.getElementById("camRotZ");
var camRotZVal = document.getElementById("camRotZVal");
camRotZVal.innerHTML = camRotZSlider.value;

camRotZSlider.oninput = function() {
    camRotZVal.innerHTML = this.value;
}
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
        let near = 800;
        let far = -800;
        baseProjection = orthographic(left, right, bottom, top, near, far);
    }
    else if (proj.value === '1') {
        // set base perspective matrix
        function deg2rad(degrees) {
            return degrees * Math.PI / 180
        }
        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        var zNear = 1;
        var zFar = 5000;
        baseProjection = perspective(deg2rad(fov), aspect, zNear, zFar);
    }
    else if (proj.value === '2') {
        // Set base orthographic projection matrix
        let left = 0;
        let right = gl.canvas.clientWidth;
        let bottom = gl.canvas.clientHeight;
        let top = 0;
        let near = 800;
        let far = -800;
        baseProjection = oblique(left, right, bottom, top, near, far, CABINET_PROJECTION_ANGLE);
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
    
    console.log(renderer.objects);
    // default view
    var arrObjDef = [];
    var cubeDef = cube;
    var pyramidDef = pyramid;
    var cylinderDef = cylinder;
    arrObjDef.push(cubeDef);
    arrObjDef.push(pyramidDef);
    arrObjDef.push(cylinderDef);

    const defaultView = () => {
      renderer.removeObject(0);
      renderer.removeObject(1);
      renderer.removeObject(2);
      renderer.addObject(cube);
      renderer.addObject(pyramid);
      renderer.addObject(cylinder);
      console.log(renderer.objects);
    }


    /* Adding option to object option based on the object defined */
    var select = document.getElementById('object');
    renderer.objects.forEach(i => {
        var opt = document.createElement('option');
        opt.text = i.name;
        opt.value = i.id;
        select.add(opt);
    })

    // save
    const save = (el) => {
      let str = "";
      let arr = [];
      renderer.objects.forEach(obj => {
        arr.push(obj.toSaveData());
      });
      str = JSON.stringify(arr);
      var data="text/json;charset=utf-8,"+encodeURIComponent(str);
      el.setAttribute("href", "data:"+data);
      el.setAttribute("download","data.json");

    }

    

    const load = (data) => {
      let x,y,z;
      data.forEach(obj => {
        if (obj.name === 'cube') {
          const cube = new GLObject(0, 'cube', program, gl, gl.TRIANGLES);
          [vertices, colors] = cubeGenerator();
          cube.setBaseProjectionMatrix(obj.projMatrix);
          cube.setVertexArray(vertices);
          cube.setColor(obj.color);
          [x, y, z] = obj.position;
          cube.setPosition(x,y,z);
          [x, y, z] = obj.rot;
          cube.setRotation(x, y, z);
          [x, y, z] = obj.scale;
          cube.setScale(x, y, z);
          cube.bind();
          renderer.removeObject(0);
          renderer.addObject(cube);
        }
        else if (obj.name === 'pyramid') {
          const pyramid = makePyramidEdges(1, program, gl, obj.projMatrix);
          pyramid.setColor(obj.color);
          [x, y, z] = obj.position;
          pyramid.setPosition(x,y,z);
          [x, y, z] = obj.rot;
          pyramid.setRotation(x, y, z);
          [x, y, z] = obj.scale;
          pyramid.setScale(x, y, z);
          // pyramid.bind();
          renderer.removeObject(1);
          renderer.addObject(pyramid);
        }
        else if (obj.name === 'cylinder') {
          const cylinder = new GLObject(2, 'cylinder', program, gl, gl.TRIANGLES);
          [vertices, colors] = cylinderGenerator(
            75, 75,
            [255, 0, 0],
            [0, 0, 255],
            [0, 255, 0]
          );
          cylinder.setBaseProjectionMatrix(obj.projMatrix);
          cylinder.setVertexArray(vertices);
          cylinder.setColor(obj.color);
          [x, y, z] = obj.position;
          cylinder.setPosition(x,y,z);
          [x, y, z] = obj.rot;
          cylinder.setRotation(x, y, z);
          [x, y, z] = obj.scale;
          cylinder.setScale(x, y, z);
          cylinder.bind();
          renderer.removeObject(2);
          renderer.addObject(cylinder);
        }
      })
    }

    const loadBtn = document.getElementById("loadBtn")
    const fileSelector = document.getElementById("fileSelect")
    const resetBtn = document.getElementById('resetBtn');
    var saveBtn = document.getElementById('saveBtn');
    // EVENT CALLBACKS
    resetBtn.onclick = () => {
      defaultView();
    }
    saveBtn.onclick = () => {
      save(saveBtn);
    }
    loadBtn.onclick = () => {
      var files = fileSelector.files;
      var fr = new FileReader();
      fr.readAsText(files.item(0));
      fr.onload = (e) => {
          var res = JSON.parse(e.target.result);
          console.log(res);
          load(res);
      }
    }
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
            let near = 800;
            let far = -800;
            baseProjection = orthographic(left, right, bottom, top, near, far);
            resetCameraView()
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
            var zFar = 5000;
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
            let near = 800;
            let far = -800;
            baseProjection = oblique(left, right, bottom, top, near, far, CABINET_PROJECTION_ANGLE);
            resetCameraView()
        }
        renderer.changeProjection(baseProjection);
    }
    const resetCameraView = () => {
        renderer.setCameraAngle(0, 0, 0);
        renderer.setCameraPosition(0, 0, 200);
        // update trans slider
        camTransXSlider.value = 0;
        camTransXVal.innerHTML = camTransXSlider.value;
        camTransYSlider.value = 0;
        camTransYVal.innerHTML = camTransYSlider.value;
        camTransZSlider.value = 200;
        camTransZVal.innerHTML = camTransZSlider.value;
        // update rot slider
        camRotXSlider.value = 0;
        camRotXVal.innerHTML = camRotXSlider.value;
        camRotYSlider.value = 0;
        camRotYVal.innerHTML = camRotYSlider.value;
        camRotZSlider.value = 0;
        camRotZVal.innerHTML = camRotZSlider.value;
    }
    const updateCam = changeType => {
        if (changeType == 'camTransX' || changeType == 'camTransY' || changeType == 'camTransZ') {
            let x = camTransXSlider.value;
            let y = camTransYSlider.value;
            let z = camTransZSlider.value;
            renderer.setCameraPosition(x, y, z);
        } else if (changeType == 'camRotX' || changeType == 'camRotY' || changeType == 'camRotZ') {
            let x = camRotXSlider.value;
            let y = camRotYSlider.value;
            let z = camRotZSlider.value;
            renderer.setCameraAngle(x, y, z);
        }
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

    resetCameraButton.addEventListener('click', (e) => {
        resetCameraView()
    })
    camTransXSlider.addEventListener('input', (e) => {
        updateCam(e.target.id)
    })
    camTransYSlider.addEventListener('input', (e) => {
        updateCam(e.target.id)
    })
    camTransZSlider.addEventListener('input', (e) => {
        updateCam(e.target.id)
    })
    camRotXSlider.addEventListener('input', (e) => {
        updateCam(e.target.id)
    })
    camRotYSlider.addEventListener('input', (e) => {
        updateCam(e.target.id)
    })
    camRotZSlider.addEventListener('input', (e) => {
        updateCam(e.target.id)
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

        // let [tx, ty, tz] = renderer.getCameraPosition()
        // renderer.setCameraPosition(tx, ty, tz+1)
        // let [x, y, z] = renderer.getCameraAngle()
        // renderer.setCameraAngle(x, y+1, z)
        
        renderer.render();
        
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();