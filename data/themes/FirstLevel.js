import { assetRegistry } from '../assetRegistry'
import DefaultObject from '../../src/GameObjects/DefaultObject'

export var FirstLevel = {
	textures: {
		floor: assetRegistry['hardwood_grey']
	},
	objects: [
		DefaultObject,
		DefaultObject,
		DefaultObject,
		DefaultObject,
		DefaultObject,
		DefaultObject,
		DefaultObject,
		DefaultObject,
		DefaultObject,
		DefaultObject,
		DefaultObject
	]
}