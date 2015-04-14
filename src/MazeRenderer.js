import { GameData} from '../data/GameData'
import GameRenderer from './GameRenderer'
import utils from './utils'
import _ from 'lodash'
import WorldController from './WorldController'

export default class {

	constructor(world) {
		this.canvas = document.getElementById('mazeArea')
		this.ctx = this.canvas.getContext('2d')
		this.size = world.width
		this.cellWidth = Math.round(this.canvas.width / this.size)
		this.height = world.height
		this.verticalPosition = 0
		this.theme = world.theme

		this.renderQueue = this.createRenderQueue()

		this.mazePixelHeight = this.cellWidth * this.height
		this.vOffset = 1
		this.play = true

		GameRenderer.pushRenderer(this.draw, this, "maze", 0)
	}

	createRenderQueue() {
		var renderQueue = []
		//_.fill(renderQueue, false, 0, (this.size * this.height) * 27)

		return renderQueue
	}

	draw() {
		if(this.play) {
			this.clearCanvas()
			this.prepareMaze()
			this.renderMaze()
		}
	}

	moveMaze(increment) {
		if(this.vOffset <= 0.1) return false
		this.verticalPosition += increment
		return true
	}

	prepareMaze() {
		this.vOffset = ( this.mazePixelHeight - (this.size * this.cellWidth) ) - (this.verticalPosition * this.cellWidth)

		var subcellSize = Math.round((this.canvas.width / this.size) / 3)
		var layout = _.flattenDeep(WorldController.getLayout())

		for(var c = 0; c < layout.length; c++) {
			var currentCell = layout[c]
			this.prepareMazeCell(currentCell.subcells, subcellSize)
		}
	}

	renderMaze() {
		// easy-peasy

		var renderQueue = _.compact(this.renderQueue)

		for(var r = 0; r < renderQueue.length; r++) {
			var obj = renderQueue[r]

			if(typeof obj.draw === "undefined") console.log(obj)

			if(obj) {
				obj.draw(this.ctx)
			}
		}
	}

	prepareMazeCell(cell, subcellSize) {
		var cellX = cell[0].mazeLoc[0] * this.cellWidth
		var cellY = cell[0].mazeLoc[1] * this.cellWidth

		this.drawFloor(cellX, cellY)
		//this.drawDebug(cellX, cellY, x, y)
		this.prepareMazeObjects(cell, subcellSize)
	}

	prepareMazeObjects(cell, size) {

		for(var c = 0; c < cell.length; c++) {
			var props = cell[c]
			var cellX = props.mazeLoc[0] * this.cellWidth
			var cellY = props.mazeLoc[1] * this.cellWidth

			if(!props.obj && !props.wall.closed) continue

			let absX = (cellX) + (props.loc[0] * size)
			let absY = ((cellY) + (props.loc[1] * size)) - this.vOffset

			var wallProps = props.wall
			var walls = false
			var corners = false

			if(wallProps.closed && wallProps.walls.length > 0) {
				wallProps.walls.forEach(el => {
					el.setRenderProperties(cellX, cellY - this.vOffset, size)
					this.queueObject(el, props.mazeLoc[1], props.loc[1])
				})
			}

			if(props.obj !== false) {
				props.obj.setRenderProperties(absX + (size * 0.1), absY - (size * 0.1), size - (size * 0.2), size - (size * 0.2))
				this.queueObject(props.obj, props.mazeLoc[1], props.loc[1])
			}
		}
	}
	queueObject(obj, verticalPos, subcellVertPosition) {
		var pushIndex = verticalPos + subcellVertPosition + obj.zIndex
		var removed = this.renderQueue.splice(pushIndex, 1, obj)

		if(typeof removed[0] !== "undefined") {
			if(removed[0].zIndex > obj.zIndex) pushIndex++
			else pushIndex--

			this.renderQueue.splice(pushIndex, 0, removed[0])
		}
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

	clearCanvas() {
		this.ctx.save();
		this.ctx.setTransform(1,0,0,1,0,0);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.restore();

		this.renderQueue = this.createRenderQueue()
	}

	dispose() {
		GameRenderer.removeRenderer("maze")
		delete this
	}
}