export default class {

	constructor(data, size, height) {
		this.canvas = document.getElementById('mazeArea')
		this.ctx = this.canvas.getContext('2d')
		this.mazeData = data
		this.size = size
		this.height = height
	}

	draw() {
		this.clearCanvas()
		this.renderMaze()
	}

	moveMaze(dir) {
		var move = Math.floor((this.canvas.width / this.size) * 0.5)
		//if(dir === 'down') move = move - (move * 2)
		this.ctx.translate(0, move)
	}

	setInitialPosition() {
		let top = ~(Math.floor(this.canvas.width / this.size) * this.height)
		this.ctx.translate(0, top)
	}

	renderMaze() {
		var cellWidth = Math.round(this.canvas.width / this.size)

		for (var i = 0; i < this.mazeData.length; i++) {
			for (var j = 0; j < this.mazeData[i].length; j++) {
				let textY = (i * cellWidth) + 15
				let textX = j * cellWidth
				this.ctx.font = 'italic 12pt Calibri';
				this.ctx.fillText('' + j + 'x' + i, textX, textY);

				this.ctx.beginPath()

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