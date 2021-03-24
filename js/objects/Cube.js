import { blockGenerator, _generateColors } from "../utils/generator.js";
import GLObject from "./GLObject.js";

export function randomInt() {
    var raw = Math.random();
    return Math.floor(raw * 256);
}

export const cubeGenerator = () => {
    // Using gl.TRIANGLES

    // Create a cube
    //    v6----- v5
    //   /|      /|
    //  v1------v0|
    //  | |     | |
    //  | |v7---|-|v4
    //  |/      |/
    //  v2------v3
    // p = 100
    // l = 30
    // t = 30

    // v2-v3
    const vertices = [

        0, 0, 0,
        0, 30, 0,
        130, 0, 0,
        0, 30, 0,
        130, 30, 0,
        130, 0, 0,

        0, 0, 30,
        130, 0, 30,
        0, 30, 30,
        130, 0, 30,
        130, 30, 30,
        0, 30, 30,

        0, 0, 0,
        130, 0, 0,
        0, 0, 30,
        0, 0, 30,
        130, 0, 0,
        130, 0, 30,

        0, 30, 0,
        0, 30, 30,
        130, 30, 0,
        130, 30, 0,
        0, 30, 30,
        130, 30, 30,

        130, 0, 0,
        130, 30, 0,
        130, 0, 30,
        130, 0, 30,
        130, 30, 0,
        130, 30, 30,

        0, 0, 0,
        0, 0, 30,
        0, 30, 0,
        0, 0, 30,
        0, 30, 30,
        0, 30, 0,


        // // v7-v4
        // // z +130

        0, 0, 130,
        0, 30, 130,
        160, 0, 130,
        0, 30, 130,
        160, 30, 130,
        160, 0, 130,

        0, 0, 160,
        160, 0, 160,
        0, 30, 160,
        160, 0, 160,
        160, 30, 160,
        0, 30, 160,

        0, 0, 130,
        160, 0, 130,
        0, 0, 160,
        0, 0, 160,
        160, 0, 130,
        160, 0, 160,

        0, 30, 130,
        0, 30, 160,
        160, 30, 130,
        160, 30, 130,
        0, 30, 160,
        160, 30, 160,

        160, 0, 130,
        160, 30, 130,
        160, 0, 160,
        160, 0, 160,
        160, 30, 130,
        160, 30, 160,

        0, 0, 130,
        0, 0, 160,
        0, 30, 130,
        0, 0, 160,
        0, 30, 160,
        0, 30, 130,


        // v6-v5
        //z+130,y+130


        0, 130, 130,
        0, 160, 130,
        130, 130, 130,
        0, 160, 130,
        130, 160, 130,
        130, 130, 130,

        0, 130, 160,
        130, 130, 160,
        0, 160, 160,
        130, 130, 160,
        130, 160, 160,
        0, 160, 160,

        0, 130, 130,
        130, 130, 130,
        0, 130, 160,
        0, 130, 160,
        130, 130, 130,
        130, 130, 160,

        0, 160, 130,
        0, 160, 160,
        130, 160, 130,
        130, 160, 130,
        0, 160, 160,
        130, 160, 160,

        130, 130, 130,
        130, 160, 130,
        130, 130, 160,
        130, 130, 160,
        130, 160, 130,
        130, 160, 160,

        0, 130, 130,
        0, 130, 160,
        0, 160, 130,
        0, 130, 160,
        0, 160, 160,
        0, 160, 130,


        // v1-v0
        // y + 130

        0, 130, 0,
        0, 160, 0,
        160, 130, 0,
        0, 160, 0,
        160, 160, 0,
        160, 130, 0,

        0, 130, 30,
        160, 130, 30,
        0, 160, 30,
        160, 130, 30,
        160, 160, 30,
        0, 160, 30,

        0, 130, 0,
        160, 130, 0,
        0, 130, 30,
        0, 130, 30,
        160, 130, 0,
        160, 130, 30,

        0, 160, 0,
        0, 160, 30,
        160, 160, 0,
        160, 160, 0,
        0, 160, 30,
        160, 160, 30,

        160, 130, 0,
        160, 160, 0,
        160, 130, 30,
        160, 130, 30,
        160, 160, 0,
        160, 160, 30,

        0, 130, 0,
        0, 130, 30,
        0, 160, 0,
        0, 130, 30,
        0, 160, 30,
        0, 160, 0,


        // v1-v2
        // p = 30
        // l = 30
        // t = 100

        0, 0, 0,
        0, 130, 0,
        30, 0, 0,
        0, 130, 0,
        30, 130, 0,
        30, 0, 0,

        0, 0, 30,
        30, 0, 30,
        0, 130, 30,
        30, 0, 30,
        30, 130, 30,
        0, 130, 30,

        0, 0, 0,
        30, 0, 0,
        0, 0, 30,
        0, 0, 30,
        30, 0, 0,
        30, 0, 30,

        0, 130, 0,
        0, 130, 30,
        30, 130, 0,
        30, 130, 0,
        0, 130, 30,
        30, 130, 30,

        30, 0, 0,
        30, 130, 0,
        30, 0, 30,
        30, 0, 30,
        30, 130, 0,
        30, 130, 30,

        0, 0, 0,
        0, 0, 30,
        0, 130, 0,
        0, 0, 30,
        0, 130, 30,
        0, 130, 0,


        // v0-v3
        // x = 130

        130, 0, 0,
        130, 130, 0,
        160, 0, 0,
        130, 130, 0,
        160, 130, 0,
        160, 0, 0,

        130, 0, 30,
        160, 0, 30,
        130, 130, 30,
        160, 0, 30,
        160, 130, 30,
        130, 130, 30,

        130, 0, 0,
        160, 0, 0,
        130, 0, 30,
        130, 0, 30,
        160, 0, 0,
        160, 0, 30,

        130, 130, 0,
        130, 130, 30,
        160, 130, 0,
        160, 130, 0,
        130, 130, 30,
        160, 130, 30,

        160, 0, 0,
        160, 130, 0,
        160, 0, 30,
        160, 0, 30,
        160, 130, 0,
        160, 130, 30,

        130, 0, 0,
        130, 0, 30,
        130, 130, 0,
        130, 0, 30,
        130, 130, 30,
        130, 130, 0,


        // v5-v4
        // x += 130
        // z += 130

        130, 0, 130,
        130, 130, 130,
        160, 0, 130,
        130, 130, 130,
        160, 130, 130,
        160, 0, 130,

        130, 0, 160,
        160, 0, 160,
        130, 130, 160,
        160, 0, 160,
        160, 130, 160,
        130, 130, 160,

        130, 0, 130,
        160, 0, 130,
        130, 0, 160,
        130, 0, 160,
        160, 0, 130,
        160, 0, 160,

        130, 130, 130,
        130, 130, 160,
        160, 130, 130,
        160, 130, 130,
        130, 130, 160,
        160, 130, 160,

        160, 0, 130,
        160, 130, 130,
        160, 0, 160,
        160, 0, 160,
        160, 130, 130,
        160, 130, 160,

        130, 0, 130,
        130, 0, 160,
        130, 130, 130,
        130, 0, 160,
        130, 130, 160,
        130, 130, 130,


        // v6-v7
        //z += 130

        0, 0, 130,
        0, 130, 130,
        30, 0, 130,
        0, 130, 130,
        30, 130, 130,
        30, 0, 130,

        0, 0, 160,
        30, 0, 160,
        0, 130, 160,
        30, 0, 160,
        30, 130, 160,
        0, 130, 160,

        0, 0, 130,
        30, 0, 130,
        0, 0, 160,
        0, 0, 160,
        30, 0, 130,
        30, 0, 160,

        0, 130, 130,
        0, 130, 160,
        30, 130, 130,
        30, 130, 130,
        0, 130, 160,
        30, 130, 160,

        30, 0, 130,
        30, 130, 130,
        30, 0, 160,
        30, 0, 160,
        30, 130, 130,
        30, 130, 160,

        0, 0, 130,
        0, 0, 160,
        0, 130, 130,
        0, 0, 160,
        0, 130, 160,
        0, 130, 130,


        // // v2-v7
        // // p = t = 30
        // // l = 100

        0, 0, 0,
        0, 30, 0,
        30, 0, 0,
        0, 30, 0,
        30, 30, 0,
        30, 0, 0,

        0, 0, 130,
        30, 0, 130,
        0, 30, 130,
        30, 0, 130,
        30, 30, 130,
        0, 30, 130,

        0, 0, 0,
        30, 0, 0,
        0, 0, 130,
        0, 0, 130,
        30, 0, 0,
        30, 0, 130,

        0, 30, 0,
        0, 30, 130,
        30, 30, 0,
        30, 30, 0,
        0, 30, 130,
        30, 30, 130,

        30, 0, 0,
        30, 30, 0,
        30, 0, 130,
        30, 0, 130,
        30, 30, 0,
        30, 30, 130,

        0, 0, 0,
        0, 0, 130,
        0, 30, 0,
        0, 0, 130,
        0, 30, 130,
        0, 30, 0,


        // v3-v4
        // x += 130

        130, 0, 0,
        130, 30, 0,
        160, 0, 0,
        130, 30, 0,
        160, 30, 0,
        160, 0, 0,

        130, 0, 130,
        160, 0, 130,
        130, 30, 130,
        160, 0, 130,
        160, 30, 130,
        130, 30, 130,

        130, 0, 0,
        160, 0, 0,
        130, 0, 130,
        130, 0, 130,
        160, 0, 0,
        160, 0, 130,

        130, 30, 0,
        130, 30, 130,
        160, 30, 0,
        160, 30, 0,
        130, 30, 130,
        160, 30, 130,

        160, 0, 0,
        160, 30, 0,
        160, 0, 130,
        160, 0, 130,
        160, 30, 0,
        160, 30, 130,

        130, 0, 0,
        130, 0, 130,
        130, 30, 0,
        130, 0, 130,
        130, 30, 130,
        130, 30, 0,


        // v0-v5
        // x += 130
        // y += 130

        130, 130, 0,
        130, 160, 0,
        160, 130, 0,
        130, 160, 0,
        160, 160, 0,
        160, 130, 0,

        130, 130, 160,
        160, 130, 160,
        130, 160, 160,
        160, 130, 160,
        160, 160, 160,
        130, 160, 160,

        130, 130, 0,
        160, 130, 0,
        130, 130, 160,
        130, 130, 160,
        160, 130, 0,
        160, 130, 160,

        130, 160, 0,
        130, 160, 160,
        160, 160, 0,
        160, 160, 0,
        130, 160, 160,
        160, 160, 160,

        160, 130, 0,
        160, 160, 0,
        160, 130, 160,
        160, 130, 160,
        160, 160, 0,
        160, 160, 160,

        130, 130, 0,
        130, 130, 160,
        130, 160, 0,
        130, 130, 160,
        130, 160, 160,
        130, 160, 0,


        // v1-v6
        // y += 130

        0, 130, 0,
        0, 160, 0,
        30, 130, 0,
        0, 160, 0,
        30, 160, 0,
        30, 130, 0,

        0, 130, 130,
        30, 130, 130,
        0, 160, 130,
        30, 130, 130,
        30, 160, 130,
        0, 160, 130,


        0, 130, 0,
        30, 130, 0,
        0, 130, 130,
        0, 130, 130,
        30, 130, 0,
        30, 130, 130,

        0, 160, 0,
        0, 160, 130,
        30, 160, 0,
        30, 160, 0,
        0, 160, 130,
        30, 160, 130,

        30, 130, 0,
        30, 160, 0,
        30, 130, 130,
        30, 130, 130,
        30, 160, 0,
        30, 160, 130,

        0, 130, 0,
        0, 130, 130,
        0, 160, 0,
        0, 130, 130,
        0, 160, 130,
        0, 160, 0

    ]

    const colors = [

        //v2-v3
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        100, 7, 20,
        100, 7, 20,
        100, 7, 20,
        100, 7, 20,
        100, 7, 20,
        100, 7, 20,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        //v7-v4
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,

        100, 7, 20,
        100, 7, 20,
        100, 7, 20,
        100, 7, 20,
        100, 7, 20,
        100, 7, 20,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        //v6-v5
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        20, 7, 12,
        20, 7, 12,
        20, 7, 12,
        20, 7, 12,
        20, 7, 12,
        20, 7, 12,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        //v1-v0
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        20, 7, 12,
        20, 7, 12,
        20, 7, 12,
        20, 7, 12,
        20, 7, 12,
        20, 7, 12,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        //v1-v2
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 7, 120,
        200, 7, 120,
        200, 7, 120,
        200, 7, 120,
        200, 7, 120,
        200, 7, 120,

        //v0-v3
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 10,
        200, 70, 10,
        200, 70, 10,
        200, 70, 10,
        200, 70, 10,
        200, 70, 10,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        //v5-v4
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 10,
        200, 70, 10,
        200, 70, 10,
        200, 70, 10,
        200, 70, 10,
        200, 70, 10,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        //v6-v7
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,
        20, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 7, 120,
        200, 7, 120,
        200, 7, 120,
        200, 7, 120,
        200, 7, 120,
        200, 7, 120,

        //v2-v7
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        100, 7, 20,
        100, 7, 20,
        100, 7, 20,
        100, 7, 20,
        100, 7, 20,
        100, 7, 20,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 7, 120,
        200, 7, 120,
        200, 7, 120,
        200, 7, 120,
        200, 7, 120,
        200, 7, 120,

        //v3-v4
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        100, 7, 20,
        100, 7, 20,
        100, 7, 20,
        100, 7, 20,
        100, 7, 20,
        100, 7, 20,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 10,
        200, 70, 10,
        200, 70, 10,
        200, 70, 10,
        200, 70, 10,
        200, 70, 10,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        //v0-v5
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        20, 7, 12,
        20, 7, 12,
        20, 7, 12,
        20, 7, 12,
        20, 7, 12,
        20, 7, 12,

        200, 70, 10,
        200, 70, 10,
        200, 70, 10,
        200, 70, 10,
        200, 70, 10,
        200, 70, 10,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        //v1-v6
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        20, 7, 12,
        20, 7, 12,
        20, 7, 12,
        20, 7, 12,
        20, 7, 12,
        20, 7, 12,

        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        200, 7, 120,
        200, 7, 120,
        200, 7, 120,
        200, 7, 120,
        200, 7, 120,
        200, 7, 120

    ]

    return [vertices, colors]
}