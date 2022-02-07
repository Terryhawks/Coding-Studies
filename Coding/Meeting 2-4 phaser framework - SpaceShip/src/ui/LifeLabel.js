// @ts-nocheck
/* eslint-disable no-unused-vars */
import Phaser from "phaser"

const formatLife = (gamelife) => `Life : ${gamelife}`

export default class LifeLabel extends Phaser.GameObjects.Text
{
    constructor(scene, x, y, playerlife, style){
        super(scene, x, y, formatLife(playerlife), style)
        this.life = playerlife
    }
    
    setLife(playerlife){
        this.life = playerlife
        this.setText((formatLife(this.life)))
    }

    getLife(){
        return this.life
    }

    add(points){
        this.setLife(this.life+points)
    }

    subtract(value){
        this.setLife(this.life-value)
    }
}