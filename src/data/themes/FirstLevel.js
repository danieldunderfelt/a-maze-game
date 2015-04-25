import DefaultObject from '../../src/GameObjects/static/DefaultObject'
import { meta } from './meta'

export var FirstLevel = {
	textures: {
		floor: 'hardwood_grey'
	},
	objects: [
		DefaultObject
	],
	assets: {
		'hardwood_grey': textures + 'floor/hardwood_grey.png',
		'hardwood_white': textures + 'floor/hardwood_white.png',
		'default_sprite': sprites + 'mystery_box.png',
		'anim_test': sprites + 'anim_test.png',
		'high_object': sprites + 'hovering_tubes.png',
		'hovering_anim': sprites + 'hovering_tubes_anim.png',
		'horz_wall_closed': sprites + 'horz_wall_closed.png',
		'horz_wall_closed_green': sprites + 'horz_wall_closed_green.png',
		'top_wall_left': sprites + 'top_wall_left.png',
		'top_wall_right': sprites + 'top_wall_right.png',
		'bottom_wall_right': sprites + 'bottom_wall_right.png',
		'bottom_wall_left': sprites + 'bottom_wall_left.png',
		'left_wall': sprites + 'left_wall.png',
		'right_wall': sprites + 'right_wall.png',
	}
}