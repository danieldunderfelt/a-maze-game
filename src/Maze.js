import MazeRenderer from './MazeRenderer'
import WorldController from './WorldController'

export default class {

	constructor(game) {
		this.game = game
		this.player = {}
		this.renderer = false
		this.verticalPosition = 0
		this.mazeStep = 0
	}

	getPosition() {
		return this.verticalPosition
	}

	initialize() {
		if(this.renderer !== false) this.renderer.dispose()

		let world = WorldController.getCurrentWorldData()
		this.worldHeight = world.height
		this.gridSize = world.width

		var canvas = document.getElementById('mazeArea')
		this.mazeStep = (Math.round(canvas.width / world.width) / 3) * 0.8

		this.renderer = new MazeRenderer(world)
	}

	move(direction) {
		if(direction === "up") {
			this.renderer.moveMaze(this.mazeStep, direction)
		}
	}
}