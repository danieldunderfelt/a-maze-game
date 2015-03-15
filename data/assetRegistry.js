var _root = location.href
var textures = _root + 'textures/'
var sprites = _root + 'sprites/'

var assetUrls = {
	'hardwood_grey': textures + 'floor/hardwood_grey.png',
	'hardwood_white': textures + 'floor/hardwood_white.png',
	'default_sprite': sprites + 'default.gif'
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