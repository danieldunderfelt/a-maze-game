import Maze from './Maze'
import Input from './Input'
import Player from './Player'

class GameController {

	constructor() {
		this.maze = new Maze()
		this.player = {}
		this.input = new Input(this.playerEvent.bind(this))
	}

	initialize() {
		this.player = new Player(20)
		this.player.draw()
		this.maze.makeMaze(20)
		this.input.start()
	}

	playerEvent(eventData) {
		this.maze.onPlayerEvent(eventData)
		this.player.move(eventData.direction)
	}
}

export default new GameController()