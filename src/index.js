import WorldController from './WorldController'
import MainRenderer from './MainRenderer'
import DemoState from './DemoState'
import Pathfinder from './Pathfinder'

var renderer, walker

(() => {
	renderer = new MainRenderer()
	walker = new Pathfinder(renderer)
	reloadMaze()

	document.getElementById('reload-maze').addEventListener("click", reloadMaze)
	document.getElementById('solve').addEventListener("click", solveMaze)
})()

function reloadMaze() {
	var button = document.getElementById('reload-maze')
	button.disabled = true

	var callback = () => {
		renderer.addWorld(WorldController.getCurrentWorldData(), WorldController.getLayout())
		button.disabled = false
	}

	WorldController.newWorld()
	WorldController.generateWorld(DemoState.size, DemoState.size, callback)
	DemoState.mazeSolved = false
	DemoState.walkerStarted = false
}

function solveMaze() {
	if(DemoState.mazeSolved) alert("Maze already solved. Click Reload maze for a new one.")

	if(!DemoState.walkerStarted) {
		walker.newMaze(WorldController.getLayout())
		DemoState.walkerStarted = true
	}

	walker.walk()
}