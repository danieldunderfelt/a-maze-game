import Walls from './GameObjects/static/walls/Walls'

class WallGenerator {

	make(isClosed, position) {
		var wallClass = Walls[position]

		if(wallClass !== false)
			return new wallClass(isClosed)

		return false
	}

}

export default new WallGenerator()