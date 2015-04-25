import { GameData} from '../data/GameData'
import GameRenderer from './GameRenderer'
import utils from './utils'
import _ from 'lodash'
import WorldController from './WorldController'

export default class {

	vOffset = 0
	play = true

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

		GameRenderer.pushRenderer(this.draw, this, "maze", 0)
	}

	createRenderQueue() {
		return []
	}

	draw() {
		if(this.play) {
			this.clearCanvas()
			this.prepareMaze()
			this.renderMaze()
		}
	}

	moveMaze(increment) {
		this.verticalPosition += increment
		return true
	}

	prepareMaze() {
		this.vOffset = ( this.mazePixelHeight - (this.size * this.cellWidth) ) - this.verticalPosition
		var subcellSize = this.cellWidth / 3
		var layout = _.flattenDeep(WorldController.getLayout())

		for(var c = 0; c < layout.length; c++) {

			this.renderQueue.push([])

			var currentCell = layout[c]
			this.prepareMazeCell(currentCell, subcellSize, c)
		}
	}

	renderMaze() {
		// easy-peasy

		var renderQueue = _.compact(this.renderQueue)

		for(var r = 0; r < renderQueue.length; r++) {
			var cell = renderQueue[r]

			for(var c = 0; c < cell.length; c++) {
				var obj = cell[c]

				if(obj) {
					obj.draw(this.ctx)
				}
			}
		}
	}

	prepareMazeCell(cell, subcellSize, layoutIndex) {
		var cellX = cell.worldLoc[0] * this.cellWidth
		var cellY = cell.worldLoc[1] * this.cellWidth

		this.drawFloor(cellX, cellY)
		this.prepareMazeObjects(cell, subcellSize, layoutIndex)
	}

	prepareMazeObjects(props, size, layoutIndex) {
		var cellX = props.worldLoc[0] * this.cellWidth
		var cellY = props.worldLoc[1] * this.cellWidth

		let absX = (cellX) + (props.loc[0] * size)
		let absY = ((cellY) + (props.loc[1] * size)) - this.vOffset

		if(!props.obj && !props.wall.closed) return

		var wallProps = props.wall
		var walls = false
		var corners = false

		if(props.obj !== false) {
			props.obj.setRenderProperties(absX + (size * 0.1), absY - (size * 0.1), size - (size * 0.2), size - (size * 0.2))
			this.queueObject(props.obj, props.loc[1], layoutIndex)
		}

		if(wallProps.closed && wallProps.walls.length > 0) {
			wallProps.walls.forEach(el => {
				el.setRenderProperties(cellX, cellY - this.vOffset, size)
				this.queueObject(el, props.loc[1], layoutIndex)
			})
		}
	}

	queueObject(obj, cellIndex, layoutIndex) {
		var pushIndex = cellIndex + obj.zIndex
		var removed = this.renderQueue[layoutIndex].splice(pushIndex, 1, obj)

		if(typeof removed[0] !== "undefined" && removed[0]) {
			if(removed[0].zIndex > obj.zIndex) pushIndex++
			else pushIndex--

			this.renderQueue[layoutIndex].splice(pushIndex, 0, removed[0])
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

	drawDebug(cellX, cellY) {
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