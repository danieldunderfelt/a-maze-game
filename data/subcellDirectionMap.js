/**
 * Definition of where you end up if you go in a direction from a subcell.
 * x and y are CELL coordinates, and signal if a direction means a cell change. 0 means
 * the next subcell in the direction is in the same cell.
 */

export var scDirectionMap = [
	{ // top left
		"up": {
			x: 0, // No cell change on x axis
			y: -1, // One cell up
			index: 6 // new subcell index
		},
		"right": {
			x: 0,
			y: 0,
			index: 1
		},
		"down": {
			x: 0,
			y: 0,
			index: 3
		},
		"left": {
			x: -1,
			y: 0,
			index: 2
		}
	},
	{ // top center
		"up": {
			x: 0,
			y: -1,
			index: 7
		},
		"right": {
			x: 0,
			y: 0,
			index: 2
		},
		"down": {
			x: 0,
			y: 0,
			index: 4
		},
		"left": {
			x: 0,
			y: 0,
			index: 0
		}
	},
	{ // top right
		"up": {
			x: 0,
			y: -1,
			index: 8
		},
		"right": {
			x: 1,
			y: 0,
			index: 0
		},
		"down": {
			x: 0,
			y: 0,
			index: 5
		},
		"left": {
			x: 0,
			y: 0,
			index: 1
		}
	},
	{ // middle left
		"up": {
			x: 0,
			y: 0,
			index: 0
		},
		"right": {
			x: 0,
			y: 0,
			index: 4
		},
		"down": {
			x: 0,
			y: 0,
			index: 6
		},
		"left": {
			x: -1,
			y: 0,
			index: 5
		}
	},
	{ // center
		"up": {
			x: 0,
			y: 0,
			index: 1
		},
		"right": {
			x: 0,
			y: 0,
			index: 5
		},
		"down": {
			x: 0,
			y: 0,
			index: 7
		},
		"left": {
			x: 0,
			y: 0,
			index: 3
		}
	},
	{ // middle right
		"up": {
			x: 0,
			y: 0,
			index: 2
		},
		"right": {
			x: 1,
			y: 0,
			index: 3
		},
		"down": {
			x: 0,
			y: 0,
			index: 8
		},
		"left": {
			x: 0,
			y: 0,
			index: 4
		}
	},
	{ // bottom left
		"up": {
			x: 0,
			y: 0,
			index: 3
		},
		"right": {
			x: 0,
			y: 0,
			index: 7
		},
		"down": {
			x: 0,
			y: 1,
			index: 0
		},
		"left": {
			x: -1,
			y: 0,
			index: 8
		}
	},
	{ // bottom center
		"up": {
			x: 0,
			y: 0,
			index: 4
		},
		"right": {
			x: 0,
			y: 0,
			index: 8
		},
		"down": {
			x: 0,
			y: 1,
			index: 1
		},
		"left": {
			x: 0,
			y: 0,
			index: 6
		}
	},
	{ // bottom right
		"up": {
			x: 0,
			y: 0,
			index: 5
		},
		"right": {
			x: 1,
			y: 0,
			index: 6
		},
		"down": {
			x: 0,
			y: 1,
			index: 2
		},
		"left": {
			x: 0,
			y: 0,
			index: 7
		}
	}
]