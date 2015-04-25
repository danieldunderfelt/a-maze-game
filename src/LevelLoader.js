import Level from './Level'
import { GameData } from '../data/GameData'
import { Themes } from '../data/Themes'

class LevelLoader {

	constructor() {
		this.levelData = {
			size: GameData.baseMazeSize,
			height: GameData.baseMazeSize * GameData.initialHeightMultiplier,
			level: 0
		}

		this.currentTheme = Themes.firstLevel
		this.controller = {}
		this.currentLevel = false

	}

	setController(controller) {
		this.controller = controller
	}

	setupLevel(level) {
		this.levelData = this.currentLevel.getLevelData()
		this.levelData.level = level
		this.currentTheme = this.getTheme()
	}

	load() {
		this.currentLevel = new Level(this.controller, this.levelData, this.currentTheme)
	}

	getTheme() {
		var themeKeys = Object.keys(Themes)
		var theme = Themes[themeKeys[ themeKeys.length * Math.random() << 0]];
		return theme
	}

}

export default new LevelLoader()