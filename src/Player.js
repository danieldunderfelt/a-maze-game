import BaseObject from './GameObjects/BaseObject'
import GlobalState from './GlobalState'

class Player extends BaseObject {

	constructor(game) {
		super(game)
		this.spriteName = 'hovering_anim'
	}

	add(x, y) {
		super.add(x, y)
		this.object.anchor.set(0.5)
		this.game.physics.isoArcade.enable(this.object)
		this.object.body.collideWorldBounds = true

		this.object.animations.add('hover')
		this.object.animations.play('hover', 10, true)
	}

	move(dir) {

		if (dir === "up") {
			this.object.body.velocity.y = -GlobalState.playerState.speed
		}
		else if (dir === "down") {
			this.object.body.velocity.y = GlobalState.playerState.speed
		}
		else {
			this.object.body.velocity.y = 0;
		}

		if (dir === "left") {
			this.object.body.velocity.x = -GlobalState.playerState.speed
		}
		else if (dir === "right") {
			this.object.body.velocity.x = GlobalState.playerState.speed
		}
		else {
			this.object.body.velocity.x = 0;
		}
	}
}

export default Player