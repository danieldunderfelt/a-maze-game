export default class {

	constructor(game) {
		this.game = game
		this.enabled = true
		this.callbacks = []
		this.directions = this.game.input.keyboard.createCursorKeys();

		this.game.input.keyboard.addKeyCapture([
			Phaser.Keyboard.LEFT,
			Phaser.Keyboard.RIGHT,
			Phaser.Keyboard.UP,
			Phaser.Keyboard.DOWN
		])
	}

	getDirections() {
		return this.directions
	}

	addCallback(callback) {
		this.callbacks.push(callback)
	}

	fireCallbacks(action) {
		if(!this.enabled) return false

		if(this.callbacks.length > 0) {
			this.callbacks.forEach((e) => e(action))
		}

		else return false
	}

	registerInput() {
		if(this.directions.up.isDown) this.fireCallbacks('up')
		else if(this.directions.down.isDown) this.fireCallbacks('down')
		else if(this.directions.left.isDown) this.fireCallbacks('left')
		else if(this.directions.right.isDown) this.fireCallbacks('right')
		else this.fireCallbacks(null)
	}

	destroy() {
		this.game.input.keyboard.clearCaptures()
	}
}