export default class {

	constructor() {
		this.canvas = document.getElementById('playerArea')
		this.ctx = this.canvas.getContext('2d')
	}

	initialize(gridSize) {
		this.cellSize = this.canvas.width / gridSize
		this.baseSize = gridSize
		this.currentX = Math.round((this.baseSize - 1) / 2)
		this.currentY = this.baseSize - 1
	}

	getPosition() {
		return [this.currentX, this.currentY]
	}

	draw() {
		var size = this.cellSize / 2
		var posX = (this.currentX * this.cellSize) + (size * 1.5)
		var posY = (this.currentY * this.cellSize) + (size * 1.5)

		this.clearCanvas()
		this.ctx.beginPath()
		this.ctx.rect(posX - size, posY - size, size, size)
		this.ctx.fillStyle = 'green'
		this.ctx.fill()
	}

	move(position, direction) {
		this.currentX = position[0]
		this.currentY = position[1]
		this.draw()
	}

	calculatePosition(dir) {
		var newPos

		if(dir === 'up') {
			let proposal = this.currentY - 0.5
			if(proposal < 0) return [this.currentX, this.currentY]
			newPos = [this.currentX, proposal]
		}
		else if(dir === 'down') {
			let proposal = this.currentY + 1
			if(proposal > this.baseSize) return [this.currentX, this.currentY]
			newPos = [this.currentX, proposal]
		}
		else if(dir === 'left') {
			let proposal = this.currentX - 1
			if(proposal < 0) return [this.currentX, this.currentY]
			newPos = [proposal, this.currentY]
		}
		else if(dir === 'right') {
			let proposal = this.currentX + 1
			if(proposal > this.baseSize) [this.currentX, this.currentY]
			newPos = [proposal, this.currentY]
		}

		return newPos
	}

	clearCanvas() {
		this.ctx.save();
		this.ctx.setTransform(1,0,0,1,0,0);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.restore();
	}
}