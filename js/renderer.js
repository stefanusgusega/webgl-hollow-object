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

    render() {
        for (const obj of this.objects) {
            obj.draw()
        }
    }
}

export default Renderer