import Phaser from "phaser"
var friction;
var frictionValue;
var cursors;
var platforms;
var stars;
var player;
var score;
var scoreText;
export default class Game extends Phaser.Scene{
    constructor(){
        super("collecting-stars-scene")
    }
    
    preload(){
        this.load.image("greenblock", "images/platform.png")
        this.load.image("sky", "images/sky.png")
        this.load.image("star","images/star.png")
        this.load.image("bomb", "images/bomb.png")
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
    }

    collectStar(player, star){
        star.disableBody(true, true);
        score += 10;
        scoreText.setText("Score : " + score);
    }

    update(){
        cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown){
            player.setVelocityX(-160)
            player.anims.play("left", true)
            frictionValue = -160;
        } else if (cursors.right.isDown){
            player.setVelocityX(160)
            player.anims.play("right", true)
            frictionValue = 160;
        } else {
            player.setVelocityX(friction)
            if(cursors.left.isDown==true && frictionValue!=0){
                frictionValue=frictionValue+20;
                friction=frictionValue;
            } else if(cursors.left.isDown==true && frictionValue!=0){
                frictionValue=frictionValue+20;
                friction=frictionValue;
            }
        }

        if (cursors.up.isDown){
            player.setVelocityY(-250)
            //This is a flaw which will end up making the player fly infinitely(if you keep pressing up).
        }
    }
}