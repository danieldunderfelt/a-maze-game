import { newMaze } from './MazeGenerator'
import MazeRenderer from './MazeRenderer'

export default class {

	constructor(game) {
		this.game = game
		this.renderer = false
		this.theme = {}
		this.mazeData = []
		this.verticalPosition = 0
		this.playerPrevDir = 'up'
		this.playerPrevHorzDir = 'left'
		this.mazeState = {
			cleared: false
		}
	}

	getPosition() {
		return this.verticalPosition
	}

	setTheme(theme) {
		this.theme = theme
	}

	makeMaze(width, height) {
		if(this.renderer !== false) this.renderer.dispose()

		this.verticalPosition = 0
		this.playerPrevPos = [0, 0]
		this.mazeState.cleared = false
		this.mazeHeight = height
		this.gridSize = width
		this.mazeStep = width / 100
		this.mazeData = newMaze(width, height, this.onCellTraverse.bind(this))
		this.renderer = new MazeRenderer(this.theme, this.mazeData, width, height)
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
		if(verticalPosition > 1) {
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

		var playerMazePos = this.getCurrentCell(toPosition, dir) // Get sensible array keys

		if(dir === 'up' || dir === 'down') this.playerPrevDir = dir
		if(dir === 'left' || dir === 'right') this.playerPrevHorzDir = dir

		if(dir === 'up') mazeStatus.maze = this.mazeStep // By default, if going up, move the maze

		// If the player is outside the maze, all is well
		if(this.verticalPosition <= toPosition[1]) {
			mazeStatus.player = toPosition
			return mazeStatus
		}

		// Check if the player made it out of the maze. If so, no reason to continue here.
		if(this.checkPlayer(playerMazePos[1]) || this.mazeState.cleared) {
			mazeStatus.player = toPosition
			return mazeStatus
		}

		else {
			var canTraverse = this.checkCollision(playerMazePos[0], Math.abs(playerMazePos[1]), dir) // Do collision check

			// Check what the collision detector said
			if(canTraverse) {

				if(toPosition[1] === 0) {
					mazeStatus.player = false
					mazeStatus.maze = parseInt(this.verticalPosition) === this.verticalPosition ? this.mazeStep * 2 : this.mazeStep
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
		if(y > this.mazeData.length - 1 || x > this.mazeData[y].length - 1) return true

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

	getCurrentCell(player, dir) {
		var rounding, horzRounding
		var vertDir = dir === 'up' || dir === 'down' ? dir : this.playerPrevDir
		var horzDir = dir === 'left' || dir === 'right' ? dir : this.playerPrevHorzDir

		if(vertDir === 'up') {
			rounding = 'floor'
		}
		if(vertDir === 'down') {
			rounding = 'floor'
		}
		if(horzDir === 'left') {
			horzRounding = 'floor'
		}
		if(horzDir === 'right') {
			horzRounding = 'ceil'
		}

		var mazePos = Math[rounding](this.verticalPosition)
		var playerX = Math[horzRounding](player[0])
		var playerY = Math.round(mazePos - player[1]) - this.mazeHeight

		console.log(playerX, playerY)
		return [playerX, playerY]
	}
}