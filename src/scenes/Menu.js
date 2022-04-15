class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio("sfx_select", "./assets/blip_select12.wav");
        this.load.audio("sfx_explosion1", "./assets/explosion1.wav");
        this.load.audio("sfx_explosion2", "./assets/explosion2.wav");
        this.load.audio("sfx_explosion3", "./assets/explosion3.wav");
        this.load.audio("sfx_explosion4", "./assets/explosion4.wav");
        this.load.audio("sfx_explosion5", "./assets/explosion5.wav");
        this.load.audio("sfx_explosion38", "./assets/explosion38.wav");
        this.load.audio("sfx_rocket", "./assets/rocket_shot.wav");   
    }

    create() {
        // menu text config
        let menuConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "center",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        };

        // menu text
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding,
                      "Rocket Patrol", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + borderPadding, 
        "Player 1\nUse ←→ arrows to move and (↑) to fire", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + borderPadding * 7, 
        "Player 2\nUse A/D arrows to move and (W) to fire", menuConfig).setOrigin(0.5);

        menuConfig.backgroundColor = "#00FF00";
        menuConfig.color = "#000";
        menuConfig.fontSize = "20px";

        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding * 10,
                      "Single Player: Press ← for Novice and → for Expert", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding * 13,
                      "Multiplayer: Press ↓ for Novice and ↑ for Expert", menuConfig).setOrigin(0.5);
        
        // set menu keycodes
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        // novice (SINGLE PLAYER)
        keyLEFT.on("down", (key, event) => {
            this.setGameSettings(3, 60000, 1);
        });

        // expert (SINGLE PLAYER)
        keyRIGHT.on("down", (key, event) => {
            this.setGameSettings(4, 45000, 1);
        });

        // novice (MULTIPLAYER)
        keyDOWN.on("down", (key, event) => {
            this.setGameSettings(3, 60000, 2);
        });

        // expert (MULTIPLAYER)
        keyUP.on("down", (key, event) => {
            this.setGameSettings(4, 45000, 2);
        });
    }

    setGameSettings(speed, time, players) {
        game.settings = {
            spaceshipSpeed: speed,
            gameTimer: time,
            numPlayers: players
        };
        this.sound.play("sfx_select");
        this.scene.start("playScene");
    }
}