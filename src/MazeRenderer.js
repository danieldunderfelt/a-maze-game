import GameRenderer from './GameRenderer'

export default class {

	constructor(theme, data, size, height) {
		this.canvas = document.getElementById('mazeArea')
		this.ctx = this.canvas.getContext('2d')
		this.mazeData = data
		this.size = size
		this.cellWidth = Math.round(this.canvas.width / this.size)
		this.height = height
		this.verticalPosition = 0
		this.lastVp = 1
		this.theme = theme
		this.objectsInMaze = {}
		this.occupatedPlaces = []
		this.initialDraw = true

		this.mazePixelHeight = this.cellWidth * this.height
		this.vOffset = 1

		GameRenderer.pushRenderer(this.draw, this, "maze")
	}

	draw() {
		if(this.verticalPosition === this.lastVp) return false
		this.lastVp = this.verticalPosition

		this.clearCanvas()
		this.renderMaze()
	}

	moveMaze(increment) {
		if(this.vOffset <= 0.1) return false
		this.verticalPosition = this.verticalPosition + increment
		return true
	}

	renderMaze() {
		this.vOffset = ((this.mazePixelHeight - (this.mazePixelHeight / 3)) - (this.verticalPosition * this.cellWidth))
		this.drawOuterWalls()

		for (var i = 0; i < this.mazeData.length; i++) {
			for (var j = 0; j < this.mazeData[i].length; j++) {

				var currentCell = this.mazeData[i][j]
				this.drawMazeCell(currentCell, j, i)
			}
		}

		this.initialDraw = false
	}

	drawMazeCell(walls, x, y) {
		var cellX = x * this.cellWidth
		var cellY = y * this.cellWidth

		this.drawFloor(cellX, cellY)

		var objectProcessor = this.initialDraw ? this.placeThemeObject.bind(this) : this.updateMazeObjects.bind(this)
		this.setMazeObjects(objectProcessor, x, y, walls, cellX, cellY)

		this.drawDebug(cellX, cellY, x, y)
	}

	drawDebug(cellX, cellY, x, y) {
		this.ctx.beginPath()
		this.ctx.moveTo(cellX, cellY - this.vOffset)
		this.ctx.lineTo(cellX + this.cellWidth, cellY - this.vOffset)
		this.ctx.moveTo(cellX, cellY - this.vOffset)
		this.ctx.lineTo(cellX, (cellY + this.cellWidth) - this.vOffset)
		this.ctx.stroke()

		this.ctx.font = '24pt Calibri';
		this.ctx.fillText(x + ', ' + y, cellX + (this.cellWidth / 3), (cellY - this.vOffset) + (this.cellWidth / 2));
	}

	setMazeObjects(objectProcessor, x, y, walls, cellX, cellY) {
		var tileSizeModifier = 3
		var size = Math.round((this.canvas.width / this.size) / tileSizeModifier)

		for(var cw = 0; cw < walls.length; cw++) {
			let wall = walls[cw]
			var absX, absY

			if(cw === 0 && wall === 0) {
				absX = cellX + size
				absY = cellY
				objectProcessor("top", absX, absY, size)
			}
			if(cw === 1 && wall === 0) {
				absX = cellX + (this.cellWidth - size)
				absY = cellY + size
				objectProcessor("right", absX, absY, size)
			}
			if(cw === 2 && wall === 0) {
				absX = cellX + size
				absY = cellY + (this.cellWidth - size)
				objectProcessor("bottom", absX, absY, size)
			}
			if(cw === 3 && wall === 0) {
				absX = cellX
				absY = cellY + size
				objectProcessor("left", absX, absY, size)
			}
		}
	}

	placeThemeObject(wall, cellX, cellY, size) {

		var vacant = this.checkExisting(cellX, cellY)

		if(!vacant) return

		this.occupatedPlaces.push([cellX, cellY])
		var mazeObject = this.getThemeObject()

		mazeObject.setRenderProperties(cellX, cellY - this.vOffset, size, size)

		this.objectsInMaze["obj" + cellX + cellY] = {
			obj: mazeObject,
			x: cellX,
			y: cellY,
			size: size,
			pos: wall
		}
	}

	checkExisting(x, y) {
		var vacant = true

		for(let occ = 0; occ < this.occupatedPlaces.length; occ++) {
			let ele = this.occupatedPlaces[occ]

			if(ele[0] === x && ele[1] === y) {
				vacant = false
				break
			}
		}

		return vacant
	}

	updateMazeObjects(wall, cellX, cellY, size) {
		var ele = this.objectsInMaze["obj" + cellX + cellY]
		ele.obj.setPosition(cellX, cellY - this.vOffset)
	}

	drawOuterWalls() {

	}

	getThemeObject() {
		let availableObjects = this.theme.objects
		let amount = availableObjects.length
		let randomIndex = getRandomInt(0, amount - 1)
		let pickedObject = new availableObjects[randomIndex]()
		pickedObject.setContext(this.ctx)
		return pickedObject
	}

	drawFloor(x, y) {
		var width = Math.round(this.canvas.width / this.size)
		var floorTexture = this.theme.textures.floor
		var row = 0
		var tileSizeModifier = Math.round(width / 128)
		var size = Math.round(width / tileSizeModifier)
		var floorTilesInCell =  Math.round(Math.pow(width, 2) / Math.pow(size, 2))

		for(let i = 0; i < floorTilesInCell ; i++) {
			let col = i % tileSizeModifier

			if(i !== 0 && col === 0) row++

			let relX = x + (col * size)
			let relY = (y - this.vOffset) + (row * size)

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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}