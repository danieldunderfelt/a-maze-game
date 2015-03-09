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

	validateMovement(toPosition, dir) {
		if(this.verticalPosition < toPosition[1]) return true

		var relativeY = this.viewportCoordsToMaze(toPosition[1], dir)

		console.log(relativeY)
		return true
		if(relativeY > 9) return true

		var cellX = toPosition[0]
		var cellY = relativeY

		var cell = this.mazeData[cellY][cellX]

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
	}

	viewportCoordsToMaze(player, dir) {
		var mazePos = this.verticalPosition

		var relativeMazePos = Math.abs(Math.abs(mazePos - this.mazeHeight) - this.mazeHeight)

		var playerRelativeMazePos = Math.round(relativeMazePos - player)

		return Math.abs(playerRelativeMazePos - this.mazeHeight)
	}
}