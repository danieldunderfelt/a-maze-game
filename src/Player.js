import GameRenderer from './GameRenderer'
import DefaultObject from '../../src/GameObjects/DefaultObject'
import PlayerObject from './GameObjects/PlayerObject'
import WorldController from './WorldController'

export default class {

	constructor() {
		this.avatar = {}
		this.x = 0
		this.y = 0
		this.currentSubcell = null
		this.currentSubcellIndex = null
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
		this.currentSubcellIndex = 8

		this.currentSubcell = WorldController.insert(this.avatar, this.x, this.y, this.currentSubcellIndex)
	}

	getPosition() {
		return {
			x: this.x,
			y: this.y,
			subcell: this.currentSubcell
		}
	}

	move(dir) {
		var nextPos = WorldController.getPosition(this.x, this.y, this.currentSubcellIndex, dir)
		var move = WorldController.moveObject(this.avatar, this.x, this.y, this.currentSubcellIndex - 1)
		if(!move) return false

		move()
	}
}