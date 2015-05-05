import utils from './utils'
import _ from 'lodash'
import PIXI from 'pixi.js'

export default class {

	vOffset = 0
	play = true

	constructor() {
		var canvasContainer = document.getElementById('gameArea')
		var width = canvasContainer.clientWidth

		this.renderer = new PIXI.WebGLRenderer(width, width, {
			autoResize: true,
			antialias: true,
			resolution: window.devicePixelRatio || 1
		})

		this.renderer.backgroundColor = 0x000000
		canvasContainer.appendChild(this.renderer.view)

		console.log(this.renderer.width)

		this.stage = new PIXI.Container()
		this.world = {}

		this.draw()
	}

	addWorld(worldData, worldLayout) {
		this.world = worldData
		this.world.cellSize = worldData.width

		let container = new PIXI.Container()
		let worldObject = this.preprocessWorld(container, worldLayout)
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
		var cellGraphic = new PIXI.Graphics()
	}

	draw() {
		this.renderer.render(this.stage)
		requestAnimationFrame(this.draw.bind(this))
	}
}