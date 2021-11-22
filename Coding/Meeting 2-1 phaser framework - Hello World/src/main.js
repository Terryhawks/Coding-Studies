import Phaser from 'phaser'

import AmongUsScene from './scenes/AmongUsScene.js'

const config = {
	type: Phaser.AUTO,
	width: 1000,
	height: 750,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [AmongUsScene]
}

export default new Phaser.Game(config)