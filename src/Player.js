export default class {

	constructor() {
		this.canvas = document.getElementById('playerArea')
		this.ctx = this.canvas.getContext('2d')
	}

	initialize(gridSize) {
		this.cellSize = this.canvas.width / gridSize
		this.baseSize = gridSize
		this.currentPosition = [Math.round((this.baseSize - 1) / 2), this.baseSize - 1]
	}

	getPosition() {
		return this.currentPosition
	}

	draw() {
		var size = this.cellSize / 2
		var posX = (this.currentPosition[0] * this.cellSize) + (size * 1.5)
		var posY = (this.currentPosition[1] * this.cellSize) + (size * 1.5)

		this.clearCanvas()
		this.ctx.beginPath()
		this.ctx.rect(posX - size, posY - size, size, size)
		this.ctx.fillStyle = 'green'
		this.ctx.fill()
	}

	move(dir, dryrun = false) {
		let newPos = this.currentPosition

		if(dir === 'up') newPos = [this.currentPosition[0], this.currentPosition[1] - 0.5]
		else if(dir === 'down') newPos = [this.currentPosition[0], this.currentPosition[1] + 1]
		else if(dir === 'left') newPos = [this.currentPosition[0] - 1, this.currentPosition[1]]
		else if(dir === 'right') newPos = [this.currentPosition[0] + 1, this.currentPosition[1]]

		if((newPos[0] > this.baseSize - 1 || newPos[0] < 0) || (newPos[1] > this.baseSize - 0.5 || newPos[1] < 0)) {
			return false
		}

		if(dryrun) return newPos

		this.currentPosition = newPos
		this.draw()
	}

	clearCanvas() {
		this.ctx.save();
		this.ctx.setTransform(1,0,0,1,0,0);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.restore();
	}
}