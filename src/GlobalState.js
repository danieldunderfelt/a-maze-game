import Input from './Input'
import Player from './Player'
import { GameData } from './data/GameData'

class GlobalState {

	constructor() {
		this.levelState = {
			size: GameData.baseMazeSize,
			height: GameData.baseMazeSize * GameData.initialHeightMultiplier,
			level: 0
		}

		this.playerState = {
			speed: 10
		}

		this.game = {}
		this.input = {}

		this.isInitialized = false
	}

	init(game) {
		if(this.isInitialized) return true

		this.game = game
		this.input = new Input(game)
		this.player = new Player(game)

		this.isInitialized = true
	}

	getPlayer() {
		return this.player
	}

	create() {

	}

	update() {
		this.input.registerInput()
	}

	render() {

	}
}

export default new GlobalState()