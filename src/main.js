/**********************************************
 * Author:              Mason Kubiak
 * Project Name:        Rocket Patrol- Modded
 * Date:                4/9/22
 * Length to complete:  6 hours
 **********************************************/

// POINT BREAKDOWN
// Implement a simultaneous two-player mode (30)
// Allow the player to control the Rocket after it's fired (5)
// Implement the 'FIRE' UI text from the original game (5)
// Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
// Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (20)
// Create 4 new explosion SFX and randomize which one plays on impact (10)
// Display the time remaining (in seconds) on the screen (10)
// Randomize each spaceship's movement direction at the start of each play (5)
// -----------------------------------------------------------
// TOTAL: 105

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
