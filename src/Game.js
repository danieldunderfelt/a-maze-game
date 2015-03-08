import Maze from './Maze'
import Player from './Player'

export default class {

	constructor() {
		this.player = {}
		this.maze = {}

		this.level = 0
		this.gridSize = 10
		this.mazeHeight = this.gridSize
	}

	startLevel() {
		this.setLevel(this.level)
		this.setPlayer()
		this.setWorld()
	}

	setLevel(level) {
		if(level & 1 && level !== 0) { // Odd
			this.gridSize++
		} else if(level !== 0) { // Even
			this.mazeHeight++
		}
	}

	setPlayer() {
		this.player = new Player()
		this.player.initialize(this.gridSize)
		this.player.draw()
	}

	setWorld() {
		this.maze = new Maze()
		this.maze.makeMaze(this.gridSize, this.mazeHeight)
	}

	nextLevel() {
		this.level++
	}

	onPlayerEvent(eventData) {
		if(eventData.type === "move") {
			this.playerMove(eventData)
		}
	}

	playerMove(eventData) {
		var toPosition = this.player.move(eventData.direction, true)
		var mazeStatus = this.maze.validateMovement(this.player.getPosition(), toPosition, eventData.direction)

		if(mazeStatus) {
			this.maze.move(eventData.direction)
			this.player.move(eventData.direction, false)
		}
	}
}