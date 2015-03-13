export default class {

	constructor(game, data) {
		this.level = data.level
		this.gridSize = data.size
		this.mazeHeight = data.height
		this.game = game
		this.data = data
		this.cleared = false
		this.started = false
		console.log(data)
		this.start()
	}

	start() {
		this.setState()
		this.setPlayer()
		this.setWorld()
		this.started = true
	}

	setState() {
		if(this.data.level > 0 && this.data.level & 1) {
			this.gridSize++
		}
		else if(this.data.level > 0) {
			this.mazeHeight++
		}
	}

	setPlayer() {
		this.game.player.setGrid(this.gridSize)
		this.game.player.resetPosition()
	}

	setWorld() {
		this.game.maze.makeMaze(this.gridSize, this.mazeHeight)
	}

	onLevelComplete() {
		this.cleared = true
	}

	getLevelData() {
		return {
			size: this.gridSize,
			height: this.mazeHeight,
			level: this.level,
			cleared: this.cleared,
			started: this.started
		}
	}
}