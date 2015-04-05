import WallObject from './WallObject'
import { assetRegistry } from '../../../../data/assetRegistry'

class TopLeftCorner extends WallObject {

	constructor() {
		super()

		this.direction = ["up", "left"]
		this.sprite = assetRegistry.top_wall_left
		this.wallHeight = 1.5
		this.wallY = -1.5
	}
}

class TopRightCorner extends WallObject {

	constructor() {
		super()

		this.direction = ["up", "right"]
		this.sprite = assetRegistry.top_wall_right
		this.wallHeight = 3
		this.wallY = 0
	}
}

class BottomRightCorner extends WallObject {

	constructor() {
		super()

		this.direction = ["down", "right"]
		this.sprite = assetRegistry.bottom_wall_right
		this.wallHeight = 1.5
		this.wallY = 1.5
	}
}

class BottomLeftCorner extends WallObject {

	constructor() {
		super()

		this.direction = ["down", "left"]
		this.sprite = assetRegistry.bottom_wall_left
		this.wallHeight = 3
		this.wallY = 0
	}
}

export default {
	topLeft: TopLeftCorner,
	topRight: TopRightCorner,
	bottomRight: BottomRightCorner,
	bottomLeft: BottomLeftCorner
}