class GameRenderer {

	constructor() {
		this.renderLoop = []
		this.enabled = false
	}

	addToRenderLoop(drawFunction, context) {
		this.renderLoop.push([drawFunction, context])
		return this.renderLoop
	}

	start() {
		this.enabled = true
		this.render()

		return this
	}

	stop() {
		this.enabled = false
	}

	render() {
		if(!this.enabled) return false

		for(let i = 0; i < this.renderLoop.length; i++) {
			let fn = this.renderLoop[i][0]
			let that = this.renderLoop[i][1]
			fn.call(that)
		}

		requestAnimationFrame(this.render.bind(this))
	}
}

export default new GameRenderer()