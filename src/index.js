import WorldController from './WorldController'
import MainRenderer from './MainRenderer'
import DemoState from './DemoState'

(() => {
	let renderer = new MainRenderer()
	WorldController.newWorld()
	WorldController.generateWorld(DemoState.size, DemoState.size)
	renderer.addWorld(WorldController.getCurrentWorldData(), WorldController.getLayout())
})()