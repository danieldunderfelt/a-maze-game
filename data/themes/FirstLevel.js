import { assetRegistry } from '../assetRegistry'
import AnimTest from '../../src/GameObjects/AnimTest'
import DefaultObject from '../../src/GameObjects/DefaultObject'

export var FirstLevel = {
	textures: {
		floor: assetRegistry['hardwood_grey']
	},
	objects: [
		AnimTest
	]
}