import { doubleCircleGenerator, tubeGenerator } from '../utils/generator.js';

export const cylinderGenerator = (height, rad, ctop, cbottom, ctube) => {
    let [circleVert, circleColor] = doubleCircleGenerator(height, rad, ctop, cbottom);
    let [tubeVert, tubeColor] = tubeGenerator(height, rad, ctube);
    let [tubeInnerVert, tubeInnerColor] = tubeGenerator(height, rad/2, ctube);
    const vert = [
        ...tubeVert,
        ...tubeInnerVert,
        ...circleVert,
    ];
    const colors = [
        ...tubeColor,
        ...tubeInnerColor,
        ...circleColor,
    ];
    return [vert, colors];
}
