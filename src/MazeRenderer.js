import { GameData} from '../data/GameData'
import GameRenderer from './GameRenderer'
import utils from './utils'

export default class {

	constructor(world, layoutGenerator) {
		this.canvas = document.getElementById('mazeArea')
		this.ctx = this.canvas.getContext('2d')
		this.size = world.width
		this.cellWidth = Math.round(this.canvas.width / this.size)
		this.height = world.height
		this.verticalPosition = 0
		this.theme = world.theme
		this.layoutGenerator = layoutGenerator

		this.mazePixelHeight = this.cellWidth * this.height
		this.vOffset = 1

		GameRenderer.pushRenderer(this.draw, this, "maze", 0)
	}

	draw() {
		this.clearCanvas()
		this.renderMaze()
	}

	moveMaze(increment) {
		if(this.vOffset <= 0.1) return false
		this.verticalPosition += increment
		return true
	}

	renderMaze() {
		this.vOffset = ( this.mazePixelHeight - (this.size * this.cellWidth) ) - (this.verticalPosition * this.cellWidth)

		var subcellSize = Math.round((this.canvas.width / this.size) / 3)

		var i = 0

		for (var col of this.layoutGenerator()) {

			for (var j = 0; j < col.length; j++) {
				var currentCell = col[j]
				this.drawMazeCell(currentCell.subcells, j, i, subcellSize)
			}

			i++
		}
	}

	drawMazeCell(cell, x, y, subcellSize) {

		var cellX = x * this.cellWidth
		var cellY = y * this.cellWidth

		this.drawFloor(cellX, cellY)
		this.drawDebug(cellX, cellY, x, y)
		this.drawMazeObjects(cell, cellX, cellY, subcellSize)
	}

	drawDebug(cellX, cellY, x, y) {
		this.ctx.beginPath()
		this.ctx.moveTo(cellX, cellY - this.vOffset)
		this.ctx.lineTo(cellX + this.cellWidth, cellY - this.vOffset)
		this.ctx.moveTo(cellX, cellY - this.vOffset)
		this.ctx.lineTo(cellX, (cellY + this.cellWidth) - this.vOffset)
		this.ctx.stroke()

		/*this.ctx.font = '24pt Calibri'
		this.ctx.fillText(x + ', ' + y, cellX + (this.cellWidth / 3), (cellY - this.vOffset) + (this.cellWidth / 2))*/
	}

	drawMazeObjects(cell, cellX, cellY, size) {

		for(var c = 0; c < cell.length; c++) {
			var props = cell[c]

			if(!props.obj && !props.wall.closed) continue

			let absX = (cellX) + (props.loc[0] * size)
			let absY = ((cellY) + (props.loc[1] * size)) - this.vOffset

			var wallProps = props.wall
			var walls = false
			var corners = false

			if(wallProps.closed && wallProps.walls.length > 0) {
				walls = wallProps.walls.map(el => el.setRenderProperties(cellX, cellY - this.vOffset, size) )
			}

			if(wallProps.corners.length > 0) {
				corners = wallProps.corners.map(el => el.setRenderProperties(cellX, cellY - this.vOffset, size) )
			}

			if(props.loc[2] === 0 && walls) {
				this.drawWalls(walls)
				if(corners) this.drawWalls(corners)
			}

			if(props.loc[2] !== 2 && walls) {
				this.drawWalls(walls)
				if(corners) this.drawWalls(corners)
			}

			if(props.obj !== false) {
				if(props.obj.context === false) props.obj.setContext(this.ctx)
				props.obj.setRenderProperties(absX + (size * 0.1), absY - (size * 0.1), size - (size * 0.05), size + (size * 0.05))
				props.obj.draw()
			}

			if(props.loc[1] === 2 && walls) {
				this.drawWalls(walls)
				if(corners) this.drawWalls(corners)
			}
		}
	}

	drawWalls(walls) {
		walls.forEach(el => el.draw(this.ctx) )
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