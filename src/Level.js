import { GameData } from '../data/GameData'

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
		this.setPlayer()
		this.setWorld()
	}

	setState() {
		if(this.data.level > 0 && this.data.level & 1 && this.gridSize < 20) {
			this.gridSize++
		}
		else if(this.data.level > 0) {
			this.mazeHeight = this.mazeHeight + GameData.heightExpansion
		}
	}

	setPlayer() {
		this.game.player.setGrid(this.gridSize)
		this.game.player.resetPosition()
	}

	setWorld() {
		this.game.maze.setTheme(this.theme)
		this.game.maze.makeMaze(5, 5) //this.gridSize, this.mazeHeight)
	}

	getLevelData() {
		return {
			size: this.gridSize,
			height: this.mazeHeight,
			level: this.level
		}
	}
}