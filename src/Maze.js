import { generateMaze } from './MazeGenerator'
import MazeRenderer from './MazeRenderer'
import WorldGenerator from './WorldGenerator'

export default class {

	constructor(game) {
		this.game = game
		this.player = {}
		this.renderer = false
		this.theme = {}
		this.worldData = []
		this.verticalPosition = 0
		this.mazeStep = 0.05
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

	setPlayer(playerObject) {
		this.player = playerObject
	}

	makeMaze(width, height) {
		if(this.renderer !== false) this.renderer.dispose()

		this.verticalPosition = 0
		this.mazeState.cleared = false
		this.gridSize = width
		this.mazeStep = width / 50

		var generatedMaze = generateMaze(width, height, this.onCellTraverse.bind(this))

		this.worldData = new WorldGenerator(this.theme, generatedMaze, width, height)

		this.worldHeight = height + (width * 2)
		this.renderer = new MazeRenderer(this.theme, this.worldData, width, this.worldHeight)

		return this.worldData
	}

	move() {
		var mazeOffset = this.renderer.moveMaze(this.mazeStep)
		if(!mazeOffset) return false
		this.verticalPosition = this.verticalPosition + this.mazeStep

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
}