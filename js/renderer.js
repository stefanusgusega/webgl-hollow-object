class Renderer {
    constructor() {
        this.objects = []
        this.count
    }

    addObject(obj) {
        this.objects.push(obj)
        this.count++
    }

    removeObject(id) {
        const idx = this.objects.findIndex(obj => obj.id === id)
        this.objects.splice(idx, 1)
        this.count--
    }

    changeProjection(projectionMat) {
        for (const obj of this.objects) {
            obj.setBaseProjectionMatrix(projectionMat);
        }
    }

    render() {
        for (const obj of this.objects) {
            obj.draw()
        }
    }
}

export default Renderer