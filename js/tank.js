function Tank(x, y, body_img, turret_img) {
    this.body_heading = 0;
    this.turret_heading = 0;
    this.x = x;
    this.y = y;
    this.speed = 0; //pixels per update
    this.body_img = body_img;
    this.turret_img = turret_img;

    this.bullets = [];
    this.last_fired = null;
}


Tank.prototype.accelerate = function() {
    if (this.speed <= 10) {
        this.speed++;
    }
};

Tank.prototype.decelerate = function() {
    if (this.speed > 0) {
        this.speed--;
    }
};

Tank.prototype.update_position = function() {
    dx = this.speed * Math.sin(this.to_rads(this.body_heading));
    dy = this.speed * Math.cos(this.to_rads(this.body_heading));

    this.x += Math.round(dx);
    this.y -= Math.round(dy);

    for(var i in this.bullets) {
        var cur = this.bullets[i];
        cur.update();
        cur.render();
    }
};

Tank.prototype.rotate_body = function(forward) {
    if (forward == 1) {
        this.body_heading += 10;
        this.turret_heading += 10;
    } else {
        this.body_heading -= 10;
        this.turret_heading -= 10;
    }
};

Tank.prototype.rotate_turret = function(forward) {
    if (forward == 1) {
        this.turret_heading += 10;
    } else {
        this.turret_heading -= 10;
    }
};

//convert degrees to radians
Tank.prototype.to_rads = function(degs) {
    return degs * (Math.PI / 180);
};

Tank.prototype.render = function() {
    this.update_position();

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.to_rads(this.body_heading));
    ctx.drawImage(this.body_img, -33, -33);

    ctx.rotate(-this.to_rads(this.body_heading));
    ctx.rotate(this.to_rads(this.turret_heading));
    ctx.drawImage(this.turret_img, -33, -33);

    ctx.translate(-this.x, -this.y);
    ctx.restore();
};

Tank.prototype.fire = function() {
    var now = Date.now();
    if (this.last_fired === null || now - this.last_fired > 3000) {
        this.last_fired = now;
        this.bullets.push(new Bullet(this.x, this.y, this.turret_heading));
    }
};
