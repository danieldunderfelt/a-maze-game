import { newMaze } from './MazeGenerator'
import MazeRenderer from './MazeRenderer'

export default class {

	constructor(game) {
		this.game = game
		this.mazeData = []
		this.renderer = {}
		this.processor = {}
		this.verticalPosition = 0
	}

	getPosition() {
		return this.verticalPosition
	}

	makeMaze(width, height) {
		this.mazeHeight = height
		this.mazeData = newMaze(width, height)
		this.renderer = new MazeRenderer(this.mazeData, width, height)
		this.renderer.setInitialPosition()
		this.draw()
	}

	draw() {
		this.renderer.draw()
	}

	move(increment) {
		this.verticalPosition = this.verticalPosition + increment
		this.renderer.moveMaze(increment)
		this.renderer.draw()
	}

	onMazeCleared() {
		this.game.onPlayerEvent({
			type: 'maze',
			mazeStatus: true
		})
	}

	checkPlayer(verticalPosition) {
		if(verticalPosition > 0) {
			this.onMazeCleared()
			return true
		}

		return false
	}

	checkMovement(toPosition, dir) {
		var mazeStatus = {
			player: false,
			maze: false
		}

		if(toPosition === false) {
			if(dir === 'up') mazeStatus.maze = 1
			return mazeStatus
		}

		if(dir === 'up') mazeStatus.maze = 0.5

		var playerMazeVerticalPos = this.calcPlayerRelativeCoords(toPosition[1], dir)

		if(this.checkPlayer(playerMazeVerticalPos)) {
			mazeStatus.player = toPosition
			return mazeStatus
		}

		if(this.verticalPosition < toPosition[1]) {
			mazeStatus.player = toPosition
			return mazeStatus
		}

		if(this.checkCollision(toPosition[0], Math.abs(playerMazeVerticalPos), dir)) {
			mazeStatus.player = toPosition
		}
		else {
			mazeStatus.maze = false
		}

		return mazeStatus
	}

	checkCollision(x, y, dir) {
		var cell = this.mazeData[y][x]

		if(dir === 'up') {
			return cell[2] === 1
		}
		if(dir === 'down') {
			return cell[0] === 1
		}
		if(dir === 'left') {
			return cell[1] === 1
		}
		if(dir === 'right') {
			return cell[3] === 1
		}

		return false
	}

	calcPlayerRelativeCoords(player, dir) {
		var mazePos = this.verticalPosition
		var playerMazePos = Math.round(mazePos - player) - this.mazeHeight

		return playerMazePos
	}
}

// relMazePos = Math.floor(Math.abs(Math.abs(mazePos - this.mazeHeight) - this.mazeHeight))