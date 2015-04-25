class Cell {

	occupied = false
	obj = false
	loc = []
	worldX = 0
	worldY = 0
	index = 0
	wall = {}

	setAll(properties) {
		for(let prop in properties) {
			this[prop] = properties[prop]
		}
	}

	set worldLoc(locArray) {
		this.worldX = locArray[0]
		this.worldY = locArray[1]
	}

	get worldLoc() {
		return [this.worldX, this.worldY]
	}
}

export default Cell