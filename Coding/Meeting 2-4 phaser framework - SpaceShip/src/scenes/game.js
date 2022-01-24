// @ts-nocheck
/* eslint-disable no-unused-vars */
import Phaser, { Display } from "phaser"
import FallingObject from "../ui/FallingObject"
import Laser from "../ui/Laser"
export default class shipbattle extends Phaser.Scene
{
    constructor(){
    super("ship-scene")
    }
    
    init(){
        this.asteroids = undefined
        this.nav_left = false
        this.nav_right = false
        this.shoot = false
        this.player = undefined
        this.speed = 75
        this.duration = 1
        this.enemies = undefined
        this.enemySpeed = 45
        this.spawnSpeed = 1
        this.lasers = undefined
        this.lastFired = 0
        this.cursors = this.input.keyboard.createCursorKeys();
        this.bgasteroidspd = 75
    }

    preload(){
        this.load.image("background", "images/SpaceBG.jpg")
        this.load.image("asteroid", "images/AsteroidSmall.png")
        this.load.image("left-btn", "images/left-btn.png")
        this.load.image("right-btn", "images/right-btn.png")
        this.load.image("shoot-btn", "images/shoot-btn.png")
        this.load.image("enemy", "images/enemy.png")
        this.load.spritesheet("player", "images/ship.png", {frameWidth:66, frameheight:66})
        this.load.image("laser-1", "images/laser-1.png")
        this.load.image("laser-2", "images/laser-2.png")
    }
    
    create(){
        const gameHeight = this.scale.height * .5
        const gameWidth = this.scale.width * .5
        this.add.image(gameWidth, gameHeight, "background").setScale(1.2, 1).setScrollFactor(1, 0);
        this.asteroids = this.physics.add.group({
            key : "asteroid",
            repeat : 10,
            scale : .25,
        })
        Phaser.Actions.RandomRectangle(this.asteroids.getChildren(), this.physics.world.bounds)
        this.createButton()
        this.player = this.createPlayer()
        this.enemies = this.physics.add.group({
            classType : FallingObject,
            maxSize : 10,
            runChildUpdate : true
        })
        this.time.addEvent({
            delay : 4000 * this.spawnSpeed,
            callback : this.spawnEnemy,
            callbackScope : this,
            loop : true
        })
        this.lasers = this.physics.add.group({
            classType : Laser,
            maxSize : 10,
            runChildUpdate : true
        })
        this.physics.add.overlap(this.lasers, this.enemies, this.hitEnemy);
    }

    createButton(){
        this.input.addPointer(3)

        let shoot = this.add.image(320, 550, "shoot-btn").setInteractive().setDepth(.5).setAlpha(.8).setScale(.85)
        let nav_left = this.add.image(50, 550, "left-btn").setInteractive().setDepth(.5).setAlpha(.8).setScale(.85)
        let nav_right = this.add.image(nav_left.x + nav_left.displayWidth + 20, 550, "right-btn").setInteractive().setDepth(.5).setAlpha(.8).setScale(.85)

        nav_left.on("pointerdown", () => {this.nav_right = false; this.nav_left = true}, this)
        nav_left.on("pointerout", () => {this.nav_left = false}, this)
        nav_right.on("pointerdown", () => {this.nav_left = false; this.nav_right = true}, this)
        nav_right.on("pointerout", () => {this.nav_right = false}, this)
        shoot.on("pointerdown", () => {this.shoot = true}, this)
        shoot.on("pointerout", () => {this.shoot = false}, this)
    }
    
    createPlayer(){
        const player = this.physics.add.sprite(200, 450, "player")
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

    update(time){
        this.asteroids.children.iterate((child) => {
            child.setVelocityY(this.bgasteroidspd)
            child.angle += 2.5;
            if (child.y > this.scale.height) {
                child.x = Phaser.Math.Between(10, 400)
                child.y = child.displayHeight * -1
            }
            if (this.bgasteroidspd < 750) {
                this.bgasteroidspd = this.bgasteroidspd + 0.0115
            }
        })
        this.duration = this.duration+0.000875
        this.movePlayer(this.player, time)
        this.spawnSpeed = this.spawnSpeed - 0.005;
        if (this.cursors.space.isDown){
            this.shoot = true
        }
        if (this.cursors.space.isUp){
            this.shoot = false
        }
        console.log(this.bgasteroidspd)
    }

    movePlayer(player, time){
        if (this.nav_left) {
            this.player.setVelocityX(this.speed*-1)
            this.player.anims.play("left", true)
            this.player.setFlipX(false)
        }else if (this.nav_right) {
            this.player.setVelocityX(this.speed*1)
            this.player.anims.play("right", true)
            this.player.setFlipX(true)
        }else {
            this.player.setVelocity(0)
            this.player.anims.play("turn")
        }
        if((this.shoot) && time>this.lastFired){
            const laser = this.lasers.get(0, 0, "laser-1")
            if(laser){
                laser.fire(this.player.x, this.player.y)

                this.lastFired = time + 225
                if (time%2!=0 && laser.texture.key == "laser-2") {
                    laser.setTexture("laser-1")
                    console.log("1")
                }
                if (time%2==0 && laser.texture.key == "laser-1") {
                    laser.setTexture("laser-2")
                    console.log("2")
                }
            }
        }
        if (this.cursors.left.isDown || this.nav_left){
            this.nav_right = false
            this.nav_left = true
        }
        if (this.cursors.right.isDown || this.nav_right){
            this.nav_left = false
            this.nav_right = true
        }
        if (this.cursors.down.isDown){
            this.player.setVelocityY(145)
        }
        if (this.cursors.up.isDown){
            this.player.setVelocityY(-155)
        }
        if (this.cursors.up.isUp && this.cursors.down.isUp){
            this.player.setVelocityY(-5)
        }
    }
    
    spawnEnemy(){
        const config = {
            speed : this.enemySpeed,
            rotation : 0.0000001 * this.duration
        }
        const enemy = this.enemies.get(0, 0, "enemy", config)
        enemy.setScale(0.1725).refreshBody()


        const enemyWidth = enemy.displayWidth

        this.positionX = Phaser.Math.Between(enemyWidth, this.scale.width - enemyWidth)

        if (enemy) {
            enemy.spawn(this.positionX)
        }
    }
    
    hitEnemy(laser, enemy){
        laser.erase()
        enemy.die()
    }
}