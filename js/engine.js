function Engine() {
    var $this = this;

    this.tank = new Tank(100, 100, imgTank, imgTurret);

    this.tank2 = new Tank(200, 200, imgTank2, imgTurret2);

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
    this.main = function () {
        $this.update();
        $this.render();
    };
}

// Update game objects
Engine.prototype.update = function () {
    this.handle_tank1_keys();
    this.handle_tank2_keys();
};

Engine.prototype.handle_tank1_keys = function () {
    if (38 in this.keysDown) { // Player holding up
        this.tank.accelerate();
    } else {
        this.tank.decelerate();
    }

    if (40 in this.keysDown) { // Player holding down
        this.tank.decelerate();
    }
    if (37 in this.keysDown) { // Player holding left
        this.tank.rotate_body(0);
    }
    if (39 in this.keysDown) { // Player holding right
        this.tank.rotate_body(1);
    }
    if (188 in this.keysDown) { // player holding ,
        this.tank.rotate_turret(0);
    }
    if (190 in this.keysDown) { // player holding .
        this.tank.rotate_turret(1);
    }
};

Engine.prototype.handle_tank2_keys = function () {
    if (87 in this.keysDown) { // Player holding up
        this.tank2.accelerate();
    } else {
        this.tank2.decelerate();
    }

    if (83 in this.keysDown) { // Player holding down
        this.tank2.decelerate();
    }
    if (65 in this.keysDown) { // Player holding left
        this.tank2.rotate_body(0);
    }
    if (68 in this.keysDown) { // Player holding right
        this.tank2.rotate_body(1);
    }
    if (82 in this.keysDown) { // player holding ,
        this.tank2.rotate_turret(0);
    }
    if (84 in this.keysDown) { // player holding .
        this.tank2.rotate_turret(1);
    }
};

// Draw everything
Engine.prototype.render = function () {
    ctx.drawImage(imgBg, 0, 0);
    this.tank.render();
    this.tank2.render();
};

Engine.prototype.start_game = function() {
    setInterval(this.main, 50);
};

