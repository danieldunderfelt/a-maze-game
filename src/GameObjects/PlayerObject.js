import AnimatedObject from './AnimatedObject'

class PlayerObject extends AnimatedObject {

	constructor() {
		super()

		this.sprite = this.assets.anim_test
		this.totalFrames = 17
		this.spriteWidth = 544
		this.spriteHeight = 32

		this.animate()
		this.loop(true)
	}
}

export default PlayerObject