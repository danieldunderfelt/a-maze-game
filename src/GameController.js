import Input from './Input'
import Game from './Game'
import renderLoop from './GameRenderer'

class GameController {

	constructor() {
		this.input = new Input()
		this.game = {}
		this.renderer = renderLoop
	}

	initialize() {
		this.game = new Game(this)
		this.input.registerCallback(this.game.playerMove.bind(this.game))
		this.game.startLevel()
		this.input.start()

		this.renderer.start()
	}
}

export default new GameController()