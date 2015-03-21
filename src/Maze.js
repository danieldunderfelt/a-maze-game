import MazeRenderer from './MazeRenderer'
import WorldController from './WorldController'

export default class {

	constructor(game) {
		this.game = game
		this.player = {}
		this.renderer = false
		this.verticalPosition = 0
		this.mazeStep = 0.11
	}

	getPosition() {
		return this.verticalPosition
	}

	initialize() {
		if(this.renderer !== false) this.renderer.dispose()

		let world = WorldController.getCurrentWorldData()
		this.worldHeight = world.height
		this.gridSize = world.width
		this.mazeStep = world.width / 20

		this.renderer = new MazeRenderer(world, WorldController.getLayoutGenerator())
	}

	move(direction) {
		if(direction === "up") {
			this.renderer.moveMaze(this.mazeStep, direction)
		}
	}
}