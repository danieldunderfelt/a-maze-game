import { assetRegistry } from '../assetRegistry'
import AnimTest from '../../src/GameObjects/animated/AnimTest'
import DefaultObject from '../../src/GameObjects/static/DefaultObject'
import HighObject from '../../src/GameObjects/static/HighObject'

export var FirstLevel = {
	textures: {
		floor: assetRegistry['hardwood_grey']
	},
	objects: [
		DefaultObject
	]
}