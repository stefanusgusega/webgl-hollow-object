export const donut = (slices, loops, inner_rad, outer_rad) => {
    let vertices = [];
    let normals = [];
    let texCoords = [];
    let colors = [];

    for (let slice = 0; slice <= slices; ++slice) {
        const v = slice / slices;
        const slice_angle = v * 2 * Math.PI;
        const cos_slices = Math.cos(slice_angle);
        const sin_slices = Math.sin(slice_angle);
        const slice_rad = outer_rad + inner_rad * cos_slices;

        for (let loop = 0; loop <= loops; ++loop) {
            const u = loop / loops;
            const loop_angle = u * 2 * Math.PI;
            const cos_loops = Math.cos(loop_angle);
            const sin_loops = Math.sin(loop_angle);

            const x = slice_rad * cos_loops;
            const y = slice_rad * sin_loops;
            const z = inner_rad * sin_slices;

            vertices.push(x, y, z);
            normals.push(
                cos_loops * sin_slices,
                sin_loops * sin_slices,
                cos_slices);
            colors.push(0, 255, 255);

            texCoords.push(u);
            texCoords.push(v);
        }
    }
    return [vertices, colors]
}