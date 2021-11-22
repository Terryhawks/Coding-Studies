// @ts-nocheck
/* eslint-disable no-unused-vars */
import Phaser from "phaser"
var player;
var platforms;
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
    }

    create()
    {
        this.add.image(240, 320, "background");
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
        this.player = this.physics.add.sprite(240, 320, "bunny_stand").setScale(.25);
        this.physics.add.collider(this.player, this.platforms)
        this.player.body.checkCollision.up = false
        this.player.body.checkCollision.left = false
        this.player.body.checkCollision.right = false
        this.cameras.main.startFollow(this.player)
    }
    
    update()
    {
        const touchingDown = this.player.body.touching.down
        if (touchingDown){
            this.player.setVelocityY(-225)
            this.player.setTexture("bunny_jump")
        }
        const vy = this.player.body.velocity.y
        if (vy > 0 && this.player.texture.key !== "bunny_stand") {
            this.player.setTexture("bunny_stand")
        }
    }
}