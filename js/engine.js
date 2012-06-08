function Engine() {
    var $this = this;

    this.tank = new Tank();

    // Handle keyboard controls
    this.keysDown = {};

    addEventListener("keydown", function (e) {
        $this.keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete $this.keysDown[e.keyCode];
    }, false);

    // Update game objects
    this.update = function (modifier) {
        if (38 in this.keysDown) { // Player holding up
            $this.tank.accelerate();
        }
        if (40 in this.keysDown) { // Player holding down
            $this.tank.decelerate();
        }
        if (37 in this.keysDown) { // Player holding left
            $this.tank.rotate_body(0);
        }
        if (39 in this.keysDown) { // Player holding right
            $this.tank.rotate_body(1);
        }
        if (188 in this.keysDown) { // player holding ,
            $this.tank.rotate_turret(0);
        }
        if (190 in this.keysDown) { // player holding .
            $this.tank.rotate_turret(1);
        }
    };

    // Draw everything
    this.render = function () {
        ctx.drawImage(imgBg, 0, 0);
        //ctx.drawImage(imgHero, this.hero.x, this.hero.y);
        //ctx.drawImage(imgMonster, this.monster.x, this.monster.y);
        $this.tank.render();
    };

    // The main game loop
    this.main = function () {
        var now = Date.now();
        var delta = now - this.then;

        $this.update(delta / 1);
        $this.render();

        this.then = now;
    };

    this.then = Date.now();

    this.start_game = function () {
        setInterval(this.main, 100);
    };
}
