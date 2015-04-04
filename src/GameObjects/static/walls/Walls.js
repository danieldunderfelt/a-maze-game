import WallObject from './WallObject'
import { assetRegistry } from '../../../../data/assetRegistry'

class TopLeftWall extends WallObject {

	constructor(closed) {
		super()
		this.type = "horizontal"
		this.spriteClosed = assetRegistry.top_wall_left
		this.spriteOpen = false
		this.wallHeight = 1.5
		this.wallX = 0
		this.wallY = -1.5

		this.initialize(true)
	}
}

class TopCenterWall extends WallObject {

	constructor(closed) {
		super()

		this.type = "horizontal"
		this.spriteClosed = assetRegistry.horz_wall_closed
		this.spriteOpen = assetRegistry.horz_wall_open
		this.wallHeight = 1.5
		this.wallX = 1
		this.wallY = -1.5

		this.initialize(closed)
	}
}

class TopRightWall extends WallObject {

	constructor(closed) {
		super()
		this.type = "horizontal"
		this.spriteClosed = assetRegistry.top_wall_right
		this.spriteOpen = false
		this.wallHeight = 1.5
		this.wallX = 2
		this.wallY = -1.5

		this.initialize(false)
	}
}

class RightWall extends WallObject {

	constructor(closed) {
		super()

		this.type = "horizontal"
		this.spriteClosed = assetRegistry.right_wall_closed
		this.spriteOpen = assetRegistry.right_wall_open
		this.wallHeight = 1
		this.wallX = 2
		this.wallY = 0

		this.initialize(closed)
	}
}

class BottomLeftWall extends WallObject {

	constructor(closed) {
		super()

		this.type = "horizontal"
		this.spriteClosed = assetRegistry.bottom_wall_left
		this.spriteOpen = false
		this.wallHeight = 1.5
		this.wallX = 0
		this.wallY = -1.5

		this.initialize(true)
	}
}

class BottomCenterWall extends WallObject {

	constructor(closed) {
		super()

		this.type = "horizontal"
		this.spriteClosed = assetRegistry.horz_wall_closed
		this.spriteOpen = assetRegistry.horz_wall_open
		this.wallHeight = 1.5
		this.wallX = 1
		this.wallY = -1.5

		this.initialize(closed)
	}
}

class BottomRightWall extends WallObject {

	constructor(closed) {
		super()

		this.type = "horizontal"
		this.spriteClosed = assetRegistry.bottom_wall_right
		this.spriteOpen = false
		this.wallHeight = 1.5
		this.wallX = 2
		this.wallY = -1.5

		this.initialize(false)
	}
}

class LeftWall extends WallObject {

	constructor(closed) {
		super()

		this.type = "horizontal"
		this.spriteClosed = assetRegistry.right_wall_closed
		this.spriteOpen = assetRegistry.right_wall_open
		this.wallHeight = 1
		this.wallX = 0
		this.wallY = 0

		this.initialize(closed)
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