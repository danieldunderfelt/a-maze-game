import Player from './Player'
import LevelLoader from './LevelLoader'
import GameRenderer from './GameRenderer'

export class Game {

	constructor() {
		this.player = new Player()
		this.level = 0

		LevelLoader.setController(this)
	}

	startLevel() {
		this.currentLevel = LevelLoader.load(this.level)
	}

	nextLevel() {
		this.level++
		LevelLoader.setupLevel(this.level)
		this.startLevel()
	}
}