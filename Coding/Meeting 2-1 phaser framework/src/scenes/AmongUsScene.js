import Phaser from "phaser"
export default class AmongUsScene extends Phaser.Scene{
    constructor(){
        super("among-us-scene")
    }
    
    preload(){
        this.load.image("gameObjectKey", "location")
        this.load.image("maps", "images/Maps.png")
        this.load.image("playerRed", "images/Red.png")
        this.load.image("playerCyan", "images/Cyan.png")
        this.load.image("playerGreen","images/Green.png")
        this.load.image("playerOrange", "images/Orange.png")
        this.load.image("playerPink", "images/Pink.png")
        this.load.image("redClone", "images/RedClone.png")
    }
    
    create(){this.add.image(960, 540, "maps")}
}