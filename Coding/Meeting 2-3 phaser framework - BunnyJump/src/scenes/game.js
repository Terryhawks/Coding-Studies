/* eslint-disable no-undef */
// @ts-nocheck
/* eslint-disable no-unused-vars */
import Phaser, { GameObjects } from "phaser"
import Carrot from "./Carrot";
var carrots;
var carrotsCollected;
var player;
var platforms;
var cursors;
export default class BunnyJumpScene extends Phaser.Scene
{   constructor() { 
    super("game")
    }

    preload()
    {
        this.load.image("background", "Assets/bg_layer1.png");
        this.load.image("platform", "Assets/ground_grass.png");
        this.load.image("carrot", "Assets/carrot.png");
        this.load.image("bunny_jump", "Assets/bunny1_jump.png");
        this.load.image("bunny_stand", "Assets/bunny1_stand.png");
        this.load.audio("jumpSound", "sfx/phaseJump1.ogg")
    }

    create()
    {
        this.add.image(240, 320, "background").setScrollFactor(1, 0);
        this.platforms = this.physics.add.staticGroup();
        for (let i = 0; i < 10; i++) {
            const x = Phaser.Math.Between(80, 400);
            const y = i * 75 + 80;
            const platformChild = this.platforms.create(x, y, "platform");
            platformChild.setScale(.185);
            platformChild.refreshBody();
            const body = platformChild.body;
            body.updateFromGameObject();
        }
        this.cursors = this.input.keyboard.createCursorKeys()
        this.player = this.physics.add.sprite(240, 320, "bunny_stand").setScale(.25);
        this.physics.add.collider(this.player, this.platforms)
        this.player.body.checkCollision.up = false
        this.player.body.checkCollision.left = false
        this.player.body.checkCollision.right = false
        this.cameras.main.startFollow(this.player)
        this.cameras.main.setDeadzone(this.scale.width * 1.5);
        this.carrots = this.physics.add.group({classType:Carrot})
        this.physics.add.collider(this.platforms, this.carrots)
        this.physics.add.overlap(
            this.player,
            this.carrots,
            this.handleCollectCarrot,
            undefined,
            this
        )
        this.carrotsCollected=0;
    }
    
    update()
    {
        const touchingDown = this.player.body.touching.down
        if (touchingDown){
            this.player.setVelocityY(-250)
            this.player.setTexture("bunny_jump")
            this.sound.play("jumpSound")
        }
        const vy = this.player.body.velocity.y
        if (vy > 0 && this.player.texture.key !== "bunny_stand") {
            this.player.setTexture("bunny_stand")
        }
        if (this.cursors.left.isDown && !touchingDown) {
            this.player.setVelocityX(-175)
        } else if (this.cursors.right.isDown && !touchingDown) {
            this.player.setVelocityX(175)
        } else { this.player.setVelocityX(0) }
        this.platforms.children.iterate(child => {
            const platformChild = child
            const scrollY = this.cameras.main.scrollY
            if (platformChild.y >= scrollY + 650) {
                platformChild.y = scrollY - Phaser.Math.Between(33, 67)
                platformChild.body.updateFromGameObject()
                this.addCarrotAbove(platformChild)
            }
        })
        this.horizontalWrap(this.player)
        const scoreTextStyle = {color: "#000", fontSize: 24}
        this.carrotCollectedText = this.add.text(240, 10, "Carrots : 0", scoreTextStyle).setScrollFactor(0).setOrigin(0.5,0)
        const value = "Carrots : ${this.carrotsCollected}"
        this.carrotCollectedText.text = value
        const bottomPlatform = this.findBottomMostPlatform()
        if (this.player.y > bottomPlatform.y + 125) {
            this.scene.start("game-over-scene")
        }
    }
    
    existing() 
    {
        this.add.existing(gameObjects)
    }

    horizontalWrap(sprite) {
        const halfWidth = sprite.displayWidth * 0.5;
        const gameWidth = this.scale.width;
        if (sprite.x < -halfWidth) {
            sprite.x = gameWidth + halfWidth;
        }
        else if (sprite.x > gameWidth + halfWidth) {
            sprite.x = -halfWidth;
        }
    }

    handleCollectCarrot(player, carrot)
    {
        this.carrots.killAndHide(carrot)
        this.physics.world.disableBody(carrot.body)
        this.carrotsCollected++
    }

    addCarrotAbove(sprite)
    {
        const y = sprite.y - sprite.displayHeight
        const carrot = this.carrots.get(sprite.x, y, "carrot")
        carrot.setActive(true)
        carrot.setVisible(true)
        this.add.existing(carrot)
        carrot.body.setSize(carrot.width, carrot.height)
        this.physics.world.enable(carrot)
        return carrot
    }

    findBottomMostPlatform() {
        const platforms = this.platforms.getChildren()
        let bottomPlatform = platforms[0]
        for (let i = 1; i < platforms.length; i++) {
            const platform = platforms[i]
            if(platform.y < bottomPlatform.y) {
                continue
            }
            bottomPlatform = platform
        }
        return bottomPlatform
    }
}