export const _generateColors = choosenColors => {
    let colors = []
    for (let i = 0; i < choosenColors.length; i++)
        for (let j = 0; j < 6; j++)
            colors.push(...choosenColors[i])
    return colors
}

export const blockGenerator = (p, l, t, front, back, upper, bottom, right, left) => {
    // Using gl.TRIANGLES
    const vback = [
        0, 0, 0,
        0, t, 0,
        p, 0, 0,
        0, t, 0,
        p, t, 0,
        p, 0, 0
    ]
    const vfront = [
        0, 0, l,
        p, 0, l,
        0, t, l,
        p, 0, l,
        p, t, l,
        0, t, l
    ]
    const vbottom = [
        0, 0, 0,
        p, 0, 0,
        0, 0, l,
        0, 0, l,
        p, 0, 0,
        p, 0, l
    ]
    const vupper = [
        0, t, 0,
        0, t, l,
        p, t, 0,
        p, t, 0,
        0, t, l,
        p, t, l
    ]
    const vright = [
        p, 0, 0,
        p, t, 0,
        p, 0, l,
        p, 0, l,
        p, t, 0,
        p, t, l
    ]
    const vleft = [
        0, 0, 0,
        0, 0, l,
        0, t, 0,
        0, 0, l,
        0, t, l,
        0, t, 0
    ]

    const vertices = [...vfront, ...vback, ...vupper, ...vbottom, ...vright, ...vleft]
    const colors = _generateColors([front, back, upper, bottom, right, left])
    
    return [vertices, colors]
}

// export const pyramidGenerator = () => {
//     let arr;
//     arr = blockGenerator()
// }

export const fGenerator = () => {
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

    return [vertices, colors]
}

export const circleGenerator = (rad, height, v, color) => {
    let steps = 32;
    let phi = 2.0 * Math.PI / steps;
    let vecs = [];
    let l = rad;

    for (let i = 0; i < steps; i++) {
      let angle = i * phi;
      vecs.push([l * Math.cos(angle), height, l * Math.sin(angle)]);
    }
    vecs.push(vecs[0]);
    
    let vert = [];
    let colors = [];
    for (let i = 0; i < vecs.length - 1; i++) {
        vert.push(
            ...vecs[i],
            ...v,
            ...vecs[i + 1]
        );
        colors.push(...color, ...color, ...color);
        vert.push(
            ...vecs[i],
            ...vecs[i + 1],
            ...v,
        );
        colors.push(...color, ...color, ...color);
    }
    return [vert, colors, vecs];
}

export const circleHollowGenerator = (rad, height, v, color) => {
    let steps = 32;
    let phi = 2.0 * Math.PI / steps;
    let vecs = [];
    let l = rad/2;

    for (let i = 0; i < steps; i++) {
      let angle = i * phi;
      vecs.push([l * Math.cos(angle), height, l * Math.sin(angle)]);
    }
    vecs.push(vecs[0]);
    console.log(vecs)
    
    let vert = [];
    let colors = [];
    for (let i = 0; i < vecs.length - 1; i++) {
        vert.push(
            ...vecs[i],
            ...v,
            ...vecs[i + 1]
        );
        colors.push(...color, ...color, ...color);
        vert.push(
            ...vecs[i],
            ...vecs[i + 1],
            ...v,
        );
        colors.push(...color, ...color, ...color);
    }
    return [vert, colors, vecs];
}

export const doubleCircleGenerator = (height, rad, ctop, cbottom) => {
    let vTop =    [0,  height / 2      , 0.0];
    let vBottom = [0, (height / 2) * -1, 0.0];
    let [topCircle, topColors, topVecs] = circleHollowGenerator(rad, height / 2, vTop, ctop);
    let [bottomCircle, bottomColors, bottomVecs] = circleHollowGenerator(rad, (height / 2) * -1, vBottom, cbottom);
    const vert = [
        ...topCircle,
        ...bottomCircle
    ];
    const color = [
        ...topColors,
        ...bottomColors
    ];
    return [vert, color];
}

export const squareGenerator = (a, b, c, d, color) => {
    const vert = [
        ...a,
        ...b,
        ...c,
        ...b,
        ...d,
        ...c,
    ];
    const colors = _generateColors([color]);
    return [vert, colors];
}

export const tubeGenerator = (height, rad, color) => {
    let vTop =    [0.0,  height / 2      , 0.0];
    let vBottom = [0.0, (height / 2) * -1, 0.0];
    let [topCircle, topColors, topVecs] = circleGenerator(rad, height / 2, vTop, [0,0,0]);
    let [bottomCircle, bottomColors, bottomVecs] = circleGenerator(rad, (height / 2) * -1, vBottom, [0, 0, 0]);
    let sqvert, sqcolor;
    let verts = [];
    let colors = [];
    for (let i = 0; i < topVecs.length - 1; i++) {
        [sqvert, sqcolor] = squareGenerator(
            topVecs[i],
            topVecs[i + 1],
            bottomVecs[i],
            bottomVecs[i + 1],
            color
        );
        verts.push(...sqvert);
        colors.push(...sqcolor);
        [sqvert, sqcolor] = squareGenerator(
            topVecs[i + 1],
            topVecs[i],
            bottomVecs[i + 1],
            bottomVecs[i],
            color
        );
        verts.push(...sqvert);
        colors.push(...sqcolor);
    }
    return [verts, colors];
}