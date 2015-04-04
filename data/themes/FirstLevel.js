import { assetRegistry } from '../assetRegistry'
import AnimTest from '../../src/GameObjects/animated/AnimTest'
import HighObject from '../../src/GameObjects/static/HighObject'

export var FirstLevel = {
	textures: {
		floor: assetRegistry['hardwood_grey']
	},
	objects: [
		AnimTest
	]
}