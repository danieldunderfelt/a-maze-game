class Cell {

	constructor(definition) {
		this.loc = definition.loc || {x: 0, y: 0}
		this.actions = definition.actions || []
		this.walls = definition.walls || [0, 0, 0, 0]
		this.index = definition.index || 0
	}

	onEnter() {

	}

	onLeave() {

	}

	set action(action) {
		this.actions.push(action)
	}

	set walls(walls) {
		if(walls.length === 4) this.walls = walls
	}

	set x(x) {
		this.loc.x = x
	}

	set y(y) {
		this.loc.y = y
	}

	get x() { return this.loc.x }
	get y() { return this.loc.y }
}

export default Cell