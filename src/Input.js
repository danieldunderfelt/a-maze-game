import $ from 'jquery'

export default class {

	constructor() {
		this.callback = function() {}
		this.register = true
		this.enabled = false
	}

	registerCallback(callback) {
		this.callback = callback
	}

	start() {
		this.enable()
		$(window).on('keydown', this.handleKeyboardInput.bind(this))
		$(window).on('keyup', (e) => this.register = true )
	}

	enable() {
		this.enabled = true
	}

	disable() {
		this.enabled = false
	}

	handleKeyboardInput(e) {
		if(!this.register || !this.enabled) return false
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