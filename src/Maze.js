import { newMaze } from './MazeGenerator'
import MazeRenderer from './MazeRenderer'

export default class {

	constructor(game) {
		this.game = game
		this.mazeData = []
		this.renderer = new MazeRenderer()
		this.verticalPosition = 0
		this.mazeState = {
			cleared: false
		}
	}

	getPosition() {
		return this.verticalPosition
	}

	makeMaze(width, height) {
		this.verticalPosition = 0
		this.mazeState.cleared = false
		this.mazeHeight = height
		this.gridSize = width
		this.mazeData = newMaze(width, height, this.onCellTraverse.bind(this))
		this.renderer.setInitialState(this.mazeData, width, height)
	}

	move(increment) {
		this.verticalPosition = this.verticalPosition + increment
		this.renderer.moveMaze(increment)
	}

	onMazeCleared() {
		this.mazeState.cleared = true
	}

	onCellTraverse(cell, walls) {

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

		if(!toPosition) return mazeStatus // If player would go out of bounds, stop them

		if(dir === 'up') mazeStatus.maze = 0.5 // By default, if going up, move the maze

		// If the player is outside the maze, all is well
		if(this.verticalPosition <= toPosition[1]) {
			mazeStatus.player = toPosition
			return mazeStatus
		}

		var playerMazeVerticalPos = this.calcPlayerRelativeCoords(toPosition[1]) // Get a sensible array key for the vertical position

		// Check if the player made it out of the maze. If so, no reason to continue here.
		if(this.checkPlayer(playerMazeVerticalPos) || this.mazeState.cleared) {
			mazeStatus.player = toPosition
			return mazeStatus
		}
		else {
			var canTraverse = this.checkCollision(toPosition[0], Math.abs(playerMazeVerticalPos), dir) // Do collision check

			// Check what the collision detector said
			if(canTraverse) {

				if(toPosition[1] === 0) {
					mazeStatus.player = false
					mazeStatus.maze = parseInt(this.verticalPosition) === this.verticalPosition ? 1 : 0.5
				}
				else {
					mazeStatus.player = toPosition
				}
			}
			else {
				mazeStatus.maze = false
			}
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

	calcPlayerRelativeCoords(player) {
		var mazePos = this.verticalPosition
		var playerMazePos = Math.round(mazePos - player) - this.mazeHeight

		return playerMazePos
	}
}