class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load visual assets
        this.load.image("p1Rocket", "./assets/p1Rocket.png");
        this.load.image("p2Rocket", "./assets/p2Rocket.png");
        this.load.image("spaceship", "./assets/spaceship.png");
        this.load.image("specialShip", "./assets/specialShip.png");
        this.load.image("starfield", "./assets/starfield.png");
        this.load.image("particle", "./assets/particle.png");
        this.load.spritesheet("explosion", "./assets/explosion.png", {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // starfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, "starfield").setOrigin(0, 0);

        // green UI
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0); // top
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0); // bottom
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0); // left
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0); // right

        // set player 1 keycodes
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        // create first player
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, "p1Rocket",
        keyLEFT, keyRIGHT, keyUP).setOrigin(0, 0);

        // if p2, set player 2 keycodes and make second player
        if(game.settings.numPlayers == 2) {
            keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
            keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
            keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

            this.p2Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, "p2Rocket",
            keyA, keyD, keyW).setOrigin(0, 0);
        }

        // create ships
        this.specialShip = new Spaceship(this, game.config.width, borderUISize * 4, "specialShip", 0, 50, 2);
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*5 + borderPadding*2, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*6 + borderPadding*4, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*7 + borderPadding*6, 'spaceship', 0, 10).setOrigin(0, 0);

        // create animation
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // create p1 scoreboard
        let scoreConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#1c21ff",
            color: "#FFFFFF",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        };
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, 
            this.p1Rocket.score, scoreConfig);
    
        // if p2, create p2 scoreboard
        if(game.settings.numPlayers == 2) {
            scoreConfig.backgroundColor = "#ff1c1c";
            scoreConfig.align = "left";
            this.scoreRight = this.add.text(game.config.width - borderUISize - borderPadding - scoreConfig.fixedWidth, 
            borderUISize + borderPadding * 2, this.p2Rocket.score, scoreConfig);
        }

        // create fire UI
        scoreConfig.backgroundColor = "#F3B141";
        scoreConfig.align = "center";
        this.p1FireUI = this.add.text(this.scoreLeft.x + scoreConfig.fixedWidth + borderPadding, 
        borderUISize + borderPadding * 2, "FIRE", scoreConfig);

        // if p2, create p2 fire UI
        if(game.settings.numPlayers == 2) {
            this.p2FireUI = this.add.text(this.scoreRight.x - scoreConfig.fixedWidth - borderPadding, 
                borderUISize + borderPadding * 2, "FIRE", scoreConfig);
        }
        
        // timer
        this.gameOver = false;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            scoreConfig.fixedWidth = 0;
            this.add.text(game.config.width / 2, game.config.height / 2, "Game Over", scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, "Press (R) To Restart or ??? for Menu", 
                          scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        // timer UI
        scoreConfig.fixedWidth = 100;
        this.timerUI = this.add.text((game.config.width / 2) - (scoreConfig.fixedWidth / 2), 
        borderUISize + borderPadding * 2, (this.clock.delay -this.clock.elapsed) / 1000, scoreConfig);
    }

    update() {
        // check for restart or menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        // update timer UI
        this.timerUI.text = (this.clock.delay -this.clock.elapsed) / 1000;
        
        // update starfield
        this.starfield.tilePositionX -= 4;

        // update sprites
        if(!this.gameOver)
        {
            this.p1Rocket.update();
            if(game.settings.numPlayers == 2) { this.p2Rocket.update(); }
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.specialShip.update();
        }
        
        // player 1 fire UI
        if(this.p1Rocket.isFiring) { 
            this.p1FireUI.alpha = 1; 
        }
        else {
            this.p1FireUI.alpha = 0;
        }

        // player 2 fire UI
        if(game.settings.numPlayers == 2 && this.p2Rocket.isFiring) { 
            this.p2FireUI.alpha = 1; 
        }
        else if(game.settings.numPlayers == 2 && !this.p2Rocket.isFiring) {
            this.p2FireUI.alpha = 0;
        }

        // collision detection
        this.collisionDetection(this.p1Rocket, this.scoreLeft);
        if(game.settings.numPlayers == 2) { this.collisionDetection(this.p2Rocket, this.scoreRight); }
    }

    collisionDetection(rocket, scoreBoard) {
        // check collision with each ship
        if(this.checkCollision(rocket, this.ship01)) {
            rocket.reset();
            this.shipExplode(rocket, this.ship01, scoreBoard);
        }
        if(this.checkCollision(rocket, this.ship02)) {
            rocket.reset();
            this.shipExplode(rocket, this.ship02, scoreBoard);
        }
        if(this.checkCollision(rocket, this.ship03)) {
            rocket.reset();
            this.shipExplode(rocket, this.ship03, scoreBoard);
        }
        if(this.checkCollision(rocket, this.specialShip)) {
            rocket.reset();
            this.shipExplode(rocket, this.specialShip, scoreBoard);
        }
    }

    checkCollision(rocket, ship)
    {
        // AABB collision detection
        if(rocket.x < ship.x + ship.width &&
        rocket.x + rocket.width > ship.x &&
        rocket.y < ship.y + ship.height &&
        rocket.y + rocket.height > ship.y) {
            return true;
        }
        else {
            return false;
        }
    }

    shipExplode(rocket, ship, scoreBoard) {
        // create particles and emitter
        let p = this.add.particles("particle");
        let e = p.createEmitter();
        e.setPosition(ship.x, ship.y);
        e.setSpeed(200);

        // hide, play animation, and reset ship
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
            p.destroy();
        });
        
        // update score/scoreboard
        rocket.score += ship.points;
        scoreBoard.text = rocket.score;

        // choose random explosion sound
        let explosionSound = Math.floor(Math.random() * 6);
        if(explosionSound == 0) { this.sound.play("sfx_explosion1"); }
        else if(explosionSound == 1) { this.sound.play("sfx_explosion2"); }
        else if(explosionSound == 2) { this.sound.play("sfx_explosion3"); }
        else if(explosionSound == 3) { this.sound.play("sfx_explosion4"); }
        else if(explosionSound == 4) { this.sound.play("sfx_explosion5"); }
        else { this.sound.play("sfx_explosion38"); }
    }
}