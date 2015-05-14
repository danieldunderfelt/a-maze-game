import DemoState from './DemoState'
import _ from 'lodash'

const wallDirectionMap = [-(DemoState.size), 1, DemoState.size, -1]

class Pathfinder {

	constructor(renderer) {
		this.renderer = renderer
	}

	newMaze(maze) {
		this.maze = maze
		this.path = []
	}

	walk() {
		var visitedTop = 0
		var currentIndex = 0
		var cellPaths = []
		var cell


	}

	step(indexModifier, index) {
		var currentCell = index + indexModifier
		if(currentCell > this.maze.length - 1 || currentCell < 0) return false

		var cell = this.maze[currentCell]
		if(typeof cell === "undefined") return false

		if(cell.loc.y === DemoState.size - 1) return false

		var pathObj = {
			index: currentCell,
			x: cell.loc.x,
			y: cell.loc.y
		}

		return pathObj
	}

	onSolve() {
		DemoState.mazeSolved = true
	}
}

export default Pathfinder