import Player from './Player'
import WorldController from './WorldController'
import MainRenderer from './MainRenderer'

class Game {

	baseSize = 10
	initialHeightMultiplier = 1
	heightExpansion = 2

	constructor() {
		this.player = new Player()
		this.level = 0
		this.renderer = new MainRenderer()
	}

	initialize() {

	}

	createWorld() {

	}
}

export default Game