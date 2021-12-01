/* eslint-disable no-unused-vars */
import Phaser from "phaser"
var replayButton;
export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super("game-over-scene")
    }

    preload() {
        this.load.image("background", "Assets/bg_layer1.png");
        this.load.image("gameOver", "Assets/gameover.png");
        this.load.image("replay", "Assets/replay.png");
    }

    create() {
        this.add.image(240, 320, "background")
        this.add.image(240, 280, "gameOver")
        this.replayButton = this.add.image(240, 420, "replay").setInteractive()
        this.replayButton.once("pointerup", () => {this.scene.start("game")}, this)
    }
}