import Player from './Player'
import Level from './Level'

export default class {

	constructor(controller) {
		this.controller = controller
		this.player = new Player()
		this.maze = {}
		this.level = 0
		this.currentLevel = false
	}

	startLevel() {
		if(this.currentLevel !== false) this.currentLevel.dispose()
		this.currentLevel = new Level(this, this.level)
	}

	nextLevel() {
		this.level++
		this.startLevel()
	}

	onPlayerEvent(eventData) {
		if(eventData.type === "move" && !this.currentLevel.maze.mazeState.cleared) {
			this.playerMove(eventData)
		}
		if(eventData.type === 'maze') {
			this.playerStatus(eventData)
		}
	}

	playerStatus(data) {
		this.nextLevel()
	}

	playerMove(eventData) {
		var toPosition = this.player.calculatePosition(eventData.direction)
		var mazeStatus = this.currentLevel.maze.checkMovement(toPosition, eventData.direction)

		if(mazeStatus.maze !== false) {
			this.currentLevel.maze.move(mazeStatus.maze)
		}

		if(mazeStatus.player !== false) {
			this.player.move(mazeStatus.player)
		}
	}
}