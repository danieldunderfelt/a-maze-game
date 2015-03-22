import WallObject from './WallObject'

class HorizontalWall extends WallObject {

	constructor() {
		super()
		this.type = "horizontal"
		this.sprite = this.assets.horizontal_wall_tile
		this.wallHeight = 1.5
		this.wallWidth = 1
		this.fill = '#332223'
		this.strokeWidth = 0
		this.stroke = '#222222'
	}
}

class SideWall extends WallObject {

	constructor() {
		super()
		this.type = "side"
		this.sprite = this.assets.side_wall
		this.wallHeight = 3
		this.wallWidth = 0.1
		this.fill = '#111111'
		this.strokeWidth = 2
		this.stroke = '#4c4c4c'
	}
}

class SideOpeningWall extends WallObject {

	constructor() {
		super()
		this.type = "side_opening"
		this.sprite = this.assets.side_wall_opening
		this.wallHeight = 2.5
		this.wallWidth = 0.1
		this.fill = '#111111'
		this.strokeWidth = 2
		this.stroke = '#4c4c4c'
	}
}

export default {
	"horizontal": HorizontalWall,
	"side": SideWall,
	"side_opening": SideOpeningWall
}