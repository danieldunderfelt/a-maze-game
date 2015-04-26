import WallObject from './WallObject'

class TopWall extends WallObject {

	constructor() {
		super()

		this.direction = "up"
		this.sprite = assetRegistry.horz_wall_closed
		this.wallHeight = 1
		this.wallY = -1
		this.zIndex = 0
	}
}

class RightWall extends WallObject {

	constructor() {
		super()

		this.direction = "right"
		this.sprite = assetRegistry.right_wall
		this.wallHeight = 4
		this.wallX = 0
		this.wallY = -1
		this.zIndex = 0
	}
}

class BottomWall extends WallObject {

	constructor() {
		super()

		this.direction = "down"
		this.sprite = assetRegistry.horz_wall_closed_green
		this.wallHeight = 1
		this.wallY = 2
		this.zIndex = 5
	}
}

class LeftWall extends WallObject {

	constructor() {
		super()

		this.direction = "left"
		this.sprite = assetRegistry.left_wall
		this.wallHeight = 4
		this.wallY = -1
		this.wallX = 0
		this.zIndex = 0
	}
}

export default {
	top: TopWall,
	right: RightWall,
	bottom: BottomWall,
	left: LeftWall
}