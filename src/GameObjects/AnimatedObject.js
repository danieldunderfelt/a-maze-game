import BaseObject from './BaseObject'
import GameRenderer from '../GameRenderer'

export default class extends BaseObject {

	constructor(options) {
		super(options)

		this.isAnimated = true
		this.animationPlay = false
		this.animationLoop = false
		this.currentFrame = 0
		this.totalFrames = 1
		this.animationSpeed = 60 // higher = slower, OBVIOUSLY
		this.ticks = 0
		this.frameWidth = 32
		this.frameHeight = 32
	}

	setSpeed(speed) {
		this.animationSpeed = speed
	}

	setRenderProperties(x, y, width, height) {
		this.height = (this.frameHeight / this.frameWidth) * width
		this.x = x + 12
		this.y = y - ((this.height / width) - 1) * width
		this.width = width
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

	draw(ctx) {
		this.update()
		this.render(ctx)
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

	render(ctx) {
		// What an absolute bitch this is to wrap ones head around
		let sourceX = this.currentFrame * this.spriteWidth / this.totalFrames
		let sourceWidth = this.spriteWidth / this.totalFrames
		let destX = this.x - (this.width / this.totalFrames)
		let destY = this.y

		ctx.drawImage(
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