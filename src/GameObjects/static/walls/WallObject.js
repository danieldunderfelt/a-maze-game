export default class {

	constructor(closed) {
		this.sprite = !closed && this.spriteOpen ? this.spriteOpen : this.spriteClosed
	}

	setRenderProperties(x, y, size) {
		this.width = size
		this.height = this.wallHeight * size
		this.x = x + (this.wallX * size)
		this.y = y + (this.wallY * size)
	}

	draw(ctx) {
		ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)
	}
}