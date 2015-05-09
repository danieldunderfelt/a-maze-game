import Cell from './Cell'

export default class {

	constructor(maze, width, height, callback) {
		this.maze = maze
		this.width = width
		this.height = height
		this.callback = callback
		this.world = this.generate()

		return this.world
	}

	generate() {
		let definedCells = this.defineWorld()
		let interactiveWorld = this.setInteractions(definedCells)

		return interactiveWorld
	}

	defineWorld() {
		var traversedCells = []
		var index = 0

		for(let my = 0; my < this.maze.length; my++) {
			let curRow = this.maze[my]

			for(let mx = 0; mx < curRow.length; mx++) {
				let loc = {x: mx, y: my}
				traversedCells.push(this.defineCell(curRow[mx], loc, index))
				index++
			}
		}

		return traversedCells
	}

	defineCell(walls, loc, index) {
		var cellProperties = {
			loc: loc,
			index: index,
			walls: walls,
			actions: []
		}

		var cell = new Cell(cellProperties)
		this.callback(cell)

		return cell
	}

	setInteractions(cells) {
		/*for(let c = 0; c < cells.length; c++) {
			var cell = cells[c]
		}*/

		return cells
	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}