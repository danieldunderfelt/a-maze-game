import GlobalState from './GlobalState'
import LevelLoader from './LevelLoader'

class Boot {

	constructor(game) {
		this.game = game
	}

	create() {
		this.setupEngine()
		this.setupGlobalState()
		GlobalState.create()

		this.game.state.add('loadlevel', LevelLoader)
		this.game.state.start('loadlevel')
	}

	update() {
		GlobalState.update()
	}

	setupEngine() {
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
	}

	setupGlobalState() {
		GlobalState.init(this.game)
	}
}

export default Boot