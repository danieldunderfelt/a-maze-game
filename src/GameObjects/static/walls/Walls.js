import WallObject from './WallObject'
import { assetRegistry } from '../../../../data/assetRegistry'

class TopWall extends WallObject {

	constructor(closed, part) {
		this.type = "horizontal"
		this.sprites = {
			a: assetRegistry.top_wall_left,
			b: assetRegistry.top_wall_right,
			open: assetRegistry.horz_wall_open,
			closed: assetRegistry.horz_wall_closed
		},
		this.wallHeight = 1.5

		super(closed, part)
	}
}

class RightWall extends WallObject {

	constructor(closed, part) {
		this.type = "vertical"
		this.sprites = {
			a: false,
			b: false,
			open: assetRegistry.right_wall_open,
			closed: assetRegistry.right_wall_closed
		},
		this.wallHeight = 1

		super(closed, part)
	}
}

class BottomWall extends WallObject {

	constructor(closed, part) {
		this.type = "horizontal"
		this.sprites = {
			a: assetRegistry.bottom_wall_left,
			b: assetRegistry.bottom_wall_right,
			open: assetRegistry.horz_wall_open,
			closed: assetRegistry.horz_wall_closed
		},
		this.wallHeight = 1.5

		super(closed, part)
	}
}

class LeftWall extends WallObject {

	constructor(closed, part) {
		this.type = "vertical"
		this.sprites = {
			a: false,
			b: false,
			open: assetRegistry.right_wall_open,
			closed: assetRegistry.right_wall_closed
		},
		this.wallHeight = 1

		super(closed, part)
	}
}

export default [
	TopWall,
	RightWall,
	BottomWall,
	LeftWall
]