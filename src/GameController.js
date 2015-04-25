class GameController {

	constructor() {
		this.canvas = document.getElementById('mazeArea')
	}

	initialize() {
		this.game = new Phaser.Game(
			this.canvas.width,
			this.canvas.height,
			Phaser.AUTO,
			this.canvas,
			null,
			true,
			false,
			null
		)

		this.boot()
	}

	boot() {
		this.game.plugins.add(new Phaser.Plugin.Isometric(this.game))
		game.iso.anchor.setTo(0.5, 0.2);
	}
}

export default new GameController()