import $ from 'jquery'
import * as Babel from '../jspm_packages/babel-polyfill'
import GameController from './GameController'

$(() => {
	GameController.initialize()
})