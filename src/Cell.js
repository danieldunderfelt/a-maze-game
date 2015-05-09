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
}

export default Cell