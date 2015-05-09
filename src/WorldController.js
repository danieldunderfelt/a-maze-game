import { generateMaze } from './MazeGenerator'
import WorldGenerator from './WorldGenerator'
import MainRenderer from './MainRenderer'

class WorldController {

	verticalStep = 0

	constructor() {
		this.currentWorld = {}
		this.layout = []
		this.objects = {}
		this.renderer = false
	}

	newWorld() {
		this.currentWorld = {}
		this.objects = {}
	}

	generateWorld(width, height) {
		let generatedMaze = generateMaze(width, height)
		this.layout = new WorldGenerator(generatedMaze, width, height, this.cellCallback.bind(this))
		this.currentWorld.height = height
		this.currentWorld.width = width
	}

	cellCallback(cell) {
		//
	}

	getCurrentWorldData() {
		return this.currentWorld
	}

	getLayout() {
		return this.layout
	}

	move(direction) {
		if(direction === "up") {
			this.renderer.moveMaze(this.verticalStep * 0.8, direction)
		}
		if(direction === "down") {
			this.renderer.moveMaze(~this.verticalStep * 0.4, direction)
		}
	}

	getPosition(x, y, index, dir) {
		var newCoords = scDirectionMap[index][dir]
		var newX = x + newCoords.x
		var newY = y + newCoords.y

		if(newX > this.currentWorld.width - 1 || newX < 0 || newY > this.currentWorld.height - 1 || newY < 0) return false
		var nextSubcell = this.getSubcell(newX, newY, newCoords.index)

		if(!nextSubcell) return false

		return {
			x: nextSubcell.worldLoc[0],
			y: nextSubcell.worldLoc[1],
			index: nextSubcell.loc[2]
		}
	}

	insert(obj, x, y, index) {
		var cell = this.getSubcell(x, y, index)

		if(typeof cell === "undefined" || cell.occupied) return false

		cell.obj = obj
		cell.occupied = true

		this.objects[obj.id] = cell

		return cell
	}

	removeObject(objId) {
		var subcell = this.getSubcellByObject(objId)

		var newSubcell = {
			occupied: false,
			obj: false,
			loc: subcell.loc,
			worldLoc: subcell.worldLoc,
			index: subcell.index,
			wall: subcell.wall
		}

		this.layout[subcell.worldLoc[1]][subcell.worldLoc[0]][subcell.loc[2]] = newSubcell
		delete this.objects[objId]
	}

	moveObject(obj, x, y, index, dir, instantCommit = false) {
		var moveTo = this.getSubcell(x, y, index)

		if(!moveTo || moveTo.occupied) return false
		if(this.checkWallCollision(obj, dir)) return false

		var newSubcell = {
			occupied: true,
			obj: obj,
			loc: moveTo.loc,
			worldLoc: moveTo.worldLoc,
			index: moveTo.index,
			wall: moveTo.wall
		}

		var moveCommitter = () => {
			this.layout[y][x][moveTo.loc[2]] = newSubcell
			this.removeObject(obj.id)
			this.objects[obj.id] = newSubcell

			return newSubcell
		}

		if(!instantCommit) return moveCommitter
		return moveCommitter()
	}

	checkWallCollision(obj, dir) {
		//return false
		var subcell = obj.controller.subcell
		if(!subcell.wall.closed) return false

		if(subcell.wall.walls.some(el => el.direction === dir )) return true // some <3

		return false
	}

	getSubcell(x, y, index) {
		var cell = this.layout[y][x][index]
		return typeof cell === "undefined" ? false : cell
	}

	getSubcellByObject(objId) {
		var obj = this.objects[objId]
		return typeof obj === "undefined" ? false : obj
	}
}

export default new WorldController()