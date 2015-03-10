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

	move(position) {
		this.currentX = position[0]
		this.currentY = position[1]
		this.draw()
	}

	calculatePosition(dir) {
		var proposal

		if(dir === 'up') {
			proposal = this.currentY - 0.5

			if(proposal < 0) return false
			else return [this.currentX, proposal]
		}

		if(dir === 'down') {
			proposal = this.currentY + 1

			if(proposal > this.baseSize - 0.5) return false
			else return [this.currentX, proposal]
		}

		if(dir === 'left') {
			proposal = this.currentX - 1

			if(proposal < 0) return false
			else return [proposal, this.currentY]
		}

		if(dir === 'right') {
			proposal = this.currentX + 1

			if(proposal > this.baseSize - 1) return false
			else return [proposal, this.currentY]
		}
	}

	clearCanvas() {
		this.ctx.save();
		this.ctx.setTransform(1,0,0,1,0,0);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.restore();
	}
}