import { assetRegistry } from '../assetRegistry'
import AnimTest from '../../src/GameObjects/animated/AnimTest'
import WallObject from '../../src/GameObjects/static/walls/WallObject'

export var FirstLevel = {
	textures: {
		floor: assetRegistry['hardwood_grey']
	},
	levelObjects: {
		"wall": WallObject
	},
	objects: [
		AnimTest
	]
}