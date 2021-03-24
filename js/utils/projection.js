import { mmult } from './matrix.js'

export const CABINET_PROJECTION_ANGLE = 63.4;

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

export function oblique(left, right, bottom, top, near, far, angle) {
    const s = 0.5 * Math.sin(angle)
    const c = 0.5 * Math.cos(angle)
    const shearMat = [
        1, 0, 0, s,
        0, 1, 0, c,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ]
    const orthographicMat = orthographic(left, right, bottom, top, near, far)
    return mmult(orthographicMat, shearMat)
}