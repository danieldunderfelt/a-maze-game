import GameRenderer from './GameRenderer'

export default class {

	constructor(theme, data, size, height) {
		this.canvas = document.getElementById('mazeArea')
		this.ctx = this.canvas.getContext('2d')
		this.mazeData = data
		this.size = size
		this.height = height
		this.verticalPosition = 0
		this.lastVp = 1
		this.theme = theme
		this.objectsInMaze = []

		GameRenderer.pushRenderer(this.draw, this, "maze")
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
		var cellWidth = Math.round(this.canvas.width / this.size)
		var mazePixelHeight = cellWidth * this.height
		var vOffset = (mazePixelHeight - (this.verticalPosition * cellWidth))

		this.drawOuterWalls()

		for (var i = 0; i < this.mazeData.length; i++) {
			for (var j = 0; j < this.mazeData[i].length; j++) {

				var currentCell = this.mazeData[i][j]
				this.drawMazeCell(currentCell, j, i, cellWidth, vOffset)
			}
		}
	}

	drawMazeCell(walls, x, y, cellWidth, vOffset) {
		var wallWidth = Math.round(cellWidth / 9)
		var cellX = x * cellWidth
		var cellY = (y * cellWidth) - vOffset
		var imgWidth = Math.round((this.canvas.width / this.size) / 3)
		var imgHeight = Math.round((this.canvas.height / this.size) / 3)

		this.drawFloor(cellX, cellY, cellWidth)

		return

		for(var cw = 0; cw < walls.length; cw++) {
			let wall = walls[cw]

			if(cw === 0 && wall === 0) {
				this.ctx.drawImage(this.wallImage, cellX + imgWidth, cellY, imgWidth, imgHeight)
			}
			if(cw === 1 && wall === 0) {
				this.ctx.drawImage(this.wallImage, cellX + (cellWidth - imgWidth), cellY + imgHeight, imgWidth, imgHeight)
			}
			if(cw === 2 && wall === 0) {
				this.ctx.drawImage(this.wallImage, cellX + imgWidth, cellY + (cellWidth - imgHeight), imgWidth, imgHeight)
			}
			if(cw === 3 && wall === 0) {
				this.ctx.drawImage(this.wallImage, cellX, cellY + imgHeight, imgWidth, imgHeight)
			}
		}

		this.ctx.drawImage(this.wallImage, cellX, cellY, imgWidth, imgHeight) // top/left
		this.ctx.drawImage(this.wallImage, cellX + (cellWidth - imgWidth), cellY, imgWidth, imgHeight) // top/right
		this.ctx.drawImage(this.wallImage, cellX, cellY + (cellWidth - imgHeight), imgWidth, imgHeight) // bottom/left
		this.ctx.drawImage(this.wallImage, cellX + (cellWidth - imgWidth), cellY + (cellWidth - imgHeight), imgWidth, imgHeight) // bottom/right
	}

	drawOuterWalls() {

	}

	drawFloor(x, y, width) {
		var floorTexture = this.theme.textures.floor
		var row = 0
		var size = width / 3

		for(let i = 0; i < 9; i++) {
			let col = i % 3

			if(i !== 0 && col === 0) row++

			let relX = x + (col * size)
			let relY = y + (row * size)

			this.ctx.drawImage(floorTexture, relX, relY, size, size)
		}
	}

	clearCanvas() {
		this.ctx.save();
		this.ctx.setTransform(1,0,0,1,0,0);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.restore();
	}

	dispose() {
		GameRenderer.removeRenderer("maze")
		delete this
	}
}