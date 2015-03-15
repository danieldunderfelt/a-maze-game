export function generateWorld(maze, width, height) {
	var mazeData = maze
	var openArea = []

	console.log(width * 2)

	for(let h = 0; h < width; h++) {
		var openRows = []

		for(let w = 0; w < width; w++) {
			openRows.push([1, 1, 1, 1])
		}

		mazeData.unshift(openRows)
		mazeData.push(openRows)
	}

	console.log(mazeData)

	return mazeData
}