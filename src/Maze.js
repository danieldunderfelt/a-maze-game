import { generateMaze } from './MazeGenerator'
import MazeRenderer from './MazeRenderer'
import { generateWorld } from './WorldGenerator'

export default class {

	constructor(game) {
		this.game = game
		this.renderer = false
		this.theme = {}
		this.worldData = []
		this.verticalPosition = 0
		this.mazeStep = 0.05
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
		this.gridSize = width
		this.mazeStep = width / 50
		var generatedMaze = generateMaze(width, height, this.onCellTraverse.bind(this))

		this.worldData = generateWorld(generatedMaze, width, height)

		this.worldHeight = height * 3
		this.renderer = new MazeRenderer(this.theme, this.worldData, width, this.worldHeight)
	}

	move(increment) {
		var mazeOffset = this.renderer.moveMaze(increment)
		if(!mazeOffset) return false
		console.log("maze move")
		this.verticalPosition = this.verticalPosition + increment

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
		if(y > this.worldData.length - 1 || x > this.worldData[y].length - 1) return true
		return true
		var cell = this.worldData[y][x]

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
		var vertDir = dir === 'up' || dir === 'down' ? dir : this.playerPrevDir
		var horzDir = dir === 'left' || dir === 'right' ? dir : this.playerPrevHorzDir
		var modifyVert = 0.2
		var modifyHorz = 0.1

		var mazePos = this.verticalPosition
		var playerX = player[0] + modifyHorz
		var playerY = player[1] + modifyVert

		var mazePlayerY = Math.round((mazePos - playerY) - this.worldHeight)

		var pos = [Math.round(playerX), mazePlayerY]
		//console.log(pos)
		return pos
	}
}