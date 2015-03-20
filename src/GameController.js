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

		this.input.registerCallback(this.inputEvent.bind(this))
		this.game.startLevel()
		this.input.start()

		GameRenderer.start()
	}

	inputEvent(eventData) {
		if(eventData.type === 'move') this.playerMove(eventData)
	}

	playerMove(eventData) {
		var playerMove = this.game.player.move(eventData.direction)
		if(playerMove) this.game.maze.move(eventData.direction)
	}
}

export default new GameController()