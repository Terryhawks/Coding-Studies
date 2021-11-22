/* eslint-disable no-unused-vars */
import Phaser from "phaser"
{var lastMove;
var friction;
var frictionValue;
var cursors;
var platforms;
var stars;
/*var bombs;*/
var player;
var score = 0;
var scoreText;
var gameOver = false;}
export default class Game extends Phaser.Scene{
    constructor(){
        super("collecting-stars-scene")
    }
    
    preload(){
        this.load.image("greenblock", "images/platform.png")
        this.load.image("sky", "images/sky.png")
        this.load.image("star","images/star.png")
        /*this.load.image("bomb", "images/bomb.png")*/
        this.load.spritesheet("player", "images/dude.png", {frameWidth: 32, frameHeight: 48})
    }
    
    create(){
        this.add.image(400, 300, "sky")
        platforms = this.physics.add.staticGroup()
        platforms.create(600, 400, "greenblock")
        platforms.create(50, 250, "greenblock")
        platforms.create(750, 220, "greenblock")
        platforms.create(400, 575, "greenblock").setScale(2).refreshBody()
        player = this.physics.add.sprite(100, 450, "player")
        player.setCollideWorldBounds(true)
        player.setBounce(0.2)
        stars = this.physics.add.group({
            key: "star",
            repeat: 11,
            setXY: {x:12, y:0, stepX:70}
        });
        // @ts-ignore
        stars.children.iterate(function(child){child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));});
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(player, platforms);
        this.physics.add.overlap(
            player,
            stars,
            this.collectStar,
            null,
            this
        )
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("player", {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: "turn",
            frames: [{key: "player", frame: 4}],
            frameRate: 20
        })
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("player", {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        })
        scoreText = this.add.text(16, 16, "score : 0", {
            fontSize: "32px"
        });
        /*bombs=this.physics.add.group()
        this.physics.add.collider(bombs, platforms)
        this.physics.add.collider(
            player,
            bombs,
            this.hitBomb,
            null,
            this
        );*/
    }

    collectStar(dude, star){
        star.disableBody(true, true);
        score += 10;
        scoreText.setText("Score : " + score);
        var x = (dude.x < 400)
        /*Phaser.Math.Between(400, 800) :
        Phaser.Math.Between(0, 400)
        var bomb = bombs.create(x, 0)
        bomb.setBounce(1)
        bomb.setCollideWorldBounds(true)
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)*/
        if (stars.countActive(true) === 0) {
            stars.child.enableBody()
        }
    }

    /*hitBomb(dude, bomb){
        this.physics.pause();
        dude.setTint(0xff0000)
        dude.anims.play("turn")
        gameOver = true;
    }*/

    update(){
        cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown){
            player.setVelocityX(-200)
            player.anims.play("left", true)
            frictionValue = -160;
            lastMove = "left"
        } else if (cursors.right.isDown){
            player.setVelocityX(200)
            player.anims.play("right", true)
            frictionValue = 160;
            lastMove = "right"
        } else {
            if(lastMove=="left" && frictionValue!=0){
                frictionValue=frictionValue+10;
                friction=frictionValue;
                player.setVelocityX(friction)
            } else if(lastMove=="right" && frictionValue!=0){
                frictionValue=frictionValue-10;
                friction=frictionValue;
                player.setVelocityX(friction)
            }
        }

        if (cursors.up.isDown){
            player.setVelocityY(-500)
            //This is a flaw which will end up making the player fly infinitely(if you keep pressing up).
        }
        if (cursors.down.isDown){
            player.setVelocityY(500)
        }
    }
}