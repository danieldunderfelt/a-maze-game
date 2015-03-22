import BaseObject from '../../BaseObject'

export default class extends BaseObject {

	constructor(position) {
		super()

		var sprite

		if(position === "left") sprite = this.assets.vertical_wall_left
		if(position === "right") sprite = this.assets.vertical_wall_left
		if(position === "top") sprite = this.assets.vertical_wall_left
		if(position === "bottom") sprite = this.assets.vertical_wall_left

		this.sprite = sprite
	}
}