//import _ from 'lodash'
import PIXI from 'pixi.js'

class MainRenderer {

	vOffset = 0
	play = true

	constructor() {
		var canvasContainer = document.getElementById('gameArea')
		this.screenSize = canvasContainer.offsetWidth

		this.renderer = new PIXI.WebGLRenderer(this.screenSize + 1, this.screenSize, {
			autoResize: true,
			antialias: true,
			resolution: window.devicePixelRatio || 1
		})

		window.addEventListener("resize", (e) => {
			this.screenSize = canvasContainer.offsetWidth
			this.renderer.resize(this.screenSize + 1, this.screenSize)
			this.setCellSize()
		})

		this.renderer.backgroundColor = 0x030305
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

	setCellSize() {
		this.cellSize = this.screenSize / this.world.width
	}

	addWorld(worldData, worldLayout) {
		this.world = worldData
		this.setCellSize()

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
		this.worldObject.y += 0 //this.renderVOffset

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

export default MainRenderer