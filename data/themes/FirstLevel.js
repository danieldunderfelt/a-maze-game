import { assetRegistry } from '../assetRegistry'
import AnimTest from '../../src/GameObjects/AnimTest'
import DefaultObject from '../../src/GameObjects/DefaultObject'
import HighObject from '../../src/GameObjects/HighObject'

export var FirstLevel = {
	textures: {
		floor: assetRegistry['hardwood_grey']
	},
	objects: [
		HighObject,
		HighObject
	]
}