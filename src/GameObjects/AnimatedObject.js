import BaseObject from './BaseObject'

export default class extends BaseObject {

	constructor() {
		super()

		this.isAnimated = true
		this.animationPlay = false
		this.animationLoop = false
		this.currentFrame = 0
		this.totalFrames = 1
		this.animationSpeed = 60 // higher = slower, OBVIOUSLY
		this.ticks = 0
	}

	setSpeed(speed) {
		this.animationSpeed = speed
	}

	setRenderProperties(x, y, width, height) {
		this.x = x
		this.y = y
		this.width = width
		this.height = height
	}

	animate() {
		this.animationPlay = true
	}

	stop() {
		this.animationPlay = false
	}

	loop(loopStatus) {
		this.animationLoop = loopStatus
	}

	draw() {
		this.update()
		this.render()
	}

	update() {
		this.ticks++

		if(this.ticks > this.animationSpeed) {
			this.ticks = 0

			if(this.currentFrame < this.totalFrames - 1) {
				this.currentFrame++
			}
			else if(this.animationLoop) {
				this.currentFrame = 0
			}
		}
	}

	render() {
		let sourceX = this.currentFrame * this.spriteWidth / this.totalFrames
		let sourceWidth = this.spriteWidth / this.totalFrames
		let destX = this.x - this.width / this.totalFrames
		let destY = this.y - this.height / this.totalFrames

		this.context.drawImage(
			this.sprite,
			sourceX,
			0,
			sourceWidth,
			this.spriteHeight,
			destX,
			destY,
			this.width,
			this.height
		)
	}
}