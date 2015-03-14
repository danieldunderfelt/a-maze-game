export default class {

	constructor() {
		this.isAnimated = false
		this.x = 0
		this.y = 0
		this.width = 0
		this.height = 0

		this.spriteWidth = 32
		this.spriteHeight = 32
		this.spriteUrl = location.href + 'animation_sprites/default.gif'
		this.spriteImage = new Image()
		this.spriteLoaded = false
	}

	setPosition(x, y) {
		this.x = x
		this.y = y
	}

	setRenderSize(width, height) {
		this.width = width
		this.height = height
	}

	loadSprite(resolve, reject) {
		this.spriteImage.onload = () => {
			this.spriteLoaded = true
			resolve(this.spriteImage)
		}

		img.src = this.spriteUrl
	}

	draw(context, x, y) {
		this.setPosition(x, y)
		context.drawImage(this.spriteImage, x, y, imgWidth, imgHeight)
	}
}