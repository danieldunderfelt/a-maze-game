import GameRenderer from './GameRenderer'
import PlayerObject from './GameObjects/DefaultObject'
import WorldController from './WorldController'

export default class {

	constructor() {
		this.avatar = {}
		this.x = 0
		this.y = 0
		this.subcell = null
		this.subcellIndex = null
		this.worldData = {}
	}

	initLevel() {
		this.avatar = new PlayerObject(this)
		this.worldData = WorldController.getCurrentWorldData()
		this.setInitialPosition()
	}

	setInitialPosition() {
		this.x = Math.round((this.worldData.width - 1) / 2)
		this.y = Math.round(this.worldData.height - 1)
		this.subcellIndex = 4

		this.subcell = WorldController.insert(this.avatar, this.x, this.y, this.subcellIndex)
	}

	getPosition() {
		return {
			x: this.x,
			y: this.y,
			subcell: this.subcell
		}
	}

	move(dir) {
		var nextPos = WorldController.getPosition(this.x, this.y, this.subcellIndex, dir)

		if(!nextPos) return false

		var move = WorldController.moveObject(this.avatar, nextPos.x, nextPos.y, nextPos.index)

		if(!move) return false

		var newSubcell = move()

		this.subcell = newSubcell
		this.x = newSubcell.mazeLoc[0],
		this.y = newSubcell.mazeLoc[1],
		this.subcellIndex = newSubcell.index

		return true
	}
}