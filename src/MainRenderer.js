import utils from './utils'
import _ from 'lodash'
import PIXI from 'pixi.js'

export default class {

	vOffset = 0
	play = true

	constructor() {
		var canvasContainer = document.getElementById('gameArea')
		this.screenSize = canvasContainer.offsetHeight

		this.renderer = new PIXI.WebGLRenderer(this.screenSize + 1, this.screenSize, {
			autoResize: true,
			antialias: true,
			resolution: window.devicePixelRatio || 1
		})

		this.renderer.backgroundColor = 0x050505
		canvasContainer.appendChild(this.renderer.view)

		this.stage = new PIXI.Container()
		this.world = {}
		this.cellSize = 0
		this.worldObject = {}
		this.renderOffset = {x: 0, y: 0}
		this.cells = []

		this.draw()
	}

	setOffset(vOffset) {

	}

	addWorld(worldData, worldLayout) {
		this.world = worldData
		this.cellSize = this.screenSize / worldData.width

		let container = new PIXI.Container()
		this.worldObject = this.preprocessWorld(container, worldLayout)

		this.stage.addChild(this.worldObject)
	}

	preprocessWorld(container, worldData) {
		for(let c = 0; c < worldData.length; c++) {
			let cell = worldData[c]
			this.cells.push(cell)
			container.addChild(cell.graphic)
		}

		return container
	}

	updateWorld() {
		//this.worldObject.y += this.renderVOffset

		for(let c = 0; c < this.cells.length; c++) {
			this.cells[c].draw(this.cellSize)
		}
	}

	updatePlayer() {

	}

	draw() {
		this.updateWorld()
		this.updatePlayer()
		this.renderer.render(this.stage)
		requestAnimationFrame(this.draw.bind(this))
	}
}