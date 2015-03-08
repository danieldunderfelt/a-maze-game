export default class {

	constructor(mazeData, width, height) {
		this.width = width
		this.height = height
		this.data = mazeData
		this.processedRows = []
	}

	makeAdjustments() {
		var stepsDown = 0
		var totalCells = this.width * this.height
		var checkedCells = 0

		var curX = 0
		var curY = 0

		var solution = []

		while(checkedCells < totalCells || curY >= this.height) {

			// If we're out of bounds, start a new row
			if(curX >= this.width) {
				curX = 0
				curY++
			}

			// Get current cell walls
			var currentCell = this.data[curY][curX]

			// If we're at the top row, make sure the cell doesn't have a top wall
			if(curY === 0 && currentCell[0] === 0) {
				curX++
				checkedCells++
				continue
			}

			// Left side
			if(curX === 0) {

				if(currentCell[2] === 1) {
					solution.push([curX, curY])
					curY++
					continue
				}
				else if(currentCell[1] === 1) {
					solution.push([curX, curY])
					curX++
					continue
				}
				else {
					curY--
					curX++
					continue
				}
			}

			// Right side
			if(curX === this.width - 1) {

			}

			else {
				if(currentCell[2] === 1) {
					solution.push([curX, curY])
					curY++
					continue
				}
				if(currentCell[1] === 1) {
					solution.push([curX, curY])
					curX++
					continue
				}
				if(currentCell[3] === 1) {
					solution.push([curX, curY])
					curX--
					continue
				}
			}
		}

		console.log(solution)

		return { maze: this.data }
	}
}