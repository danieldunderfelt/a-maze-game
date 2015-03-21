var _root = location.href
var textures = _root + 'textures/'
var sprites = _root + 'sprites/'

var assetUrls = {
	'hardwood_grey': textures + 'floor/hardwood_grey.png',
	'hardwood_white': textures + 'floor/hardwood_white.png',
	'default_sprite': sprites + 'default.gif',
	'anim_test': sprites + 'anim_test.png',
	'high_object': sprites + 'hovering_tubes.png',
	'hovering_anim': sprites + 'hovering_tubes_anim.png',
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