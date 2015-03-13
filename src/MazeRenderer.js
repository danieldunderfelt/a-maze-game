import $ from 'jquery'

export default class {

	constructor() {
		this.canvas = document.getElementById('mazeArea')
		this.ctx = this.canvas.getContext('2d')
		this.mazeData = []
		this.size = 0
		this.height = 0
		this.verticalPosition = 0
		this.lastVp = 1
	}

	setInitialState(data, size, height) {
		this.mazeData = data
		this.size = size
		this.height = height
		this.verticalPosition = 0
	}

	draw() {
		if(this.verticalPosition === this.lastVp) return false
		this.lastVp = this.verticalPosition

		this.clearCanvas()
		this.renderMaze()
	}

	moveMaze(increment) {
		this.verticalPosition = this.verticalPosition + increment
	}

	renderMaze() {
		if(this.mazeData.length < 1) return

		var cellWidth = Math.round(this.canvas.width / this.size)
		var mazePixelHeight = cellWidth * this.height
		var vOffset = (mazePixelHeight - (this.verticalPosition * cellWidth))

		this.ctx.beginPath()

		for (var i = 0; i < this.mazeData.length; i++) {
			for (var j = 0; j < this.mazeData[i].length; j++) {

				var cellWalls = []

				if (this.mazeData[i][j][0] === 0) { // top
					cellWalls.push([i, j, i, j + 1])
				}
				if (this.mazeData[i][j][1] === 0) { // right
					cellWalls.push([i, j + 1, i + 1, j + 1])
				}
				if (this.mazeData[i][j][2] === 0) { // bottom
					cellWalls.push([i + 1, j, i + 1, j + 1])
				}
				if (this.mazeData[i][j][3] === 0) { // left
					cellWalls.push([i, j, i + 1, j])
				}

				for(let cw = 0; cw < cellWalls.length; cw++) {
					let walls = cellWalls[cw]

					let startX = walls[1] * cellWidth
					let startY = (walls[0] * cellWidth) - vOffset
					let endX = walls[3] * cellWidth
					let endY = (walls[2] * cellWidth) - vOffset

					this.ctx.moveTo(startX, startY)
					this.ctx.lineTo(endX, endY)
				}
			}
		}

		this.ctx.lineWidth = 3
		this.ctx.strokeStyle = '#ffffff'
		this.ctx.stroke()
	}

	clearCanvas() {
		this.ctx.save();
		this.ctx.setTransform(1,0,0,1,0,0);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.restore();
	}
}