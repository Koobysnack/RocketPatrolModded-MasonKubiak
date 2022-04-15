class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, left, right, fire, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // adds to existing scene

        this.isFiring = false;
        this.moveSpeed = 2; // pixels per frame
        this.sfxRocket  = scene.sound.add("sfx_rocket");

        // player-specific controls and score
        this.leftKey = left;
        this.rightKey = right;
        this.fireKey = fire;
        this.score = 0;
    }

    update() {
        // movement
        if(this.leftKey.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        }
        else if(this.rightKey.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed;
        }

        // getting fire input
        if(Phaser.Input.Keyboard.JustDown(this.fireKey) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }
        
        // fire rocket
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}