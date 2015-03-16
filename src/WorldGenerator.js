import { GameData } from '../data/GameData'

// Multiply the x, y coords of this subcell by this many subcell sizes when rendering
var scLocationMap = [
	[0, 0], // top left
	[1, 0], // top center
	[2, 0], // top right
	[2, 1], // middle right
	[2, 2], // bottom right
	[1, 2], // bottom center
	[0, 2], // bottom left
	[0, 1], // middle left
	[1, 1], // center
]

export default class {

	constructor(theme, maze, width, height) {
		this.theme = theme
		this.maze = maze
		this.width = width
		this.height = height
		this.world = this.generate()

		return this.world
	}

	generate() {
		var mazeData = this.maze
		mazeData = this.setOpenSpace(mazeData)
		mazeData = this.divideCells(mazeData)
		console.log(mazeData)
		return mazeData
	}

	divideCells(mazeData) {
		var dividedCells = mazeData

		// Go through the cells and divide into subcells
		for(var my = 0; my < dividedCells.length; my++) {
			var curRow = dividedCells[my]

			for(var mx = 0; mx < curRow.length; mx++) {
				curRow[mx] = this.makeSubcell(curRow[mx], mx, my)
			}
		}

		return dividedCells
	}

	makeSubcell(cell, mazeX, mazeY) {
		var subcells = []
		var occupiedSubcells = 0

		for(var sc = 0; sc < 9; sc++) {
			if(sc === 8) occupied = false
			else {
				var currentWall = Math.round((sc * 4) / 9)
				var occupied = cell[currentWall] === 0
			}

			var obj = false
			var location = scLocationMap[sc]

			if(occupied) {
				occupiedSubcells++
				obj = this.getThemeObject()
				obj.setLocationData(location, [mazeX, mazeY], currentWall)
			}

			var subcell = {
				occupied: occupied,
				obj: obj,
				walls: cell,
				loc: location,
				mazeLoc: [mazeX, mazeY]
			}

			subcells.push(subcell)
		}

		return subcells
	}

	setOpenSpace(mazeData) {
		var maze = mazeData

		// Fill the start and end of the maze with some empty cells
		for(let h = 0; h < this.width; h++) {
			var openRows = []

			for(let w = 0; w < this.width; w++) {
				openRows.push([1, 1, 1, 1])
			}

			maze.unshift(openRows)
			maze.push(openRows)
		}

		return maze
	}

	getThemeObject() {
		let availableObjects = this.theme.objects
		let amount = availableObjects.length
		let randomIndex = getRandomInt(0, amount - 1)
		let pickedObject = new availableObjects[randomIndex]()

		return pickedObject
	}
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}