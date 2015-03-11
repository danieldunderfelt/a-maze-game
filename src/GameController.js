import Input from './Input'
import Game from './Game'

class GameController {

	constructor() {
		this.input = new Input(this.playerEvent.bind(this))
		this.game = {}
	}

	initialize() {
		this.game = new Game(this)
		this.game.startLevel()
		this.input.start()
	}

	playerEvent(eventData) {
		this.game.onPlayerEvent(eventData)
	}
}

export default new GameController()