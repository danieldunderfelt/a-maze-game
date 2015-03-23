export default class {

	constructor(closed, part) {
		var wallPart = part

		if(part === "c") {
			wallPart = closed ? "closed" : "open"
		}

		this.sprite = this.sprites[wallPart]
	}

	setRenderProperties(x, y, size) {
		this.width = size
		this.height = this.wallHeight * size
		this.x = x
		this.y = this.type === "horizontal" ? y - (this.height - size) : y
	}

	draw(ctx) {
		ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)
	}
}