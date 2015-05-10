//import _ from 'lodash'
import PIXI from 'pixi.js'

class MainRenderer {

	vOffset = 0
	play = true

	constructor() {
		var canvasContainer = document.getElementById('gameArea')
		this.screenSize = canvasContainer.offsetWidth

		this.renderer = new PIXI.WebGLRenderer(this.screenSize + 1, this.screenSize + 1, {
			autoResize: true,
			antialias: true,
			resolution: window.devicePixelRatio || 1,
			transparent: true
		})

		window.addEventListener("resize", (e) => {
			this.screenSize = canvasContainer.offsetWidth
			this.renderer.resize(this.screenSize + 1, this.screenSize)
			this.setCellSize()
		})

		canvasContainer.appendChild(this.renderer.view)

		this.stage = new PIXI.Container()
		this.world = {}
		this.cellSize = 0
		this.worldObject = {}
		this.renderOffset = {x: 0, y: 0}
		this.cells = []
		this.walkerPath = []
		this.pathContainer = new PIXI.Container()
		this.stage.addChild(this.pathContainer)

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
		this.walkerPath = []
		this.pathContainer.removeChildren()

		let container = new PIXI.Container()

		this.stage.removeChild(this.worldObject)
		this.worldObject = this.preprocessWorld(container, worldLayout)
		this.stage.addChild(this.worldObject)
	}

	setWalkerPath(pathObj) {
		var renderPathObj = {
			graphic: new PIXI.Graphics(),
			path: pathObj
		}

		this.pathContainer.addChild(renderPathObj.graphic)
		this.walkerPath.push(renderPathObj)
	}

	renderPath() {

		for(let wp = 0; wp < this.walkerPath.length; wp++) {
			let pathObj = this.walkerPath[wp]
			pathObj.graphic.clear()

			let color = wp === 0 ? 0x5599ee : 0xdd3322
			pathObj.graphic.beginFill(color, 1)
			pathObj.graphic.lineStyle(0, 0x000000, 0)

			let x = (pathObj.path.loc.x * this.cellSize) + (this.cellSize / 3)
			let y = (pathObj.path.loc.y * this.cellSize) + (this.cellSize / 3)

			pathObj.graphic.drawRect(x, y, this.cellSize / 3, this.cellSize / 3)
		}
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
		this.renderPath()

		for(let c = 0; c < this.cells.length; c++) {
			this.cells[c].draw(this.cellSize)
		}
	}

	draw() {
		this.updateWorld()
		this.renderer.render(this.stage)
		requestAnimationFrame(this.draw.bind(this))
	}
}

export default MainRenderer