import Input from './Input'
import { preload } from '../data/assetRegistry'
import GameRenderer from './GameRenderer'

class GameController {

	constructor() {
		this.input = new Input()
	}

	initialize() {
		var preloadPromise = new Promise(preload)
			.then( () => System.import('./src/Game'))
			.then(this.setupGame.bind(this))
	}

	setupGame(game) {
		this.game = new game.Game()

		this.input.registerCallback(this.game.playerMove.bind(this.game))
		this.game.startLevel()
		this.input.start()

		GameRenderer.start()
	}
}

export default new GameController()