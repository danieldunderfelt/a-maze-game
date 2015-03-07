import { newMaze } from './MazeGenerator'
import MazeRenderer from './MazeRenderer'

export default class {

	constructor() {
		this.mazeData = []
		this.renderer = {}
	}

	makeMaze(size) {
		this.mazeData = newMaze(size, size)
		this.renderer = new MazeRenderer(this.mazeData, size)
		this.renderer.setInitialPosition()
		this.renderer.draw()
	}

	draw() {
		this.renderer.draw()
	}

	onPlayerEvent(eventData) {
		var dir = false

		if(eventData.direction === 'up') {
			dir = 'down'
		}

		if(dir !== false) {
			this.renderer.moveMaze(dir)
			this.renderer.draw()
		}
	}
}