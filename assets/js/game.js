const config = {
    type: Phaser.AUTO,
    parent: "game",
    width: 3200,
    height: 3200,

    scene: {
        preload,
        create,
        update
    },

    physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 500 },
        debug: true
    }
  }
}

const game = new Phaser.Game(config);

function preload() {
    this.load.image("background", "../pics/sky.png");
    this.load.image("tiles", "../pics/Ground.png");
    this.load.spritesheet("bus", "../pics/bus.png", {frameWidth: 29, frameHeight: 15});
    this.load.spritesheet("player", "../pics/JPSSprite.png", {frameWidth: 16, frameHeight: 30});
    this.load.tilemapTiledJSON("map", "../tilemaps/level.json");
};

function create() {
    const backgroundImage = this.add.image(0, 0, "background").setOrigin(0, 0);
    backgroundImage.setScale(5);

    const map = this.make.tilemap({key: "map"});
    const tileset = map.addTilesetImage("resume", "tiles");

    const platforms = map.createDynamicLayer("Platforms", tileset, 0, 0);
    platforms.setCollisionByExclusion(-1, true);

    this.player = this.physics.add.sprite(50, 2500, 'player');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, platforms);

    this.enemy = [this.physics.add.sprite(350, 550, 'bus'), this.physics.add.sprite()];
    //for (let i = 0; i < this.enemy.lenght; i++) {
        this.enemy[0].setVelocityX(-100);
        this.enemy[0].setScale(2.5);
        this.enemy[0].setCollideWorldBounds(true);
        this.physics.add.collider(this.enemy[0], platforms);
        this.physics.add.overlap(this.player, this.enemy[0], playerHit, null, this);
    //}

    this.cameras.main.setViewport(0, 100, 1000, 900);
    this.cameras.main.startFollow(this.player);

    this.anims.create({
        key: "still",
        frames: this.anims.generateFrameNumbers("player", {start: 0, end: 1}),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("player", {start: 2, end: 3}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("player", {start: 4, end: 5}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "jump-right",
        frames: [{key: "player", frame: 7}],
        frameRate: 10
    });

    this.anims.create({
        key: "jump-left",
        frames: [{key: "player", frame: 6}],
        frameRate: 10
    });

    this.anims.create({
        key: "eleft",
        frames: this.anims.generateFrameNumbers("bus", {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "eright",
        frames: this.anims.generateFrameNumbers("bus", {start: 4, end: 7}),
        frameRate: 10,
        repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (this.enemy[0].x < 250 && this.enemy[0].body.onFloor()) {
        this.enemy[0].setVelocityX(100);
        this.enemy[0].anims.play("eright", true);
    } else if (this.enemy[0].x > 400 && this.enemy[0].body.onFloor()) {
        this.enemy[0].setVelocityX(-100);
        this.enemy[0].anims.play("eleft", true);
    };

    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-100);
        if (this.player.body.onFloor()) {
            this.player.anims.play("left", true);
        }
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(100);
        if (this.player.body.onFloor()) {
            this.player.anims.play("right", true);
        }
    } else {
        this.player.setVelocityX(0);
        this.player.anims.play("still");
    }//else if (cursors.right.isDown) {
    //     player.setVelocityX(160);
    //     player.anims.play("right", true);
    // } else {
    //     player.setVelocityX(0);
    //     player.anims.play("turn");
    // }

    if (this.cursors.up.isDown && this.player.body.onFloor()) {
        this.player.setVelocityY(-330);
        if (this.cursors.right.isDown) {
            this.player.anims.play("jump-right", true);
        } else {
            this.player.anims.play("jump-left", true);
        }
    }
};

function playerHit(enemy) {
    let number = this.enemy.indexOf(enemy);
    switch(number) {
        case 0:
            this.add.text(enemy.x, 500, "Test text", {fill: "rgb(255, 0, 0"});
            enemy.setVelocity(0, 0);
            enemy.disableBody(true, true)
    }
};