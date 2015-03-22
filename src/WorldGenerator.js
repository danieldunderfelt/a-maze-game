import { GameData } from '../data/GameData'

// Multiply the x, y coords of this subcell by this many subcell sizes when rendering
// Parameters = x, y, real index, applicable cell wall
var scLocationMap = [
	[0, 0, 0, 0], // top left
	[1, 0, 1, 0], // top center
	[2, 0, 2, 1], // top right
	[2, 1, 5, 1], // middle right
	[2, 2, 8, 2], // bottom right
	[1, 2, 7, 2], // bottom center
	[0, 2, 6, 3], // bottom left
	[0, 1, 3, 3], // middle left
	[1, 1, 4, false], // center
]

var wallMap = [
	[
		{
			parts: ["horizontal", "side_opening"],
			loc: [{ x: 0, y: -1.5 }, { x: 0, y: -1.5 }]
		}
	],
	[
		{
			parts: ["horizontal"],
			loc: [{ x: 0, y: -1.5 }]
		}
	],
	[
		{
			parts: ["horizontal", "side_opening"],
			loc: [{ x: 0, y: -1.5 }, { x: 1, y: -1.5 }]
		}
	],
	[
		{
			parts: ["side"],
			loc: [{ x: 0, y: -1 }]
		}
	],
	[
		{
			parts: [],
			loc: []
		}
	],
	[
		{
			parts: ["side"],
			loc: [{ x: 1, y: -1 }]
		}
	],
	[
		{
			parts: ["horizontal"],
			loc: [{ x: 0, y: -1.5 }]
		}
	],
	[
		{
			parts: ["horizontal"],
			loc: [{ x: 0, y: -1.5 }]
		}
	],
	[
		{
			parts: ["horizontal"],
			loc: [{ x: 0, y: -1.5 }]
		}
	],
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

	defineWall(cellLoc, wall) {
		var walls = []

		if(wall === false) return walls

		var definition = wallMap[cellLoc[2]]

		walls.push(definition)

		return walls
	}

	defineSubcells(cell, mazeX, mazeY) {
		var subcells = [0, 1, 2, 3, 4, 5, 6, 7, 8]

		for(var sc = 0; sc < 9; sc++) {
			var location = scLocationMap[sc]

			if(sc === 8) occupied = false

			else {
				var currentWall = location[3]
				var occupied = cell[currentWall] === 0
			}

			var obj = false

			if(occupied) {
				obj = this.getThemeObject()
				obj.setLocationData(location, [mazeX, mazeY], currentWall)
			}

			var subcell = {
				occupied: occupied,
				obj: obj,
				loc: location,
				mazeLoc: [mazeX, mazeY],
				index: location[2],
				walls: this.defineWall(location, occupied)
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

	getThemeObject() {
		let availableObjects = this.theme.objects
		let amount = availableObjects.length
		let randomIndex = getRandomInt(0, amount - 1)
		let pickedObject = new availableObjects[randomIndex](this.stack)

		return pickedObject
	}

	defineWorld(cell, x, y) {
		return cell
	}
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}