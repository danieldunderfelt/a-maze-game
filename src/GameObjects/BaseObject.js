export default class {

	constructor(game) {
		this.game = game
		this.spriteName = 'high_object'
		this.object = {}
		this.id = guid()
		this.x = 0
		this.y = 0
		this.subcell = 0
		this.mazeCell = [0, 0]
	}

	add(x, y) {
		this.object = this.game.add.sprite(x, y, this.spriteName)
	}

	setLocationData(subcellPosition, mazeLocation, mazeCellWall) {
		this.subcell = subcellPosition
		this.mazeCell = mazeLocation
		this.againstWall = mazeCellWall
	}
}

function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}

	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		   s4() + '-' + s4() + s4() + s4();
}