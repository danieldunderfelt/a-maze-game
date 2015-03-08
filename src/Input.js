import $ from 'jquery'

export default class {

	constructor(callback) {
		this.callback = callback
		this.register = true
	}

	start() {
		$(window).on('keydown', this.handleKeyboardInput.bind(this))
		$(window).on('keyup', (e) => this.register = true )
	}

	handleKeyboardInput(e) {
		if(!this.register) return
		this.register = false

		var dir

		if(e.keyCode === 40) dir = 'down'
		if(e.keyCode === 38) dir = 'up'
		if(e.keyCode === 37) dir = 'left'
		if(e.keyCode === 39) dir = 'right'

		var eventData = {
			type: "move",
			direction: dir
		}

		this.callback(eventData)
	}


}