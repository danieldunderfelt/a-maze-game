import MazeRenderer from './MazeRenderer'
import WorldController from './WorldController'

export default class {

	constructor(game) {
		this.game = game
		this.player = {}
		this.renderer = false
		this.verticalPosition = 0
		this.mazeStep = 0.05
	}

	getPosition() {
		return this.verticalPosition
	}

	initialize() {
		if(this.renderer !== false) this.renderer.dispose()

		let world = WorldController.getCurrentWorldData()
		this.worldHeight = world.height
		this.verticalPosition = 0
		this.gridSize = world.width
		this.mazeStep = world.width / 50

		this.renderer = new MazeRenderer(world, WorldController.getLayoutGenerator())
	}

	move() {
		var mazeOffset = this.renderer.moveMaze(this.mazeStep)
		if(!mazeOffset) return false
		this.verticalPosition = this.verticalPosition + this.mazeStep
	}
}