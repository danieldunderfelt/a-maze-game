import WallObject from './WallObject'
import { assetRegistry } from '../../../../data/assetRegistry'

class TopWall extends WallObject {

	constructor() {
		super()

		this.direction = "up"
		this.sprite = assetRegistry.horz_wall_closed
		this.wallHeight = 1
		this.wallY = -1
	}
}

class RightWall extends WallObject {

	constructor() {
		super()

		this.direction = "right"
		this.sprite = assetRegistry.right_wall
		this.wallHeight = 4
		this.wallX = -0.01
		this.wallY = -1
	}
}

class BottomWall extends WallObject {

	constructor() {
		super()

		this.direction = "down"
		this.sprite = assetRegistry.horz_wall_closed
		this.wallHeight = 1
		this.wallY = 2
	}
}

class LeftWall extends WallObject {

	constructor() {
		super()

		this.direction = "left"
		this.sprite = assetRegistry.left_wall
		this.wallHeight = 4
		this.wallY = -1
	}
}

export default {
	top: TopWall,
	right: RightWall,
	bottom: BottomWall,
	left: LeftWall
}