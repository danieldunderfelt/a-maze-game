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
		this.currentWorld.height = height + (width * 2)
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

	insert(obj, x, y, index) {
		var cell = this.layout[y][x][index]

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
			index: subcell.index
		}

		this.layout[subcell.mazeLoc[1]][subcell.mazeLoc[0]][subcell.index] = newSubcell
		delete this.objects[objId]
	}

	moveObject(obj, x, y, index, instantCommit = false) {
		var moveTo = this.getSubcell(x, y, index)

		if(!moveTo || moveTo.occupied) return false

		var newSubcell = {
			occupied: true,
			obj: obj,
			loc: moveTo.loc,
			mazeLoc: moveTo.mazeLoc,
			index: moveTo.index
		}

		var moveCommitter = () => {
			this.layout[y][x][index] = newSubcell
			this.removeObject(obj.id)
			this.objects[obj.id] = newSubcell
		}

		if(!instantCommit) return moveCommitter
		return moveCommitter()
	}

	getSubcell(x, y, index) {
		var cell = this.layout[y][x][index]
		return typeof cell === "undefined" ? false : cell
	}

	getSubcellByObject(objId) {
		var obj = this.objects[objId]
		return typeof obj === "undefined" ? false : obj
	}

	getPosition(x, y, index, dir) {

	}
}

export default new WorldController()