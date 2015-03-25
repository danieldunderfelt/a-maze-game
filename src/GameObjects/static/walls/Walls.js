import WallObject from './WallObject'
import { assetRegistry } from '../../../../data/assetRegistry'

class TopLeftWall extends WallObject {

	constructor(closed) {
		this.type = "horizontal"
		this.spriteClosed = assetRegistry.top_wall_left
		this.spriteOpen = false
		this.wallHeight = 1.5
		this.wallX = 0
		this.wallY = -1.5

		super(true)
	}
}

class TopCenterWall extends WallObject {

	constructor(closed) {
		this.type = "horizontal"
		this.spriteClosed = assetRegistry.horz_wall_closed
		this.spriteOpen = assetRegistry.horz_wall_open
		this.wallHeight = 1.5
		this.wallX = 1
		this.wallY = -1.5

		super(closed)
	}
}

class TopRightWall extends WallObject {

	constructor(closed) {
		this.type = "horizontal"
		this.spriteClosed = assetRegistry.top_wall_right
		this.spriteOpen = false
		this.wallHeight = 1.5
		this.wallX = 2
		this.wallY = -1.5

		super(false)
	}
}

class RightWall extends WallObject {

	constructor(closed) {
		this.type = "horizontal"
		this.spriteClosed = assetRegistry.right_wall_closed
		this.spriteOpen = assetRegistry.right_wall_open
		this.wallHeight = 1
		this.wallX = 2
		this.wallY = 0

		super(closed)
	}
}

class BottomLeftWall extends WallObject {

	constructor(closed) {
		this.type = "horizontal"
		this.spriteClosed = assetRegistry.bottom_wall_left
		this.spriteOpen = false
		this.wallHeight = 1.5
		this.wallX = 0
		this.wallY = -1.5

		super(true)
	}
}

class BottomCenterWall extends WallObject {

	constructor(closed) {
		this.type = "horizontal"
		this.spriteClosed = assetRegistry.horz_wall_closed
		this.spriteOpen = assetRegistry.horz_wall_open
		this.wallHeight = 1.5
		this.wallX = 1
		this.wallY = -1.5

		super(closed)
	}
}

class BottomRightWall extends WallObject {

	constructor(closed) {
		this.type = "horizontal"
		this.spriteClosed = assetRegistry.bottom_wall_right
		this.spriteOpen = false
		this.wallHeight = 1.5
		this.wallX = 2
		this.wallY = -1.5

		super(false)
	}
}

class LeftWall extends WallObject {

	constructor(closed) {
		this.type = "horizontal"
		this.spriteClosed = assetRegistry.right_wall_closed
		this.spriteOpen = assetRegistry.right_wall_open
		this.wallHeight = 1
		this.wallX = 0
		this.wallY = 0

		super(closed)
	}
}

export default [
	TopLeftWall,
	TopCenterWall,
	TopRightWall,
	LeftWall,
	false,
	RightWall,
	BottomLeftWall,
	BottomCenterWall,
	BottomRightWall
]