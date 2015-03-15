import GameRenderer from './GameRenderer'

export default class {

	constructor() {
		this.canvas = document.getElementById('playerArea')
		this.ctx = this.canvas.getContext('2d')
		this.currentX = 0
		this.currentY = 0

		GameRenderer.pushRenderer(this.draw, this, "player")
	}

	setGrid(gridSize) {
		this.cellSize = this.canvas.width / gridSize
		this.baseSize = gridSize
		this.step = gridSize / 100
	}

	resetPosition() {
		this.currentX = Math.round((this.baseSize - 1) / 2)
		this.currentY = this.baseSize - 1
	}

	getPosition() {
		return [this.currentX, this.currentY]
	}

	draw() {
		var size = this.cellSize / 4
		var posX = (this.currentX * this.cellSize) + (size * 2.5)
		var posY = (this.currentY * this.cellSize) + (size * 2.5)

		this.clearCanvas()
		this.ctx.beginPath()
		this.ctx.rect(posX - size, posY - size, size, size)
		this.ctx.fillStyle = 'green'
		this.ctx.fill()
	}

	move(position) {
		this.currentX = position[0]
		this.currentY = position[1]
	}

	calculatePosition(dir) {
		var nextStep

		if(dir === 'up') {
			nextStep = this.currentY - this.step

			if(nextStep < -(this.step * 10)) return [this.currentX, -(this.step * 10)]
			else return [this.currentX, nextStep]
		}

		if(dir === 'down') {
			nextStep = this.currentY + this.step

			if(nextStep > this.baseSize - this.step * 10) return false
			else return [this.currentX, nextStep]
		}

		if(dir === 'left') {
			nextStep = this.currentX - this.step

			if(nextStep < 0) nextStep = this.baseSize - 1
			return [nextStep, this.currentY]
		}

		if(dir === 'right') {
			nextStep = this.currentX + this.step

			if(nextStep > this.baseSize - 1) nextStep = 0
			return [nextStep, this.currentY]
		}
	}

	clearCanvas() {
		this.ctx.save();
		this.ctx.setTransform(1,0,0,1,0,0);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.restore();
	}
}