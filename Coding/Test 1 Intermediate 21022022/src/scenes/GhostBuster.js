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
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = undefined
        this.speed = 75
        this.duration = 1
        this.enemies = undefined
        this.enemySpeed = 45
        this.spawnSpeed = 1
        this.blast = undefined
        this.lastFired = 0
        this.scoreLabel = 0
        this.fireRate = 225
        this.lifelabel = undefined
        this.lifeRestore = undefined
    }

    preload(){
        this.load.image("background", "assets/background.png")
        this.load.image("bomb", "assets/bomb.png")
        this.load.image("ground", "assets/ground.png")
        this.load.image("ghost", "assets/ghost.png")
        this.load.spritesheet("player", "assets/player.png", {frameWidth:32, frameheight:32})
    }

    create(){
        const gameHeight = this.scale.height * .5
        const gameWidth = this.scale.width * .5
        this.add.image(gameWidth, gameHeight, "background").setScale(0.999985, 1.0725).setScrollFactor(1, 0);
        this.add.image(gameWidth, gameHeight * 1.9265, "ground").setScale(1.25, 3)
        //this.player = this.createPlayer()
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
        this.blast = this.physics.add.group({
            classType : Bomb,
            maxSize : 10,
            runChildUpdate : true
        })
        this.physics.add.overlap(this.lasers, this.enemies, this.hitEnemy, undefined, this);
        this.physics.add.overlap(this.player, this.enemies, this.decreaseLife, null, this);
        
    }

    createPlayer(){
        const player = this.physics.add.sprite(288, 550, "player").setDepth(0.875)
        player.setCollideWorldBounds(true)
        
        this.anims.create({
            key: "idle",
            frames:[{ key: "player", frame: 1 }]
        })
        
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("player", {start: 3, end: 5}),
            frameRate: 10
        })
        
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("player", {start: 6, end: 8}),
            frameRate: 10
        })
        
        this.anims.create({
            key: "left-shoot",
            frames:[{ key: "player", frame: 9 }]
        })

        this.anims.create({
            key: "shoot",
            frames:[{ key: "player", frame: 10 }]
        })

        this.anims.create({
            key: "right-shoot",
            frames:[{ key: "player", frame: 11 }]
        })

        return player;
    }

    update(time){
        this.duration = this.duration+0.000875
        this.movePlayer(this.player, time, this.cursors)
        if(this.spawnSpeed > 0.25){
            this.spawnSpeed = this.spawnSpeed - 0.005;
        }
        if (this.cursors.space.isDown){
            this.shoot = true
        }
        if (this.cursors.space.isUp){
            this.shoot = false
        }
    }

    movePlayer(player, time, cursor){
        if (cursor.left.isDown) {
            this.player.setVelocityX(this.speed*-1)
            if(!cursor.space.isDown){this.player.anims.play("left", true)}
            this.player.setFlipX(false)
        }else if (cursor.right.isDown) {
            this.player.setVelocityX(this.speed*1)
            if(!cursor.space.isDown){this.player.anims.play("right", true)}
            this.player.setFlipX(true)
        }else{
            this.player.setVelocityY(0)
            this.player.anims.play("idle")
        }

        if((cursor.space.isDown) && time>this.lastFired){
            const Pod = this.blast.get(0, 0, "laser-1").setDepth(0.9)
            if(cursor.left.isDown){this.player.anims.play("left-shoot")}
            if(cursor.right.isDown){this.player.anims.play("right-shoot")}
            if(!cursor.left.isDown&&!cursor.right.isDown){this.player.anims.play("shoot")}
            if(Pod){
                Pod.fire(this.player.x, this.player.y)
                this.lastFired = time + this.fireRate
                
                //console.log(this.fireRate)
            }
        }
    }
}