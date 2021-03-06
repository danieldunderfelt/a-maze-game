import { assetRegistry } from '../../data/assetRegistry'
import GameRenderer from '../GameRenderer'

export default class {

	constructor(options) {
		this.controller = typeof options !== "undefined" ? options.controller || false : false
		this.id = guid()
		this.context = false
		this.isAnimated = false
		this.x = 0
		this.y = 0
		this.width = 0
		this.height = 0
		this.subcell = 0
		this.mazeCell = [0, 0]
		this.againstWall = 0
		this.zIndex = 2

		this.spriteWidth = 32
		this.spriteHeight = 32
		this.sprite = assetRegistry.default_sprite

		this.assets = assetRegistry
	}

	setPosition(x, y) {
		this.x = x
		this.y = y
	}

	setLocationData(subcellPosition, mazeLocation, mazeCellWall) {
		this.subcell = subcellPosition
		this.mazeCell = mazeLocation
		this.againstWall = mazeCellWall
	}

	setRenderProperties(x, y, width, height) {
		this.height = (this.spriteHeight / this.spriteWidth) * height
		this.x = x
		this.y = y - ((this.height / width) - 1) * width
		this.width = width
	}

	setContext(context) {
		this.context = context
	}

	draw(ctx) {
		ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)
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