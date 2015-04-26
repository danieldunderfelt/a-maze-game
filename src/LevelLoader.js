import Level from './Level'
import { Themes } from './data/Themes'
import GlobalState from './GlobalState'

class LevelLoader {

	constructor(game) {
		this.game = game
		this.currentTheme = null
	}

	init() {
		this.currentTheme = this.getTheme()
	}

	preload() {
		for(let asset in this.currentTheme.assets.static) {
			this.game.load.image(asset, this.currentTheme.assets.static[asset])
		}

		for(let asset in this.currentTheme.assets.animated) {
			var assetData = this.currentTheme.assets.animated[asset]
			this.game.load.spritesheet(asset, assetData[0], assetData[1], assetData[2], assetData[3])
		}

		GlobalState.levelState.level++
	}

	create() {
		var stateKey = 'level' + GlobalState.levelState.level
		this.game.state.add(stateKey, Level)
		this.game.state.start(stateKey, true, false, this.currentTheme)
	}

	getTheme() {
		var themeKeys = Object.keys(Themes)
		var theme = Themes[themeKeys[ themeKeys.length * Math.random() << 0]];
		return theme
	}

}

export default LevelLoader