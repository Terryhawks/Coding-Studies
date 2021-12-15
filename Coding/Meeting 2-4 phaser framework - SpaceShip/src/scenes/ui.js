// @ts-nocheck
/* eslint-disable no-unused-vars */
import Phaser from "phaser"

export default class FallingObject extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, config){
        super(scene, x, y, texture)

        this.scene = scene
        this.speed = config.speed
        this.rotationVal = config.rotation
    }
}