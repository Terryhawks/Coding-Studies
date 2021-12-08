// @ts-nocheck
/* eslint-disable no-unused-vars */
import Phaser, { Display } from "phaser"
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
    }

    preload(){
        this.load.image("background", "images/SpaceBG.jpg")
        this.load.image("asteroid", "images/Asteroid.png")
        this.load.image("left-btn", "images/left-btn.png")
        this.load.image("right-btn", "images/right-btn.png")
        this.load.image("shoot-btn", "images/shoot-btn.png")
    }
    
    create(){
        const gameHeight = this.scale.height * .5
        const gameWidth = this.scale.width * .5
        this.add.image(gameWidth, gameHeight, "background").setScale(1.2, 1).setScrollFactor(1, 0);
        this.asteroids = this.physics.add.group({
            key: "asteroid",
            repeat : 10,
            scale : .25,
        })
        Phaser.Actions.RandomRectangle(this.asteroids.getChildren(), this.physics.world.bounds)
    }

    update(time){
        this.asteroids.children.iterate((child) => {
            child.setVelocityY(225)
            child.angle += 2.5;
            if (child.y > this.scale.height) {
                child.x = Phaser.Math.Between(10, 400)
                child.y = child.displayHeight * -1
            }
        })
    }
}