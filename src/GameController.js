import Boot from './Boot'

class GameController {

	constructor() {
		this.width = 1000
		this.height = 1000
	}

	initialize() {
		this.game = new Phaser.Game(
			this.width,
			this.height,
			Phaser.AUTO,
			'mazeArea',
			null,
			true,
			false
		)

		this.game.state.add('boot', Boot)
		this.game.state.start('boot')
	}
}

export default new GameController()