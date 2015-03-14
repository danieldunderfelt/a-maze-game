import Level from './Level'
import GameRenderer from './GameRenderer'
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
		this.loadedTheme = {}
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
		var assetLoad = new Promise(this.loadThemeAssets.bind(this))
		assetLoad.then(() => {
			this.currentLevel = new Level(this.controller, this.levelData, this.loadedTheme)
		})
	}

	getTheme() {
		var themeKeys = Object.keys(Themes)
		var theme = Themes[themeKeys[ themeKeys.length * Math.random() << 0]];
		return theme
	}

	loadThemeAssets(resolve, reject) {
		// Preparation
		this.loadedTheme = this.currentTheme

		new Promise(this.loadImages.bind(this)).then( () => {
			resolve()
		})

	}

	loadImages(resolve, reject) {
		var imgCount = Object.keys(this.currentTheme.textures)
		var loaded = 0

		for(var prop in this.currentTheme.textures) {
			var url = this.currentTheme.textures[prop]

			var img = new Image()

			img.onload = () => {
				loaded++
				this.loadedTheme.textures[prop] = img

				if(loaded >= imgCount.length) {
					resolve()
				}
			}

			img.src = url
		}
	}

}

export default new LevelLoader()