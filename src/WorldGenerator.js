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
		let interactiveCells = this.setInteractions(definedCells)

		return populatedWorld
	}

	defineWorld() {
		var mazeData = this.maze
		var traversedCells = []
		var index = 0

		for(var my = 0; my < mazeData.length; my++) {
			var curRow = mazeData[my]

			for(var mx = 0; mx < curRow.length; mx++) {
				traversedCells.push(this.defineCell(curRow[mx], mx, my, index))
				index++
			}
		}

		return traversedCells
	}

	defineCell(walls, mazeX, mazeY, index) {
		var wallClosed = false

		var cellProperties = {
			loc: {x: mazeX, y: mazeY},
			index: index,
			walls: walls,
			actions: []
		}

		var cell = new Cell(cellProperties)
		this.callback(cell)

		return cell
	}

	setInteractions(cells) {
		for(let c = 0; c < cells.length; c++) {
			var cell = cells[c]
		}

		return cells
	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}