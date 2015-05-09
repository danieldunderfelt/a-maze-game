import Player from './Player'
import WorldController from './WorldController'
import MainRenderer from './MainRenderer'

class Game {

	baseSize = 10
	heightMultiplier = 1

	constructor() {
		this.player = new Player()
		this.level = 0
		this.renderer = new MainRenderer()
	}

	initialize() {
		this.createWorld()
	}

	createWorld() {
		WorldController.newWorld()
		WorldController.generateWorld(this.baseSize, this.baseSize * this.heightMultiplier)
		this.renderer.addWorld(WorldController.getCurrentWorldData(), WorldController.getLayout())
	}
}

export default Game