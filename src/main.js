/**********************************************
 * Author:              Mason Kubiak
 * Project Name:        Rocket Patrol- Modded
 * Date:                4/9/22
 * Length to complete:  SO FAR: 2 hours
 **********************************************/

// POINT BREAKDOWN
// Implement a simultaneous two-player mode (30)
// Allow the player to control the Rocket after it's fired (5)
// -----------------------------------------------------------
// TOTAL: 35


let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// set keycodes
let keyR, keyDOWN;  // menu keys
let keyLEFT, keyRIGHT, keyUP;   // player 1 keys
let keyA, keyD, keyW; // player 2 keys