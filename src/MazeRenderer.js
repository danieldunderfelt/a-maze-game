export default class {

	constructor(data, size) {
		this.canvas = document.getElementById('mazeArea')
		this.ctx = this.canvas.getContext('2d')
		this.mazeData = data
		this.size = size
	}

	draw() {
		this.clearCanvas()
		this.renderMaze()
	}

	moveMaze(dir) {
		var move = dir === 'up' ? ~(Math.round(this.canvas.width / this.size)) : Math.round(this.canvas.width / this.size)
		this.ctx.translate(0, move)
	}

	setInitialPosition() {
		this.ctx.translate(0, -(this.canvas.height))
	}

	renderMaze() {
		var cellWidth = Math.round(this.canvas.width / this.size)
		this.ctx.beginPath()

		for (var i = 0; i < this.mazeData.length; i++) {
			for (var j = 0; j < this.mazeData[i].length; j++) {

				if (this.mazeData[i][j][0] === 0 && j !== 0 && i !== 0) { // top
					let startY = i * cellWidth
					let startX = j * cellWidth
					let endY = i * cellWidth
					let endX = (j + 1) * cellWidth

					this.ctx.moveTo(startX, startY)
					this.ctx.lineTo(endX, endY)
				}
				if (this.mazeData[i][j][1] === 0 && i !== 0 && j < this.size - 1) { // right
					let startY = i * cellWidth
					let startX = (j + 1) * cellWidth
					let endY = (i + 1) * cellWidth
					let endX = (j + 1) * cellWidth

					this.ctx.moveTo(startX, startY)
					this.ctx.lineTo(endX, endY)
				}
				if (this.mazeData[i][j][2] === 0 && j < this.size - 1 && i < this.size - 1) { // bottom
					let startY = (i + 1) * cellWidth
					let startX = j * cellWidth
					let endY = (i + 1) * cellWidth
					let endX = (j + 1) * cellWidth

					this.ctx.moveTo(startX, startY)
					this.ctx.lineTo(endX, endY)
				}
				if (this.mazeData[i][j][3] === 0 && i < this.size - 1 && j !== 0) { // left
					let startY = i * cellWidth
					let startX = j * cellWidth
					let endY = (i + 1) * cellWidth
					let endX = j * cellWidth

					this.ctx.moveTo(startX, startY)
					this.ctx.lineTo(endX, endY)
				}

				this.ctx.lineWidth = 3
				this.ctx.strokeStyle = '#ffffff'
				this.ctx.stroke()
			}
		}
	}

	clearCanvas() {
		this.ctx.save();
		this.ctx.setTransform(1,0,0,1,0,0);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.restore();
	}
}