import DefaultObject from '../../GameObjects/static/DefaultObject'
import { paths } from '../paths'

export var FirstLevel = {
	textures: {
		floor: 'hardwood_grey'
	},
	objects: [
		DefaultObject
	],
	assets: {
		static: {
			'hardwood_grey': paths.textures + 'floor/hardwood_grey.png',
			'hardwood_white': paths.textures + 'floor/hardwood_white.png',
			'default_sprite': paths.sprites + 'mystery_box.png',
			'high_object': paths.sprites + 'hovering_tubes.png',
			'horz_wall_closed': paths.sprites + 'horz_wall_closed.png',
			'horz_wall_closed_green': paths.sprites + 'horz_wall_closed_green.png',
			'top_wall_left': paths.sprites + 'top_wall_left.png',
			'top_wall_right': paths.sprites + 'top_wall_right.png',
			'bottom_wall_right': paths.sprites + 'bottom_wall_right.png',
			'bottom_wall_left': paths.sprites + 'bottom_wall_left.png',
			'left_wall': paths.sprites + 'left_wall.png',
			'right_wall': paths.sprites + 'right_wall.png',
		},
		animated: {
			'anim_test': [paths.sprites + 'anim_test.png', 32, 32, 16],
			'hovering_anim': [paths.sprites + 'hovering_tubes_anim.png', 32, 64, 5],
		}
	}
}