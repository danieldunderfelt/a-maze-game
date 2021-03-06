export default class {

	setRenderProperties(x, y, size) {
		this.width = size
		this.height = this.wallHeight * size
		this.x = x + (this.wallX * size)
		this.y = y + (this.wallY * size)

		return this
	}

	draw(ctx) {
		ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)
	}
}