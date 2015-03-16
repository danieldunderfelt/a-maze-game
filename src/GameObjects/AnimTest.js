import AnimatedObject from './AnimatedObject'
import { assetRegistry } from '../../data/assetRegistry'

export default class extends AnimatedObject {

	constructor() {
		super()

		this.sprite = assetRegistry.anim_test
		this.totalFrames = 17
		this.spriteWidth = 544
		this.spriteHeight = 32

		this.animate()
		this.loop(true)
	}
}