import { GameData } from './data/GameData'
import Cell from './GameObjects/Cell'

// Parameters = x, y, real index, wall index
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

export default class {

	constructor(theme, maze, width, height, callback) {
		this.theme = theme
		this.maze = maze
		this.width = width
		this.height = height
		this.callback = callback
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
		var subcellDef = this.defineSubcells(cell, mazeX, mazeY)
		this.defineCell(cell, subcellDef)
		return subcellDef
	}

	defineCell(cell, subcells) {
		//this.createWalls(cell, subcells)
		//this.createCorners(cell, subcells)
	}

	createWalls(cell, subcells) {
		for(let w = 0; w < cell.length; w++) {
			if(cell[w] === 1) continue

			var wallIndex = w,
				axis, loc, pos

			if(wallIndex === 0) {
				axis = 1
				loc = 0
				pos = 'top'
			}

			if(wallIndex === 2) {
				axis = 1
				loc = 2
				pos = 'bottom'
			}

			if(wallIndex === 1) {
				axis = 0
				loc = 2
				pos = 'right'
			}

			if(wallIndex === 3) {
				axis = 0
				loc = 0
				pos = 'left'
			}

			this.setWall(subcells, axis, loc, pos)
		}
	}

	setWall(subcells, axis, loc, pos) {
		var wallObj = Walls[pos]

		for(let sc = 0; sc < subcells.length; sc++) {
			var cell = subcells[sc]

			if(cell.loc[axis] !== loc) continue

			var wall = new wallObj()

			if(typeof wall.wallX !== "undefined") wall.wallX += cell.loc[0]
			else wall.wallX = cell.loc[0]

			cell.wall.closed = true
			cell.wall.walls.push(wall)
		}
	}

	createCorners(cell, subcells) {
		var corners = [false, false, false, false]

		if(!cell[3] && !cell[0]) corners.splice(3, 1, {name: 'topLeft', i: 0}) // top left
		if(!cell[0] && !cell[1]) corners.splice(0, 1, {name: 'topRight', i: 2}) // top right
		if(!cell[1] && !cell[2]) corners.splice(1, 1, {name: 'bottomRight', i: 8}) // bottom right
		if(!cell[2] && !cell[3]) corners.splice(2, 1, {name: 'bottomLeft', i: 6}) // bottom left

		for(let c = 0; c < corners.length; c++) {
			if(!corners[c]) continue
			var corner = corners[c]
			var subcell = subcells[corner.i]

			var cornerObj = Corners[corner.name]

			var cornerInst = new cornerObj()
			cornerInst.wallX = subcell.loc[0]

			subcell.wall.corners.push(cornerInst)
		}
	}

	defineSubcells(cell, mazeX, mazeY) {
		var subcells = [0, 1, 2, 3, 4, 5, 6, 7, 8]

		for(var sc = 0; sc < 9; sc++) {
			var location = scLocationMap[sc]
			var wallClosed = false,
				occupied = false

			if(location[2] !== 4) {
				var currentWall = location[3], wallIndex

				wallClosed = cell[currentWall] === 0
			}

			var obj = false

			if(wallClosed) {
				obj = this.defineCellItem()

				if(obj) {
					occupied = true
					obj.setLocationData(location, [mazeX, mazeY], currentWall)
				}
			}

			var cellProperties = {
				occupied: occupied,
				obj: obj,
				loc: location,
				worldLoc: [mazeX, mazeY],
				index: location[2],
				wall: { closed: false, walls: [], corners: [] }
			}

			var subcell = new Cell()
			subcell.setAll(cellProperties)

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

		if(amount > 0 && getRandomInt(1, 10) > 7) {
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