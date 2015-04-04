import BaseObject from '../BaseObject'

export default class extends BaseObject {

	constructor(options) {
		super(options)

		this.spriteWidth = 32
		this.spriteHeight = 64
		this.sprite = this.assets.high_object
	}
}