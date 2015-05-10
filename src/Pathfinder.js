import DemoState from './DemoState'
import _ from 'lodash'

var wallDirectionMap = [-(DemoState.size), 1, DemoState.size, -1]

class Pathfinder {

	constructor(renderer) {
		this.renderer = renderer
	}

	newMaze(maze) {
		this.maze = maze
		this.currentCell = (maze.length - 1) - (Math.random() * 9 | 0)
		this.path = []
		let pathObj = this.step(0)
		this.renderer.setWalkerPath(pathObj)
	}

	walk() {
		let cell = this.maze[this.currentCell]
		var decision = false, pathObj = false

		for(let w = 0; w < cell.walls.length; w++) {
			if(cell.walls[w] === 1) {
				pathObj = this.step(wallDirectionMap[w])
			}
		}

		if(pathObj !== false) this.renderer.setWalkerPath(pathObj)
	}

	step(indexModifier) {
		var currentCell = this.currentCell + indexModifier
		if(currentCell > this.maze.length - 1 || currentCell < 0) return false

		var cell = this.maze[currentCell]
		if(typeof cell === "undefined") return false

		this.currentCell = currentCell

		var pathObj = {
			cellIndex: this.currentCell,
			loc: cell.loc
		}

		this.path.push(pathObj)

		if(cell.loc.y === 0) this.onSolve()
		return pathObj
	}

	onSolve() {
		DemoState.mazeSolved = true
	}
}

export default Pathfinder