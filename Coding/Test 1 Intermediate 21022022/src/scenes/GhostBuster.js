/* eslint-disable no-undef */
// @ts-nocheck
/* eslint-disable no-unused-vars */
import Phaser, { Display } from "phaser"
import Bomb from "../ui/bomb"
import Ghost from "../ui/ghost"
export default class GhostBuster extends Phaser.Scene{
    constructor(){
        super("Ghost-Buster")
    }

    init(){
        this.asteroids = undefined
        this.player = undefined
        this.speed = 75
        this.duration = 1
        this.enemies = undefined
        this.enemySpeed = 45
        this.spawnSpeed = 1
        this.blast = undefined
        this.lastFired = 0
        this.cursors = this.input.keyboard.createCursorKeys();
        this.scoreLabel = 0
        this.fireRate = 225
        this.lifelabel = undefined
        this.lifeRestore = undefined
    }

    preload(){
        this.load.image("background", "images/background.jpg")
        this.load.image("bomb", "images/bomb.png")
        this.load.image("ground", "images/left-btn.png")
        this.load.image("ghost", "images/ghost.png")
        this.load.spritesheet("player", "images/player.png", {frameWidth:66, frameheight:66})
    }

    create(){
        const gameHeight = this.scale.height * .5
        const gameWidth = this.scale.width * .5
        this.add.image(gameWidth, gameHeight, "background").setScale(1.2, 1).setScrollFactor(1, 0);
        this.add.image(gameWidth, gameHeight, "ground").setScale(1,1.55)
        this.player = this.createPlayer()
        this.enemies = this.physics.add.group({
            classType : Ghost,
            maxSize : 10,
            runChildUpdate : true
        })
        this.time.addEvent({
            delay : 750 * this.spawnSpeed,
            callback : this.spawnEnemy,
            callbackScope : this,
            loop : true
        })
        this.lasers = this.physics.add.group({
            classType : Bomb,
            maxSize : 10,
            runChildUpdate : true
        })
        this.physics.add.overlap(this.lasers, this.enemies, this.hitEnemy, undefined, this);
        this.physics.add.overlap(this.player, this.enemies, this.decreaseLife, null, this);
        this.physics.add.overlap(this.player, this.lifeRestore, this.increaseLife, null, this);
        this.scoreLabel = this.createScoreLabel(16, 16, 0)
        this.lifeLabel = this.createLifeLabel(16, 43, 5)
        this.lifeRestore = this.physics.add.group({
            classType : FallingObject,
            runChildUpdate : true
        })
        this.time.addEvent({
            delay : 10000, 
            callback : this.spawnLife,
            callbackScope : this,
            loop : true
        })
    }

    createPlayer(){
        const player = this.physics.add.sprite(200, 450, "player").setDepth(0.875)
        player.setCollideWorldBounds(true)
        
        this.anims.create({
            key: "turn",
            frames:[{ key: "player", frame: 0 }]
        })
        
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("player", {start: 1, end: 2}),
            frameRate: 10
        })
        
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("player", {start: 1, end: 2}),
            frameRate: 10
        })
        
        return player;
    }
}