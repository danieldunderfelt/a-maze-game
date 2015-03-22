import BaseObject from '../BaseObject'

export default class extends BaseObject {

	constructor() {
		super()

		this.spriteWidth = 32
		this.spriteHeight = 64
		this.sprite = this.assets.high_object
	}
}