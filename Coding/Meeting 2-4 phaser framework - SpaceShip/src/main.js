import Phaser from 'phaser'
import shipbattle from "./scenes/game.js"

const config = {
	type: Phaser.AUTO,
	width: 400,
	height: 620,
	physics: {
		default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
	},
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	scene: [shipbattle]
}

export default new Phaser.Game(config)