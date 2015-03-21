import { GameData } from '../data/GameData'

// Multiply the x, y coords of this subcell by this many subcell sizes when rendering
var scLocationMap = [
	[0, 0, 0], // top left
	[1, 0, 1], // top center
	[2, 0, 2], // top right
	[2, 1, 5], // middle right
	[2, 2, 8], // bottom right
	[1, 2, 7], // bottom center
	[0, 2, 6], // bottom left
	[0, 1, 3], // middle left
	[1, 1, 4], // center
]

export default class {

	constructor(theme, maze, width, height, callback) {
		this.theme = theme
		this.maze = maze
		this.width = width
		this.height = height
		this.callback = callback
		this.world = this.generate()

		return this.world
	}

	generate() {
		let worldData = this.maze
		return this.divideCells(this.setOpenSpace(worldData))
	}

	divideCells(mazeData) {
		var dividedCells = []

		// Go through the cells and divide into subcells
		for(var my = 0; my < mazeData.length; my++) {
			var curRow = mazeData[my]
			dividedCells.push([])

			for(var mx = 0; mx < curRow.length; mx++) {
				dividedCells[my].push(this.makeSubcell(curRow[mx], mx, my))
			}
		}

		return dividedCells
	}

	makeSubcell(cell, mazeX, mazeY) {
		var subcells = [0, 1, 2, 3, 4, 5, 6, 7, 8]
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
				obj = this.populateSubcell(mazeX, mazeY, sc, currentWall)
				obj.setLocationData(location, [mazeX, mazeY], currentWall)
			}

			var subcell = {
				occupied: occupied,
				obj: obj,
				loc: location,
				mazeLoc: [mazeX, mazeY],
				index: location[2]
			}

			this.callback(subcell)

			subcells.splice(location[2], 1, subcell)
		}

		return subcells
	}

	setOpenSpace(mazeData) {
		var maze = mazeData

		// Fill the start and end of the maze with some empty cells
		for(let h = 0; h < GameData.emptyCellPadding; h++) {
			var openRows = []

			for(let w = 0; w < this.width; w++) {
				openRows.push([1, 1, 1, 1])
			}

			maze.unshift(openRows)
			maze.push(openRows)
		}

		return maze
	}

	populateSubcell(mazeX, mazeY, index, currentWall) {
		var obj

		return this.getThemeObject()
	}

	getThemeObject() {
		let availableObjects = this.theme.objects
		let amount = availableObjects.length
		let randomIndex = getRandomInt(0, amount - 1)
		let pickedObject = new availableObjects[randomIndex](this.stack)

		return pickedObject
	}

	getThemeRoomPart(type, faceDirection) {

	}
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}