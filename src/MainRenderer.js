import utils from './utils'
import _ from 'lodash'
import PIXI from 'pixi.js'

export default class {

	vOffset = 0
	play = true

	constructor() {
		var canvasContainer = document.getElementById('gameArea')
		this.screenSize = canvasContainer.offsetHeight

		this.renderer = new PIXI.WebGLRenderer(this.screenSize, this.screenSize, {
			autoResize: true,
			antialias: true,
			resolution: window.devicePixelRatio || 1
		})

		this.renderer.backgroundColor = 0x000000
		canvasContainer.appendChild(this.renderer.view)

		this.stage = new PIXI.Container()
		this.world = {}

		this.draw()
	}

	addWorld(worldData, worldLayout) {
		this.world = worldData
		this.world.cellSize = this.screenSize / worldData.width

		let container = new PIXI.Container()
		let worldObject = this.preprocessWorld(container, worldLayout)

		this.stage.addChild(worldObject)
	}

	preprocessWorld(container, worldData) {
		for(let c = 0; c < worldData.length; c++) {
			let cell = worldData[c]
			let processedCell = this.drawCell(cell)
			container.addChild(processedCell)
		}

		return container
	}

	drawCell(cell) {
		var cs = this.world.cellSize
		var cellGraphic = new PIXI.Graphics()
		cellGraphic.beginFill(0x000000, 0)
		cellGraphic.lineStyle(1, 0xffffff, 1)

		var bc = this.getBaseCoords(cell.loc)

		cellGraphic.moveTo(bc.x, bc.y)
		if(cell.walls[0] === 0) cellGraphic.lineTo(bc.x + cs, bc.y)

		cellGraphic.moveTo(bc.x + cs, bc.y)
		if(cell.walls[1] === 0) cellGraphic.lineTo(bc.x + cs, bc.y + cs)

		cellGraphic.moveTo(bc.x + cs, bc.y + cs)
		if(cell.walls[2] === 0) cellGraphic.lineTo(bc.x, bc.y + cs)

		cellGraphic.moveTo(bc.x, bc.y + cs)
		if(cell.walls[3] === 0) cellGraphic.lineTo(bc.x, bc.y)

		cellGraphic.endFill()

		return cellGraphic
	}

	getBaseCoords(loc) {
		return {
			x: this.world.cellSize * loc.x,
			y: this.world.cellSize * loc.y
		}
	}

	draw() {
		this.renderer.render(this.stage)
		requestAnimationFrame(this.draw.bind(this))
	}
}