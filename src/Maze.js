import { newMaze } from './MazeGenerator'
import MazeRenderer from './MazeRenderer'

export default class {

	constructor() {
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

	move(dir) {
		if(dir === 'up') {
			this.verticalPosition = this.verticalPosition + 0.5
	 		this.renderer.moveMaze(dir)
			this.renderer.draw()
		}
	}

	validateMovement(fromPosition, toPosition, dir) {
		if(toPosition === false) return false
		if(this.verticalPosition - 1 < toPosition[1]) return true

		var relativeMazePosition = this.viewportCoordsToMaze(toPosition[1], dir)

		var relativePosition = [
			toPosition[0] - 1,
			relativeMazePosition
		]

		console.log(relativePosition)

		var cell = this.mazeData[relativePosition[1]][relativePosition[0]]

		if(dir === 'up') {
			return cell[0] === 1
		}
		if(dir === 'down') {
			return cell[2] === 1
		}
		if(dir === 'left') {
			return cell[3] === 1
		}
		if(dir === 'right') {
			return cell[1] === 1
		}
	}

	viewportCoordsToMaze(viewport, dir) {
		var roundedCoordPlayer = parseInt(viewport, 10)

		if(dir === 'down' && parseInt(viewport) !== viewport) {
			roundedCoordPlayer = viewport + 0.5
		}

		var roundedCoordMaze = parseInt(this.verticalPosition)

		if(parseInt(this.verticalPosition) !== this.verticalPosition) {
			roundedCoordMaze = this.verticalPosition + 0.5
		}

		return Math.abs(Math.abs(roundedCoordPlayer - roundedCoordMaze) - this.mazeHeight)
	}
}