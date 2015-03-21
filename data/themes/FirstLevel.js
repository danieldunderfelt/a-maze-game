import { assetRegistry } from '../assetRegistry'
import AnimTest from '../../src/GameObjects/AnimTest'
import HighObject from '../../src/GameObjects/HighObject'

export var FirstLevel = {
	textures: {
		floor: assetRegistry['hardwood_grey']
	},
	objects: [
		HighObject,
		AnimTest
	]
}