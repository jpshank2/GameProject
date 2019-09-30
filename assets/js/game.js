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
        debug: false
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

    this.player = this.physics.add.sprite(50, 2600, 'player');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, platforms);

    this.enemy = [this.physics.add.sprite(450, 1850, 'bus'), this.physics.add.sprite(550, 1500, "bus"), this.physics.add.sprite(450, 1200, "bus"), this.physics.add.sprite(1900, 600, "bus"), this.physics.add.sprite(1850, 1550, "bus")];
    this.enemy[0].setVelocityX(-100);
    this.enemy[0].setScale(2.5);
    this.enemy[0].setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy[0], platforms);
    this.physics.add.overlap(this.player, this.enemy[0], playerHit, null, this);
    this.enemy[1].setVelocityX(-100);
    this.enemy[1].setScale(2.5);
    this.enemy[1].setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy[1], platforms);
    this.physics.add.overlap(this.player, this.enemy[1], playerHit, null, this);
    this.enemy[2].setVelocityX(-100);
    this.enemy[2].setScale(2.5);
    this.enemy[2].setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy[2], platforms);
    this.physics.add.overlap(this.player, this.enemy[2], playerHit, null, this);
    this.enemy[3].setVelocityX(-100);
    this.enemy[3].setScale(2.5);
    this.enemy[3].setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy[3], platforms);
    this.physics.add.overlap(this.player, this.enemy[3], playerHit, null, this);
    this.enemy[4].setVelocityX(-100);
    this.enemy[4].setScale(2.5);
    this.enemy[4].setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy[4], platforms);
    this.physics.add.overlap(this.player, this.enemy[4], playerHit, null, this);

    this.cameras.main.setViewport(0, 200, 1000, 1000);
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

    this.add.text(50, 2400, "Hello! Welcome to my resume!\n\nUse the arrows keys to move and jump.\n\nFollow the path to learn more about me!", {fill: "rgb(0, 0, 0)"});
    this.add.text(630, 2200, "I am an award winning nonprofit professional\n\nlooking for a career change. After multiple successful\n\nyears growing both members and funds in nonprofits,\n\nI want to take the skills I learned while marketing and\n\nfundraising and apply them to make me a software developer\n\nwho is not only technically proficient, but also who\n\nknows the best practices for business.", {fill: "rgb(0, 0, 0)"})
    this.add.text(750, 1850, "Watch out for struggle buses!\n\nFace them head on to see how I\n\novercame various previous struggles.", {fill: "rgb(0, 0, 0)"});
    this.add.text(50, 1500, "The next few levels\n\ncontain my work history.", {fill: "rgb(0, 0, 0"});
    this.add.text(250, 1300, "Reformed University Fellowship International, Intern 2017 - 2019\n\n--Created a network of participant by reaching over 300 International Students in\nmultiple disciplines.\n--Increased weekly event attendance by 80% in first year and maintained attendance in\nsubsequent years.\n--Planned new annual event to bring Internation and American Students together while managing\nvolunteers for fluid execution.\n--Designed promotional items to increase brand awareness.", {fill: "rgb(0, 0, 0)"});
    this.add.text(600, 900, "Faith Presbyterian Church, Student Ministries Intern 2016 - 2017\n\n--Created a repeatable framework for student ministry\nby maintaining a hight-activity summer schedule\nincluding three weekly events and one overnight trip,\nand maintaining a lower-activity school schedule\ninculding one weekly activity and\noccasional school lunch visits.", {fill: "rgb(0, 0, 0)"});
    this.add.text(350, 500, "Seasonal Work (less than a year):\n\nFILL UP", {fill: "rgb(0, 0, 0)"});
    this.add.text(1350, 600, "Here is my university and technical education.", {fill: "rgb(0, 0, 0)"});
    this.add.text(1400, 675, "Jacksonville State University, 2013 - 2016\n\nStudied Recreation Leadership,\nAccounting, Geography\nReformed University Fellowship\nPresident 2013 - 2016\nStudent Government Association\nOrganization Counsel 2013 - 2016", {fill: "rgb(0, 0, 0)"});
    this.add.text(1850, 675, "Belmont University, 2011 - 2013\n\nStudied Music Education and Exercise Science\nStudent Government Association\nEvents Committee 2011 - 2012\nPhi Mu Alpha Sinfonia 2011 - 2013\nPhi Mu Alpha Sinfonia Treasurer and\nEvents Chair 2012 - 2013", {fill: "rgb(0, 0, 0)"});
    this.add.text(2400, 900, "IAmBham, 2019\nLearning the\nfundamentals of\nSoftware and\nWeb Development", {fill: "rgb(0, 0, 0)"});
    this.add.text(2600, 900, "Codecademy, 2018-2019\nFinished all HTML and\nCSS courses", {fill: "rgb(0, 0, 0)"});
    this.add.text(2850, 900, "Zenva Academy, 2019\nPhaser 101\nIntroduction to\nGame Development", {fill: "rgb(0, 0, 0)"});
    this.add.text(2600, 1330, "Here are my skills.", {fill: "rgb(0, 0, 0)"});
    this.add.text(1500, 1200, "--HTML\n\n--CSS\n\n--JavaScript\n\n--Game Development\n\n--Responsive Web Design", {fill: "rgb(0, 0, 0)"});
    this.add.text(1800, 1200, "--Event Planning\n\n--Fundraising\n\n--Public Speaking\n\n--Writing\n\n--Email Marketing", {fill: "rgb(0, 0, 0)"});
    this.add.text(2100, 1200, "--Verbal Communication\n\n--Written Communication\n\n--Cross-Cultural Communication\n\n--Intermediate Spanish", {fill: "rgb(0, 0, 0)"});
    this.add.text(1400, 1500, "Here are some of my awards and certifications.", {fill: "rgb(0, 0, 0)"});
    this.add.text(1550, 1550, "Outstanding Sinfonian for Exemplary Service, Belmont University, 2013\n\nThe Complete Java Certification, Udemy, In Progress\n\nThe Complete Cyber Security Course, Udemy, In Progress", {fill: "rgb(0, 0, 0)"});
    this.add.text(1650, 1950, "You might be wondering why I have this extra path that seems unneeded.\nThat is because I am a planner and I want to have space to grow my\nresume game as I grow as a person.", {fill: "rgb(0, 0, 0)"});
    this.add.text(1750, 2500, "Thank you for playing my interactive resume game!\n\nI hope you enjoyed learning more about me and what I can bring to your team.\n\nFeel free to go backwards through the game to see everything again\n\nor just refresh the page to start over.\n\nMake sure to check back in often as I add things!", {fill: "rgb(0, 0, 0)"});

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

    if (this.enemy[1].x < 350 && this.enemy[1].body.onFloor()) {
        this.enemy[1].setVelocityX(100);
        this.enemy[1].anims.play("eright", true);
    } else if (this.enemy[1].x > 600 && this.enemy[1].body.onFloor()) {
        this.enemy[1].setVelocityX(-100);
        this.enemy[1].anims.play("eleft", true);
    };

    if (this.enemy[2].x < 250 && this.enemy[2].body.onFloor()) {
        this.enemy[2].setVelocityX(100);
        this.enemy[2].anims.play("eright", true);
    } else if (this.enemy[2].x > 400 && this.enemy[2].body.onFloor()) {
        this.enemy[2].setVelocityX(-100);
        this.enemy[2].anims.play("eleft", true);
    };

    if (this.enemy[3].x < 1700 && this.enemy[3].body.onFloor()) {
        this.enemy[3].setVelocityX(100);
        this.enemy[3].anims.play("eright", true);
    } else if (this.enemy[3].x > 1850 && this.enemy[3].body.onFloor()) {
        this.enemy[3].setVelocityX(-100);
        this.enemy[3].anims.play("eleft", true);
    };

    if (this.enemy[4].x < 1700 && this.enemy[4].body.onFloor()) {
        this.enemy[4].setVelocityX(100);
        this.enemy[4].anims.play("eright", true);
    } else if (this.enemy[4].x > 1850 && this.enemy[4].body.onFloor()) {
        this.enemy[4].setVelocityX(-100);
        this.enemy[4].anims.play("eleft", true);
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
    }

    if (this.cursors.up.isDown && this.player.body.onFloor()) {
        this.player.setVelocityY(-330);
        if (this.cursors.right.isDown) {
            this.player.anims.play("jump-right", true);
        } else {
            this.player.anims.play("jump-left", true);
        }
    }
};

