class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speedMultiplier = 1) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        this.points = pointValue; // points given when blown up
        this.moveSpeed = game.settings.spaceshipSpeed * speedMultiplier;
    }

    update() {
        // move left
        this.x -= this.moveSpeed;

        if(this.x <= 0 -this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
    }
}