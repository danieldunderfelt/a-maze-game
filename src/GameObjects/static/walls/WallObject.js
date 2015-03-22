import BaseObject from '../../BaseObject'

export default class extends BaseObject {

	constructor() {
		super()
	}

	setRenderProperties(size, x, y) {
		this.size = size
		this.x = Math.round(x)
		this.y = Math.round(y)
		this.width = Math.round(this.wallWidth * size)
		this.height = Math.round(this.wallHeight * size)
	}

	draw(ctx) {
		ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)
	}
}