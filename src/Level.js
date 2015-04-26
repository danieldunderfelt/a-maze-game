import { GameData } from './data/GameData'
import WorldController from './WorldController'
import GlobalState from './GlobalState'

export default class {

	constructor(game) {
		this.level = GlobalState.levelState.level
		this.gridSize = GlobalState.levelState.size
		this.worldHeight = GlobalState.levelState.height
		this.game = game
	}

	init(theme) {
		this.theme = theme
	}

	create() {
		//this.setWorld()
		this.setPlayer()
		this.connectInput()
	}

	update() {
		GlobalState.update()
	}

	setWorld() {
		WorldController.newWorld()
		WorldController.generateWorld(this.theme, this.gridSize, this.worldHeight)
		WorldController.startWorld()
	}

	setPlayer() {
		this.player = GlobalState.getPlayer()
		this.player.add(0, 0)
	}

	connectInput() {
		var input = GlobalState.input
		input.addCallback(this.player.move.bind(this.player))
		this.game.camera.follow(this.player.object)
	}
}