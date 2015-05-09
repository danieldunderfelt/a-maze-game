import { generateMaze } from './MazeGenerator'
import WorldGenerator from './WorldGenerator'
import MainRenderer from './MainRenderer'

class WorldController {

	verticalStep = 0

	constructor() {
		this.currentWorld = {}
		this.layout = []
		this.objects = {}
		this.renderer = false
	}

	newWorld() {
		this.currentWorld = {}
		this.objects = {}
	}

	generateWorld(width, height) {
		let generatedMaze = generateMaze(width, height)
		this.layout = new WorldGenerator(generatedMaze, width, height, this.cellCallback.bind(this))
		this.currentWorld.height = height
		this.currentWorld.width = width
	}

	cellCallback(cell) {
		//
	}

	getCurrentWorldData() {
		return this.currentWorld
	}

	getLayout() {
		return this.layout
	}
}

export default new WorldController()