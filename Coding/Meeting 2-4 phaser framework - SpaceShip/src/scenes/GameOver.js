// @ts-nocheck
/* eslint-disable no-unused-vars */
import Phaser, { Display } from "phaser"

var replay_btn

export default class GameOverScene extends Phaser.Scene
{
	constructor() {
		super("GameOverScene")
	}

    init(data) {
        this.score = data.score
    }

	preload() {
        this.load.image("background", "images/SpaceBG.jpg")
        this.load.image("gameOver", "images/gameOver.png")
        this.load.image("replay", "images/replay.png")
    }

    create() {
        const gameHeight = this.scale.height * .5
        const gameWidth = this.scale.width * .5
        this.add.image(gameWidth, gameHeight, "background").setScale(1.2, 1).setScrollFactor(1, 0);
        this.add.image(200, 200, "gameOver")
        this.replay_btn = this.add.image(200, 530, "replay")
        this.replay_btn.once("pointerup", () => {this.scene.start("ship-scene")}, this)
        this.add.text(80, 300, "SCORE:", { fontSize: "60px", fill: "#000" })
        this.add.text(300, 300, this.score, { fontSize: "60px", fill: "#000"})
    }
}