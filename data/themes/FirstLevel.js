import DefaultObject from '../../src/GameObjects/DefaultObject'
var root = location.href

export var FirstLevel = {
	textures: {
		floor: root + '/textures/floor/hardwood_white.png'
	},
	objects: [
		DefaultObject
	]
}