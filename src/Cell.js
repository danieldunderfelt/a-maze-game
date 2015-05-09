import PIXI from 'pixi.js'

class Cell {

	constructor(definition) {
		this.loc = definition.loc || {x: 0, y: 0}
		this.actions = definition.actions || []
		this.walls = definition.walls || [0, 0, 0, 0]
		this.index = definition.index || 0

		this.graphic = new PIXI.Graphics()
		this.drawLengthFraction = 0
	}

	// Cell graphics rendering

	draw(cellSize) {

		this.renderLoc = {
			x: this.loc.x * cellSize,
			y: this.loc.y * cellSize,
		}

		this.drawWalls(cellSize)
	}

	drawWalls(cs) {
		this.graphic.clear()

		this.graphic.beginFill(0x000000, 0)
		this.graphic.lineStyle(1.5, 0xffffff, 1)

		this.graphic.moveTo(this.renderLoc.x, this.renderLoc.y)
		if(this.walls[0] === 0) this.graphic.lineTo(this.renderLoc.x + cs, this.renderLoc.y)

		this.graphic.moveTo(this.renderLoc.x + cs, this.renderLoc.y)
		if(this.walls[1] === 0) this.graphic.lineTo(this.renderLoc.x + cs, this.renderLoc.y + cs)

		this.graphic.moveTo(this.renderLoc.x + cs, this.renderLoc.y + cs)
		if(this.walls[2] === 0) this.graphic.lineTo((this.renderLoc.x + cs) - cs, this.renderLoc.y + cs)

		this.graphic.moveTo(this.renderLoc.x, this.renderLoc.y + cs)
		if(this.walls[3] === 0) this.graphic.lineTo(this.renderLoc.x, (this.renderLoc.y + cs) - cs)

		this.graphic.endFill()
	}

	getDrawlength(fullLength) {
		return fullLength * this.drawLengthFraction
	}

	// Player-related callback hooks

	onEnter() {

	}

	onLeave() {

	}

	onOccupied() {

	}

	onEmpty() {

	}
}

export default Cell