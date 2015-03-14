import Player from './Player'
import Maze from './Maze'
import LevelLoader from './LevelLoader'
import GameRenderer from './GameRenderer'

export default class {

	constructor(controller) {
		this.controller = controller
		this.player = new Player()
		this.maze = new Maze(this)
		this.level = 0

		LevelLoader.setController(this)
	}

	startLevel() {
		this.currentLevel = LevelLoader.load(this.level)
	}

	nextLevel() {
		this.level++
		this.levelLoader.setupLevel(this.level)
		this.startLevel()
	}

	playerMove(eventData) {
		var toPosition = this.player.calculatePosition(eventData.direction)
		var mazeStatus = this.maze.checkMovement(toPosition, eventData.direction)

		if(mazeStatus.maze !== false) {
			this.maze.move(mazeStatus.maze)
		}

		if(mazeStatus.player !== false) {
			this.player.move(mazeStatus.player)
		}

		if(this.maze.mazeState.cleared) {
			this.currentLevel.cleared = true
			this.nextLevel()
		}
	}
}