function playerHit(player, enemy) {
    let number = this.enemy.indexOf(enemy);
    switch(number) {
        case 0:
            this.add.text(enemy.x, 1800, "This is a game I made to\n\nshowcase my skills as a developer\n\nand let people have fun while viewing\n\nmy resume. It was not easy and I spent\n\nmany days and nights testing different\n\nmethods in JavaScript before learning Phaser.", {fill: "rgb(255, 0, 0"});
            enemy.setVelocity(0, 0);
            enemy.disableBody(true, true);
            break;
        case 1:
            this.add.text(enemy.x, 1475, "The main struggle I faced while at RUF was fundraising.\nI was responsible for raising almost $50,000 each year while there.\nBy utilizing online databases, custom HTML emails,\nand many phone calls, I was able to meet and surpass my goal\ntwo years in a row.", {fill: "rgb(255, 0, 0"});
            enemy.setVelocity(0, 0);
            enemy.disableBody(true, true);
            break;
        case 2:
            this.add.text(enemy.x, 1050, "The main struggle I faced while at Faith was not knowing how to start a student ministry.\nThe church had not had something for Junior and Senior High students in multiple years.\nI had to meet with parents individually and as a group to see what they wanted to see for\ntheir children, and then create a schedule of events that would fit their needs\nas well as making the students excited to come and bring friends.", {fill: "rgb(255, 0, 0)"});
            enemy.setVelocity(0,0);
            enemy.disableBody(true, true);
            break;
        case 3:
            this.add.text(enemy.x, 850, "Going to college away from home\nand graduating is very difficult.\nAfter changing schools and majors,\nI was able to obtain a degree in\nLiberal Studies while being a leader\nin multiple extra-curricular activities.", {fill: "rgb(255, 0, 0)"});
            enemy.setVelocity(0, 0);
            enemy.disableBody(true, true);
            break;
        case 4:
            this.add.text(enemy.x, 1650, "When I joined Phi Mu Alpha Sinfonia, there were 13 active\nmemebers and 9 pledges including myself. Few people\noutside of the music department knew who we were or what\nwe did. After taking over roles as both Treasurer and\nEvents chair, we grew to 50 active members and were\nengaged on campus with several other campus organizations.\nOne event, 'BonaMu,' is a direct result of my immediate\nsuccessor capitalizing on relationships I forged.", {fill: "rgb(255, 0, 0)"});
            enemy.setVelocity(0, 0);
            enemy.disableBody(true, true);
            break;
    }
};