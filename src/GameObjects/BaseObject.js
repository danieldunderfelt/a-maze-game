import { assetRegistry } from '../../data/assetRegistry'
import GameRenderer from '../GameRenderer'

export default class {

	constructor() {
		this.id = guid()
		this.context = false
		this.isAnimated = false
		this.x = 0
		this.y = 0
		this.width = 0
		this.height = 0

		this.spriteWidth = 32
		this.spriteHeight = 32
		this.sprite = assetRegistry.default_sprite

		GameRenderer.pushRenderer(this.draw, this, this.id)
	}

	setPosition(x, y) {
		this.x = x
		this.y = y
	}

	setRenderProperties(x, y, width, height) {
		this.x = x
		this.y = y
		this.width = width
		this.height = height
	}

	setContext(context) {
		this.context = context
	}

	draw() {
		if(this.context === false) return false
		this.context.drawImage(this.sprite, this.x, this.y, this.width, this.height)
	}

	dispose() {
		GameRenderer.removeRenderer(this.id)
		delete this
	}
}

function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			  .toString(16)
			  .substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		   s4() + '-' + s4() + s4() + s4();
}