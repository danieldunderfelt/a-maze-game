class GameRenderer {

	constructor() {
		this.renderLoop = []
		this.enabled = false
	}

	pushRenderer(drawFunction, context, bindingName, position = false) {
		var renderData = { name: bindingName, fn: drawFunction, context: context }

		if(position !== false)
			this.renderLoop.splice(position, 0, renderData)
		else
			this.renderLoop.push(renderData)
	}

	removeRenderer(bindingName) {
		for(var r = 0; r < this.renderLoop.length; r++) {
			if(bindingName === this.renderLoop[r].name) {
				this.renderLoop.splice(r, 1)
			}
		}
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
			let fn = this.renderLoop[i].fn
			let that = this.renderLoop[i].context
			fn.call(that)
		}

		requestAnimationFrame(this.render.bind(this))
	}
}

export default new GameRenderer()