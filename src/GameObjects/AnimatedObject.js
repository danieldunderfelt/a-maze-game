import BaseObject from './BaseObject'

export default class extends BaseObject {

	constructor() {
		super()

		this.isAnimated = true
		this.animationPlay = false
		this.animationLoop = false
		this.currentFrame = 1
		this.totalFrames = 1
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

	}
}