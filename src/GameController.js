import Game from './Game'
import WorldController from './WorldController'

class GameController {

	constructor() {

	}

	initialize() {
		console.log("LETS GO")
		this.startGame()
	}

	startGame() {
		this.game = new Game()
		this.game.initialize()
	}
}

export default GameController