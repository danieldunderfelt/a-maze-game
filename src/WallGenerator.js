import Walls from './GameObjects/static/walls/Walls'

class WallGenerator {

	make(isClosed, position, part) {
		var wallClass = Walls[position]
		return new wallClass(isClosed, part)
	}

}

export default new WallGenerator()