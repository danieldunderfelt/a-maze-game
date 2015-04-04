import WallObject from './WallObject'
import { assetRegistry } from '../../../../data/assetRegistry'

class TopLeftWall extends WallObject {

	constructor() {
		super()
		this.direction = "up"
		this.sprite = assetRegistry.top_wall_left
		this.wallHeight = 1.5
		this.wallX = 0
		this.wallY = -1.5
	}
}

class TopCenterWall extends WallObject {

	constructor() {
		super()

		this.direction = "up"
		this.sprite = assetRegistry.horz_wall_closed
		this.wallHeight = 1.5
		this.wallX = 1
		this.wallY = -1.5
	}
}

class TopRightWall extends WallObject {

	constructor() {
		super()
		this.direction = "up"
		this.sprite = assetRegistry.top_wall_right
		this.wallHeight = 1.5
		this.wallX = 2
		this.wallY = -1.5
	}
}

class RightWall extends WallObject {

	constructor() {
		super()

		this.direction = "right"
		this.sprite = assetRegistry.right_wall_closed
		this.wallHeight = 3
		this.wallX = 2
		this.wallY = 0
	}
}

class BottomLeftWall extends WallObject {

	constructor() {
		super()

		this.direction = "down"
		this.sprite = assetRegistry.bottom_wall_left
		this.wallHeight = 1.6
		this.wallX = 0
		this.wallY = 1.5
	}
}

class BottomCenterWall extends WallObject {

	constructor() {
		super()

		this.direction = "down"
		this.sprite = assetRegistry.horz_wall_closed
		this.wallHeight = 1.6
		this.wallX = 1
		this.wallY = 1.5
	}
}

class BottomRightWall extends WallObject {

	constructor() {
		super()

		this.direction = "down"
		this.sprite = assetRegistry.bottom_wall_right
		this.wallHeight = 1.6
		this.wallX = 2
		this.wallY = 1.5
	}
}

class LeftWall extends WallObject {

	constructor() {
		super()

		this.direction = "left"
		this.sprite = assetRegistry.left_wall_closed
		this.wallHeight = 3
		this.wallX = 0
		this.wallY = 0
	}
}

export default {
	topLeft: TopLeftWall,
	topCenter: TopCenterWall,
	topRight: TopRightWall,
	left: LeftWall,
	right: RightWall,
	bottomLeft: BottomLeftWall,
	bottomCenter: BottomCenterWall,
	bottomRight: BottomRightWall
}