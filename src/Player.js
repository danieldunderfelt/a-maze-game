import GameRenderer from './GameRenderer'
import DefaultObject from '../../src/GameObjects/DefaultObject'
import PlayerObject from './GameObjects/PlayerObject'

export default class {

	constructor() {
		this.world = []
		this.avatar = {}
	}

	initAvatar() {
		this.avatar = new PlayerObject(this)
	}

	setGrid(gridSize, world) {
		this.cellSize = this.canvas.width / gridSize
		this.baseSize = gridSize
		this.step = gridSize / 50
	}

	resetPosition() {
		this.currentX = Math.round((this.baseSize - 1) / 2)
		this.currentY = this.baseSize - 1
	}

	getPosition() {
		return [this.currentX, this.currentY]
	}

	draw() {

	}

	move(position) {
		this.currentX = position[0]
		this.currentY = position[1]
	}

	calculatePosition(dir) {
		var nextStep

		if(dir === 'up') {
			nextStep = this.currentY - this.step

			if(nextStep < -(this.step * 5)) return [this.currentX, -(this.step * 5)]
			else return [this.currentX, nextStep]
		}

		if(dir === 'down') {
			nextStep = this.currentY + this.step

			if(nextStep > this.baseSize - this.step * 5) return false
			else return [this.currentX, nextStep]
		}

		if(dir === 'left') {
			nextStep = this.currentX - this.step

			if(nextStep < -(this.step * 5)) nextStep = this.baseSize - (this.step * 5)
			return [nextStep, this.currentY]
		}

		if(dir === 'right') {
			nextStep = this.currentX + this.step

			if(nextStep > this.baseSize - (this.step * 5)) nextStep = -(this.step * 5)
			return [nextStep, this.currentY]
		}
	}
}