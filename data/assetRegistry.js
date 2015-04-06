var _root = location.href
var textures = _root + 'textures/'
var sprites = _root + 'sprites/'

var assetUrls = {
	'hardwood_grey': textures + 'floor/hardwood_grey.png',
	'hardwood_white': textures + 'floor/hardwood_white.png',
	'default_sprite': sprites + 'mystery_box.png',
	'anim_test': sprites + 'anim_test.png',
	'high_object': sprites + 'hovering_tubes.png',
	'hovering_anim': sprites + 'hovering_tubes_anim.png',
	'horz_wall_closed': sprites + 'horz_wall_closed.png',
	'horz_wall_open': sprites + 'horz_wall_open.png',
	'top_wall_left': sprites + 'top_wall_left.png',
	'top_wall_right': sprites + 'top_wall_right.png',
	'bottom_wall_right': sprites + 'bottom_wall_right.png',
	'bottom_wall_left': sprites + 'bottom_wall_left.png',
	'left_wall_closed': sprites + 'left_wall_closed.png',
	'left_wall_open': sprites + 'left_wall_open.png',
	'right_wall_open': sprites + 'right_wall_open.png',
	'right_wall_closed': sprites + 'right_wall_closed.png',
}

export var assetRegistry = {}

// Simple preloader

export function preload(resolve) {
	var imgCount = Object.keys(assetUrls).length
	var loaded = 0

	for(var prop in assetUrls) {
		var url = assetUrls[prop]
		assetRegistry[prop] = new Image()

		assetRegistry[prop].onload = function() {
			loaded++
			if(loaded >= imgCount) {
				resolve()
			}
		}

		assetRegistry[prop].src = url
	}
}