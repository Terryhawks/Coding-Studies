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
        this.load.image("asteroid", "images/AsteroidSmall.png")
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
        this.createButton()
    }

    createButton(){
        this.input.addPointer(3)

        let shoot = this.add.image(320, 550, "shoot-btn").setInteractive().setDepth(.5).setAlpha(.8).setScale(.85)
        let nav_left = this.add.image(50, 550, "left-btn").setInteractive().setDepth(.5).setAlpha(.8).setScale(.85)
        let nav_right = this.add.image(nav_left.x + nav_left.displayWidth + 20, 550, "right-btn").setInteractive().setDepth(.5).setAlpha(.8).setScale(.85)

        nav_left.on("pointerdown", () => {this.nav_left = true}, this)
        nav_left.on("pointerout", () => {this.nav_left = false}, this)
        nav_right.on("pointerdown", () => {this.nav_right = true}, this)
        nav_right.on("pointerout", () => {this.nav_right = false}, this)
        shoot.on("pointerdown", () => {this.shoot = true}, this)
        shoot.on("pointerout", () => {this.shoot = false}, this)
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