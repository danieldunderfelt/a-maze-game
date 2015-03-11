import { newMaze } from './MazeGenerator'
import MazeRenderer from './MazeRenderer'

export default class {

	constructor(game) {
		this.level = game
		this.mazeData = []
		this.renderer = {}
		this.processor = {}
		this.verticalPosition = 0
		this.mazeState = {
			cleared: false,
			started: false
		}
	}

	getPosition() {
		return this.verticalPosition
	}

	makeMaze(width, height) {
		this.mazeHeight = height
		this.mazeData = newMaze(width, height, this.onCellTraverse)
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
		this.mazeState.cleared = true
		this.level.game.onPlayerEvent({
			type: 'maze',
			mazeStatus: true
		})
	}

	onCellTraverse(cell, walls) {

	}

	checkPlayer(verticalPosition) {
		if(verticalPosition > 0) {
			this.onMazeCleared()
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
		var canTraverse = this.checkCollision(toPosition[0], Math.abs(playerMazeVerticalPos), dir) // Do collision check

		// Check if the player made it out of the maze. If so, no reason to continue here.
		if(this.checkPlayer(playerMazeVerticalPos)) {
			mazeStatus.player = toPosition
			return mazeStatus
		}

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

// relMazePos = Math.floor(Math.abs(Math.abs(mazePos - this.mazeHeight) - this.mazeHeight))