import { GameData } from '../data/GameData'
import WorldController from './WorldController'

export default class {

	constructor(game, data, theme) {
		this.level = data.level
		this.gridSize = data.size
		this.mazeHeight = data.height
		this.game = game
		this.data = data
		this.theme = theme

		this.start()
	}

	start() {
		this.setState()
		this.setWorld()
		this.setPlayer()
	}

	setState() {
		if(this.data.level > 0 && this.data.level & 1 && this.gridSize < 20) {
			this.gridSize++
		}
		else if(this.data.level > 0) {
			this.mazeHeight = this.mazeHeight + GameData.heightExpansion
		}
	}

	setWorld() {
		WorldController.newWorld()
		WorldController.generateWorld(this.theme, this.gridSize, this.mazeHeight)
		this.game.maze.initialize()
	}

	setPlayer() {
		this.game.player.initLevel()
	}

	getLevelData() {
		return {
			size: this.gridSize,
			height: this.mazeHeight,
			level: this.level
		}
	}
}