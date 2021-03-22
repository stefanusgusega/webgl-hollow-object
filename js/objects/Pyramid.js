import { blockGenerator, _generateColors } from "../utils/generator.js";
import GLObject from "./GLObject.js";

export function randomInt() {
    var raw = Math.random();
    return Math.floor(raw*256);
}

export const pyramidGenerator = (back, right, front, left,
     bottom, top,
     backInner, rightInner, frontInner, leftInner, 
     stand) => {
    // const t = 10;
    // const longerEdge = 100;
    // const normalEdge =
    const vertices = [
        // back side of base block
        // clock
        0, 0, 0,
        0, 30, 0,
        100, 0, 0,
        0, 30, 0,
        100, 30, 0,
        100, 0, 0,

        // right side of base block
        // counter
        100, 0, 100,
        100, 0, 0,
        100, 30, 100, 
        100, 30, 100,
        100, 0, 0,
        100, 30, 0,

        // front side of base block
        // counter
        100, 0, 100,
        0, 30, 100,
        0, 0, 100,
        100, 0, 100,
        100, 30, 100,
        0, 30, 100,

        // left side of base block
        // clock
        0, 0, 100,
        0, 30, 100,
        0, 0, 0,
        0, 30, 100,
        0, 30, 0,
        0, 0, 0,

        // bottom side of base
        // left side
        0, 0, 0,
        10, 0, 0,
        10, 0, 100,
        10, 0, 100,
        0, 0, 100,
        0, 0, 0,

        // back side
        10, 0, 0,
        90, 0, 0,
        90, 0, 10,
        90, 0, 10,
        10, 0, 10,
        10, 0, 0,

        // right side
        90, 0, 0,
        100, 0, 0,
        100, 0, 100,
        100, 0, 100,
        90, 0, 100,
        90, 0, 0,

        // front side
        10, 0, 90,
        90, 0, 90,
        90, 0, 100,
        90, 0, 100,
        10, 0, 100,
        10, 0, 90,

        // top side of base
        // front
        0, 30, 100,
        100, 30, 100,
        100, 30, 90,
        100, 30, 90,
        0, 30, 90,
        0, 30, 100,

        // right
        90, 30, 90,
        100, 30, 90,
        100, 30, 10,
        100, 30, 10,
        90, 30, 10,
        90, 30, 90,

        // back
        0, 30, 0,
        100, 30, 10,
        100, 30, 0,
        100, 30, 10,
        0, 30, 0,
        0, 30, 10,

        // left
        0, 30, 10,
        10, 30, 90,
        10, 30, 10,
        10, 30, 90,
        0, 30, 10,
        0, 30, 90,
        // INNER

        // back side 
        10, 0, 0,
        90, 0, 0,
        10, 30, 0,
        10, 30, 0,
        90, 0, 0,
        90, 30, 0,

        // right side 
        90, 0, 100,
        90, 30, 100, 
        90, 0, 0,
        90, 30, 100,
        90, 30, 0,
        90, 0, 0,

        // front side 
        90, 0, 100,
        10, 0, 100,
        10, 30, 100,
        90, 0, 100,
        10, 30, 100,
        90, 30, 100,

        // left side 
        10, 0, 100,
        10, 0, 0,
        10, 30, 100,
        10, 30, 100,
        10, 0, 0,
        10, 30, 0,

        // front triangle leftside
        0, 30, 100,
        10, 30, 100,
        50, 90, 60,
        50, 90, 60,
        50, 100, 50,
        0, 30, 100,

        // front triangle rightside
        90, 30, 100,
        100, 30, 100,
        50, 100, 50,
        50, 100, 50,
        50, 90, 60,
        90, 30, 100

        // right triangle leftside

        

    ]
    // const vertices = 
    const colors = _generateColors([back, right, front, left,
        bottom, bottom, bottom, bottom, 
        top, top, top, top, 
        backInner, rightInner, frontInner, leftInner, 
        stand, stand]);
    return [vertices, colors];
}
export function makePyramidEdges(program, gl, baseProjection) {
    const obj1 = new GLObject(0, program, gl, gl.TRIANGLES);
    obj1.setBaseProjectionMatrix(baseProjection);
    let ver1, colors1;
    [ver1, colors1] = pyramidGenerator(
        [randomInt(), randomInt(), randomInt()],
        [randomInt(), randomInt(), randomInt()],
        [randomInt(), randomInt(), randomInt()],
        [randomInt(), randomInt(), randomInt()],
        [randomInt(), randomInt(), randomInt()],
        [randomInt(), randomInt(), randomInt()],
        [randomInt(), randomInt(), randomInt()],
        [randomInt(), randomInt(), randomInt()],
        [randomInt(), randomInt(), randomInt()],
        [randomInt(), randomInt(), randomInt()],
        [randomInt(), randomInt(), randomInt()],
        [randomInt(), randomInt(), randomInt()],

    )
    obj1.setVertexArray(ver1);
    obj1.setColor(colors1);
    obj1.setPosition(200,300,0);
    obj1.setRotation(0,0,0);
    obj1.setScale(2,2,2);
    obj1.bind();

    const obj2 = new GLObject(0, program, gl, gl.TRIANGLES);
    obj2.setBaseProjectionMatrix(baseProjection);
    let ver2, colors2;
    [ver2, colors2] = blockGenerator(
        30, 30, 300,
        [randomInt(), randomInt(), randomInt()],
        [randomInt(), randomInt(), randomInt()],
        [randomInt(), randomInt(), randomInt()],
        [randomInt(), randomInt(), randomInt()],
        [randomInt(), randomInt(), randomInt()],
        [randomInt(), randomInt(), randomInt()],
    )
    obj2.setVertexArray(ver2);
    obj2.setColor(colors2);
    obj2.setPosition(200,230,20);
    obj2.setRotation(0,0,0);
    obj2.setScale(1,1,1);
    obj2.bind();
    return [obj1, obj2];
}