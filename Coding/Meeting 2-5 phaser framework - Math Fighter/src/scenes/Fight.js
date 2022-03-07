/* eslint-disable no-undef */
// @ts-nocheck
/* eslint-disable no-unused-vars */
import Phaser from "phaser";

export default class Fight extends Phaser.Scene{
    constructor(){
        super("Fight")
    }
    
    init(){
        this.gameHalfWidth = this.scale.width * 0.5
        this.gameHalfHeight = this.scale.height * 0.5
        this.player = undefined
        this.enemy = undefined
        this.slash = undefined
        this.button1 = undefined
        this.button2 = undefined
        this.button3 = undefined
        this.button4 = undefined
        this.button5 = undefined
        this.button6 = undefined
        this.button7 = undefined
        this.button8 = undefined
        this.button9 = undefined
        this.button0 = undefined
        this.buttonDel = undefined
        this.buttonOk = undefined
    }
    
    preload(){
        this.load.image("background", "Images/bg_layer1.png")
        this.load.image("fight-bg", "Images/fight-bg.png")
        this.load.image("tile", "Images/tile.png")
        this.load.image("start-btn", "Images/start_button.png")
        this.load.image("gameover", "Images/gameover.png")
        this.load.image("replay", "Images/replay.png")
        this.load.spritesheet("player", "Images/warrior1.png", {frameWidth:80, frameHeight:80})
        this.load.spritesheet("enemy", "Images/warrior2.png", {frameWidth:80, frameHeight:80})
        this.load.spritesheet("numbers", "Images/numbers.png", {frameWidth:71.25, frameHeight:131})
        this.load.spritesheet("slash", "Images/slash.png", {frameWidth:42, frameHeight:88})
    }
    
    create(){
        this.createAnimation()
        this.add.image(240, 320, "background")
        const fight_bg = this.add.image(240,160,"fight-bg")
        const tile = this.physics.add.staticImage(240,
        fight_bg.height - 40, "tile")
        this.player = this.physics.add.sprite(
            this.gameHalfWidth - 150,
            this.gameHalfHeight - 75,
            "player"
        ).setOffset(-50,-8).setBounce(0.5)
        this.enemy = this.physics.add.sprite(
            this.gameHalfWidth + 150,
            this.gameHalfHeight - 75,
            "enemy"
        ).setOffset(50,-5).setBounce(0.5).setFlipX(true)
        this.slash = this.physics.add.sprite(240, 60, "slash").setActive(false).setVisible(false).setGravityY(-500).setOffset(0, -10).setDepth(1).setCollideWorldBounds(true)
        this.physics.add.collider(this.player, tile)
        this.physics.add.collider(this.enemy, tile)
        
        let start_button = this.add.image(this.gameHalfWidth, this.gameHalfHeight + 181, "start-btn").setInteractive(); start_button.on("pointerdown", () => {this.gameStart(); start_button.destroy()}, this)
    }
    
    update(){

    }
    
    createAnimation(){
        this.anims.create({
            key: "player-die",
            frames: this.anims.generateFrameNumbers("player",
            { start: 0, end: 4 }),
            frameRate: 10,
        })
        this.anims.create({
            key: "player-hit",
            frames: this.anims.generateFrameNumbers("player",
            { start: 5, end: 9 }),
            frameRate: 10,
        })
        this.anims.create({
            key: "player-attack",
            frames: this.anims.generateFrameNumbers("player",
            { start: 10, end: 14 }),
            frameRate: 10
        })
        this.anims.create({
            key: "player-standby",
            frames: this.anims.generateFrameNumbers("player",
            { start: 15, end: 19 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: "enemy-die",
            frames: this.anims.generateFrameNumbers("enemy",
            { start: 0, end: 4 }),
            frameRate: 10,
        })
        this.anims.create({
            key: "enemy-hit",
            frames: this.anims.generateFrameNumbers("enemy",
            { start: 5, end: 9 }),
            frameRate: 10,
        })
        this.anims.create({
            key: "enemy-attack",
            frames: this.anims.generateFrameNumbers("enemy",
            { start: 10, end: 14 }),
            frameRate: 10
        })
        this.anims.create({
            key: "enemy-standby",
            frames: this.anims.generateFrameNumbers("enemy",
            { start: 15, end: 19 }),
            frameRate: 10,
            repeat: -1
        })
    }
    
    gameStart(){
        this.startGame = true
        this.player.anims.play("player-standby", true)
        this.enemy.anims.play("enemy-standby", true)
        this.resultText = this.add.text(this.gameHalfWidth, 400, "0", { fontSize : "32px", fill: "#000"})
        this.questionText = this.add.text(this.gameHalfWidth, 200, "0", { fontSize : "32px", fill: "#000"})
    }
}