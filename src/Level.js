import Maze from './Maze'
import { GameData }from '../data/GameData'

export default class {

	constructor(game, level, data = null) {

		this.maze = new Maze(this)
		this.level = level
		this.gridSize = GameData.baseMazeSize
		this.mazeHeight = GameData.baseMazeSize
		this.data = data
		this.game = game
		this.cleared = false

		this.start()
	}

	start() {
		this.setState()
		this.setPlayer()
		this.setWorld()

		console.log(this.gridSize, this.mazeHeight)
	}

	setState() {
		if(this.level & 1 && this.level > GameData.baseMazeSize) { // Odd
			this.gridSize = this.level + 1
			this.mazeHeight = this.level
		}
		else if(this.level > GameData.baseMazeSize) { // Even
			this.gridSize = this.level
			this.mazeHeight = this.level + 1
		}
	}

	setPlayer() {
		this.game.player.initialize(this.gridSize)
		this.game.player.setInitialPosition()
		this.game.player.draw()
	}

	setWorld() {
		this.maze.makeMaze(this.gridSize, this.mazeHeight)
	}

	dispose() {
		delete this
	}
}