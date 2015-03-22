import AnimatedObject from '../AnimatedObject'

export default class extends AnimatedObject {

	constructor() {
		super()

		this.sprite = this.assets.hovering_anim
		this.totalFrames = 5
		this.spriteWidth = 160
		this.spriteHeight = 64
		this.frameWidth = 32
		this.frameHeight = 64
		this.animationSpeed = 20

		this.animate()
		this.loop(true)
	}
}