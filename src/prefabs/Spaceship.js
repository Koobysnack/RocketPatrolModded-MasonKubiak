class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speedMultiplier = 1) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        // choose direction
        this.direction = Math.random() < 0.5 ? -1 : 1;
        if(this.direction == -1) { 
            this.angle = 180;
            this.y += 32;
        }

        this.points = pointValue; // points given when blown up
        this.moveSpeed = game.settings.spaceshipSpeed * speedMultiplier * this.direction;
    }

    update() {
        // move left
        this.x -= this.moveSpeed;

        if(this.direction == 1 && this.x <= 0 -this.width) {
            this.reset();
        }
        else if(this.direction == -1 && this.x >= game.config.width) {
            this.reset();
        }
    }

    reset() {
        if(this.direction == 1) { this.x = game.config.width; }
        else { this.x = 0; }
    }
}