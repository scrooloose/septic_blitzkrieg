function Engine() {
    this.tank = new Tank(new Point(60, 60), 90);
    this.tank2 = new Tank(new Point(965, 510), 270);


    this.arena = new Arena(1024, 572);
    this.arena.add_tank(this.tank);
    this.arena.add_tank(this.tank2);

    this.arena.add_wall(new Wall(new Point(0, 0), 1024, 10));
    this.arena.add_wall(new Wall(new Point(0, 562), 1024, 10));
    this.arena.add_wall(new Wall(new Point(0, 0), 10, 572));
    this.arena.add_wall(new Wall(new Point(1014, 0), 10, 572));

    this.arena.add_wall(new Wall(new Point(500, 150), 30, 300));

    this.game_over = false;

    // The main game loop
    // for some reason this needs to be here (rather than outside the
    // constructor) since otherwise it thinks "this" is actually the top level
    // window object...
    var $this = this;
    setInterval(function () {
        $this.update();
    }, 50);
}

// Update game objects
Engine.prototype.update = function () {
    var i;
    var cur;

    for(i in this.arena.bullets) {
        cur = this.arena.bullets[i];
        cur.update();
    }

    this.arena.update();
};

Engine.prototype.processInput = function (keysDown, player) {
    this.handle_tank_keys(keysDown, parseInt(player) == 1 ? this.tank : this.tank2 );
};

Engine.prototype.handle_tank_keys = function (keysDown, tank) {
    if (38 in keysDown) { // Player holding up
        tank.accelerate();
    } else {
        tank.decelerate();
    }

    if (40 in keysDown) { // key: down
        tank.decelerate();
    }
    if (37 in keysDown) { // key: left
        tank.rotate_body(0);
    }
    if (39 in keysDown) { // key: right
        tank.rotate_body(1);
    }
    if (188 in keysDown) { // key: ,
        tank.rotate_turret(0);
    }
    if (190 in keysDown) { // key: .
        tank.rotate_turret(1);
    }
    if (32 in keysDown) { // key: space
        tank.fire();
    }
};

Engine.prototype.start_game = function() {
    this.interval_id = setInterval(this.main, 50);
};

module.exports = Engine;
