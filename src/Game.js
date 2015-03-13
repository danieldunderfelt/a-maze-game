import Player from './Player'
import Level from './Level'
import Maze from './Maze'
import { GameData } from '../data/GameData'

export default class {

	constructor(controller) {
		this.controller = controller
		this.player = new Player()
		this.maze = new Maze(this)
		this.currentLevel = false
		this.lastLevelData = {
			size: GameData.baseMazeSize,
			height: GameData.baseMazeSize * GameData.initialHeightMultiplier,
			level: 0,
			cleared: false,
			started: false
		}

		this.controller.renderer.addToRenderLoop(this.player.draw, this.player)
		this.controller.renderer.addToRenderLoop(this.maze.renderer.draw, this.maze.renderer)
	}

	startLevel() {
		this.currentLevel = new Level(this, this.lastLevelData)
	}

	nextLevel() {
		this.lastLevelData = this.currentLevel.getLevelData()
		this.lastLevelData.level++
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