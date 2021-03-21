import { blockGenerator } from "../utils/generator.js";
import GLObject from "./GLObject.js";

export function randomInt() {
    var raw = Math.random();
    return Math.floor(raw*256);
}
export function makePyramidEdges(program, gl, baseProjection) {
    const obj1 = new GLObject(0, program, gl, gl.TRIANGLES);
    obj1.setBaseProjectionMatrix(baseProjection);
    let ver1, colors1;
    [ver1, colors1] = blockGenerator(
        300, 30, 30,
        [randomInt(), randomInt(), randomInt()],
        [randomInt(), randomInt(), randomInt()],
        [randomInt(), randomInt(), randomInt()],
        [randomInt(), randomInt(), randomInt()],
        [randomInt(), randomInt(), randomInt()],
        [randomInt(), randomInt(), randomInt()],
    )
    obj1.setVertexArray(ver1);
    obj1.setColor(colors1);
    obj1.setPosition(200,200,20);
    obj1.setRotation(0,0,0);
    obj1.setScale(1,1,1);
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