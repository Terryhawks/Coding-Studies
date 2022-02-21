// @ts-nocheck
/* eslint-disable no-unused-vars */
import Phaser from "phaser"

import GhostBuster from './scenes/GhostBuster'

const config = {
	type: Phaser.AUTO,
	width: 600,
	height: 930,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	},
	scene: [GhostBuster]
}

export default new Phaser.Game(config)