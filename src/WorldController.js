import { generateMaze } from './MazeGenerator'
import WorldGenerator from './WorldGenerator'

class WorldController {

	constructor() {
		this.currentWorld = {}
		this.layout = []
	}

	newWorld() {
		this.saveWorld()
		this.currentWorld = {}
	}

	generateWorld(theme, width, height) {
		let generatedMaze = generateMaze(width, height)

		this.currentWorld.theme = theme
		this.layout = new WorldGenerator(theme, generatedMaze, width, height)
		this.currentWorld.height = height + (width * 2)
		this.currentWorld.width = width

		return this.currentWorld
	}

	getCurrentWorldData() {
		return {
			width: this.currentWorld.width,
			height: this.currentWorld.height,
			theme: this.currentWorld.theme
		}
	}

	getLayoutGenerator() {
		return function *DataGenerator() {

		}
	}

	saveWorld() {

	}

	insert() {

	}
}

export default new WorldController()