export function mmult(u, v) {
    let result = []

    // algorithm
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let sum = 0.0
            for (let k = 0; k < 4; k++) {
                sum += u[i*4 + k] * v[k*4 + j]
            }
            result.push(sum)
        }
    }
    return result
}