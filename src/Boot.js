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
		this.game.time.advancedTiming = true
		this.game.plugins.add(new Phaser.Plugin.Isometric(this.game))
		this.game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE)
		this.game.iso.anchor.setTo(0.5, 0.2)
	}

	setupGlobalState() {
		GlobalState.init(this.game)
	}
}

export default Boot