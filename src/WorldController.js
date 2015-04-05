import { GameData } from '../data/GameData'
import { scDirectionMap } from '../data/subcellDirectionMap'
import { generateMaze } from './MazeGenerator'
import WorldGenerator from './WorldGenerator'

class WorldController {

	constructor() {
		this.currentWorld = {}
		this.layout = []
		this.objects = {}
	}

	newWorld() {
		this.saveWorld()
		this.currentWorld = {}
		this.objects = {}
	}

	generateWorld(theme, width, height) {
		let generatedMaze = generateMaze(width, height)

		this.currentWorld.theme = theme
		this.layout = new WorldGenerator(theme, generatedMaze, width, height, this.cellCallback.bind(this))
		this.currentWorld.height = this.layout.length
		this.currentWorld.width = width
	}

	cellCallback(subcell) {
		var objId = subcell.obj.id
		this.objects[objId] = subcell
	}

	getCurrentWorldData() {
		return this.currentWorld
	}

	getLayoutGenerator() {
		var self = this

		return function* () {
			var i = 0
			while(i < self.layout.length) {
				yield self.layout[i]
				i++
			}
		}
	}

	saveWorld() {

	}

	getPosition(x, y, index, dir) {
		var newCoords = scDirectionMap[index][dir]
		var newX = x + newCoords.x
		var newY = y + newCoords.y

		if(newX > this.currentWorld.width - 1 || newX < 0 || newY > this.currentWorld.height - 1 || newY < 0) return false
		var nextSubcell = this.getSubcell(newX, newY, newCoords.index)

		if(!nextSubcell) return false

		return {
			x: nextSubcell.mazeLoc[0],
			y: nextSubcell.mazeLoc[1],
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
			mazeLoc: subcell.mazeLoc,
			index: subcell.index,
			wall: subcell.wall
		}

		this.layout[subcell.mazeLoc[1]][subcell.mazeLoc[0]].subcells[subcell.loc[2]] = newSubcell
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
			mazeLoc: moveTo.mazeLoc,
			index: moveTo.index,
			wall: moveTo.wall
		}

		var moveCommitter = () => {
			this.layout[y][x].subcells[moveTo.loc[2]] = newSubcell
			this.removeObject(obj.id)
			this.objects[obj.id] = newSubcell

			return newSubcell
		}

		if(!instantCommit) return moveCommitter
		return moveCommitter()
	}

	checkWallCollision(obj, dir) {
		var subcell = obj.controller.subcell
		if(!subcell.wall.closed) return false

		if(subcell.wall.walls.some(el => el.direction === dir )) return true // some <3

		return false
	}

	getSubcell(x, y, index) {
		var cell = this.layout[y][x].subcells[index]
		return typeof cell === "undefined" ? false : cell
	}

	getSubcellByObject(objId) {
		var obj = this.objects[objId]
		return typeof obj === "undefined" ? false : obj
	}
}

export default new WorldController()