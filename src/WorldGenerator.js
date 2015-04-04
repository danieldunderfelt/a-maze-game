import { GameData } from '../data/GameData'
import Walls from './GameObjects/static/walls/Walls'

// Multiply the x, y coords of this subcell by this many subcell sizes when rendering
// Parameters = x, y, real index
var scLocationMap = [
	[0, 0, 0, 0], // top left
	[1, 0, 1, 0], // top center
	[2, 0, 2, 0], // top right
	[2, 1, 5, 1], // middle right
	[2, 2, 8, 2], // bottom right
	[1, 2, 7, 2], // bottom center
	[0, 2, 6, 2], // bottom left
	[0, 1, 3, 3], // middle left
	[1, 1, 4, false], // center
]

var wallMap = [
	['topLeft', 3],
	['topCenter', false],
	['topRight', 1],
	['left', false],
	[false],
	['right', false],
	['bottomLeft', 3],
	['bottomCenter', false],
	['bottomRight', 1],
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
		let populatedWorld = this.traverseWorld(this.setMazePadding(worldData), this.makeSubcell.bind(this))
		let finalizedWorld = this.traverseWorld(populatedWorld, this.defineWorld.bind(this))

		return finalizedWorld
	}

	traverseWorld(mazeData, processor) {
		var traversedCells = []

		for(var my = 0; my < mazeData.length; my++) {
			var curRow = mazeData[my]
			traversedCells.push([])

			for(var mx = 0; mx < curRow.length; mx++) {
				traversedCells[my].push(processor(curRow[mx], mx, my))
			}
		}

		return traversedCells
	}

	makeSubcell(cell, mazeX, mazeY) {
		var cellDef = this.defineSubcells(cell, mazeX, mazeY)
		return cellDef
	}

	defineSubcells(cell, mazeX, mazeY) {
		var subcells = [0, 1, 2, 3, 4, 5, 6, 7, 8]

		for(var sc = 0; sc < 9; sc++) {
			var location = scLocationMap[sc]
			var wallClosed = false,
				occupied = false

			if(location[2] === 4) {
				wallClosed = false
			}
			else {
				var currentWall = location[3]
				wallClosed = cell[currentWall] === 0
			}

			var obj = false
			var wall = false

			if(wallClosed) {
				var wallName = wallMap[location[2]][0]

				if(wallName !== false) {
					wall = location[3] !== false ? [ Walls[wallName], wallMap[ location[2] ][1] ] : false // What have I done...
				}

				obj = this.defineCellItem()

				if(obj) {
					occupied = true
					obj.setLocationData(location, [mazeX, mazeY], currentWall)
				}
			}

			var subcell = {
				occupied: occupied,
				obj: obj,
				loc: location,
				mazeLoc: [mazeX, mazeY],
				index: location[2],
				wall: [wallClosed, wall]
			}

			this.callback(subcell)

			subcells.splice(location[2], 1, subcell)
		}

		return subcells
	}

	setMazePadding(mazeData) {
		var maze = mazeData, h, w, rowsTop, rowsBottom

		// Fill the start and end of the maze with some cells
		for(h = 0; h < GameData.cellPadding; h++) {
			rowsTop = []
			rowsBottom = []
			var i = 0, w = 0

			while(w < this.width) {
				var top, right, left, bottom

				left = w === 0 ? 0 : 1
				right = w === this.width - 1 ? 0 : 1

				if(i % 2 === 0) {
					top = h === GameData.cellPadding - 1 ? 0 : 1 // uhh, okay...
					bottom = 1
					rowsTop.push([top, right, bottom, left])
				}
				else {
					top = 1
					bottom = h === GameData.cellPadding - 1 ? 0 : 1
					rowsBottom.push([top, right, bottom, left])

					w++
				}

				i++
			}

			maze.unshift(rowsTop)
			maze.push(rowsBottom)
		}

		this.height += GameData.cellPadding * 2

		return maze
	}

	defineCellItem() {
		let availableObjects = this.theme.objects
		let amount = availableObjects.length

		if(amount > 0 && getRandomInt(1, 10) > 4) {
			let randomIndex = getRandomInt(0, amount - 1)
			let pickedObject = new availableObjects[randomIndex](this.stack)

			return pickedObject
		}

		return false
	}

	defineWorld(cell, x, y) {
		return cell
	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}