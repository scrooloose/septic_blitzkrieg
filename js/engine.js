function Engine() {
    this.tank = new Tank(60, 60, 90, imgTank, imgTurret);
    this.tank2 = new Tank(965, 510, 270, imgTank2, imgTurret2);


    this.arena = new Arena(1024, 572);
    this.arena.add_tank(this.tank);
    this.arena.add_tank(this.tank2);
    this.arena.add_wall(new Wall(350, 130, 300, 100));
    this.arena.add_wall(new Wall(350, 340, 300, 100));


    this.game_over = false;

    // Handle keyboard controls
    this.keysDown = {};

    addEventListener("keydown", function (e) {
        $this.keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete $this.keysDown[e.keyCode];
    }, false);

    // The main game loop
    // for some reason this needs to be here (rather than outside the
    // constructor) since otherwise it thinks "this" is actually the top level
    // window object...
    var $this = this;
    this.main = function () {
        $this.update();
        $this.render();

        if($this.game_over) {
            clearInterval($this.interval_id);
            alert("Game over");
        }
    };
}

// Update game objects
Engine.prototype.update = function () {
    this.handle_tank1_keys();
    this.handle_tank2_keys();

    var i;
    var cur;

    for(i in this.arena.bullets) {
        cur = this.arena.bullets[i];
        cur.update();
    }

    this.arena.update();
};

Engine.prototype.handle_tank1_keys = function () {
    if (38 in this.keysDown) { // Player holding up
        this.tank.accelerate();
    } else {
        this.tank.decelerate();
    }

    if (40 in this.keysDown) { // key: down
        this.tank.decelerate();
    }
    if (37 in this.keysDown) { // key: left
        this.tank.rotate_body(0);
    }
    if (39 in this.keysDown) { // key: right
        this.tank.rotate_body(1);
    }
    if (188 in this.keysDown) { // key: ,
        this.tank.rotate_turret(0);
    }
    if (190 in this.keysDown) { // key: .
        this.tank.rotate_turret(1);
    }
    if (32 in this.keysDown) { // key: space
        this.tank.fire();
    }
};

Engine.prototype.handle_tank2_keys = function () {
    if (87 in this.keysDown) { // key: w
        this.tank2.accelerate();
    } else {
        this.tank2.decelerate();
    }

    if (83 in this.keysDown) { // key: s
        this.tank2.decelerate();
    }
    if (65 in this.keysDown) { // key: a
        this.tank2.rotate_body(0);
    }
    if (68 in this.keysDown) { // key: d
        this.tank2.rotate_body(1);
    }
    if (82 in this.keysDown) { // key: r
        this.tank2.rotate_turret(0);
    }
    if (84 in this.keysDown) { // key: t
        this.tank2.rotate_turret(1);
    }
    if (89 in this.keysDown) { // key: y
        this.tank2.fire();
    }
};

// Draw everything
Engine.prototype.render = function () {
    this.arena.render();
};

Engine.prototype.start_game = function() {
    this.interval_id = setInterval(this.main, 50);
};

