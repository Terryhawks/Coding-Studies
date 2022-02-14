// @ts-nocheck
/* eslint-disable no-unused-vars */
import Phaser, { Display } from "phaser"
import shipbattle from "./game.js"

var replayButton

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
        this.replayButton = this.add.image(200, 530, "replay")
        this.replayButton.once("pointerup", () => {this.scene.start("ship-scene")}, this)
        this.add.text(80, 300, "SCORE:", { fontSize: "45px", fill: "#fff" })
        this.add.text(300, 300, this.score, { fontSize: "45px", fill: "#fff"})
    }
}