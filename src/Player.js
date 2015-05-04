import BaseObject from './GameObjects/BaseObject'
import GlobalState from './GlobalState'

class Player extends BaseObject {

	constructor(game) {
		super(game)
		this.spriteName = 'hovering_anim'
	}

	add(x, y) {
		super.add(x, y)

		this.object.animations.add('hover')
		this.object.animations.play('hover', 10, true)
	}

	move(dir) {

		if (dir === "up") {
			this.object.y += -GlobalState.playerState.speed
		}

		if (dir === "down") {
			this.object.y += GlobalState.playerState.speed
		}

		if (dir === "left") {
			this.object.x += -GlobalState.playerState.speed
		}

		if (dir === "right") {
			this.object.x += GlobalState.playerState.speed
		}
	}
}

export default Player