class GameRenderer {

	constructor() {
		this.renderLoop = []
		this.enabled = false
	}

	pushRenderer(drawFunction, context, bindingName, position = false) {
		var renderData = { name: bindingName, fn: drawFunction, context: context, position: position }

		if(position !== false)
			this.renderLoop.splice(position, 0, renderData)
		else {
			renderData.position = this.renderLoop.length
			this.renderLoop.push(renderData)
		}

		return renderData.position
	}

	removeRenderer(bindingName) {
		for(var r = 0; r < this.renderLoop.length; r++) {
			if(bindingName === this.renderLoop[r].name) {
				this.renderLoop.splice(r, 1)
			}
		}
	}

	moveRenderer(bindingName, toPosition) {
		for(var r = 0; r < this.renderLoop.length; r++) {
			if(bindingName === this.renderLoop[r].name) {
				var from = this.renderLoop[r].position
				this.renderLoop.splice(toPosition, 0, this.renderLoop.splice(from, 1)[0])
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