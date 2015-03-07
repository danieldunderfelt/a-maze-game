import $ from 'jquery'

export default class {

	constructor(callback) {
		this.callback = callback
	}

	start() {
		$(window).on('keydown', this.handleKeyboardInput.bind(this))
	}

	handleKeyboardInput(e) {
		var dir

		if(e.keyCode === 40) dir = 'down'
		if(e.keyCode === 38) dir = 'up'
		if(e.keyCode === 37) dir = 'left'
		if(e.keyCode === 39) dir = 'right'

		var eventData = {
			direction: dir
		}

		this.callback(eventData)
	}


}