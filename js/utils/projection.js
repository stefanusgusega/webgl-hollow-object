export function orthographic(left, right, bottom, top, near, far) {
    return [
        2 / (right - left), 0, 0, 0,
        0, 2 / (top - bottom), 0, 0,
        0, 0, 2 / (near - far), 0,
 
        (left + right) / (left - right),
        (bottom + top) / (bottom - top),
        (near + far) / (near - far),
        1,
    ]
}

export function perspective(fov, aspect, near, far) {
    var f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
    var rangeInv = 1.0 / (near - far);

    return [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) * rangeInv, -1,
      0, 0, near * far * rangeInv * 2, 0
    ];
}