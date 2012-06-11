function Tank(x, y, heading, body_img, turret_img) {
    this.body_heading = heading;
    this.turret_heading = heading;
    this.x = x;
    this.y = y;
    this.speed = 0; //pixels per update
    this.body_img = body_img;
    this.turret_img = turret_img;

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

Tank.prototype.update = function() {
    dx = this.speed * Math.sin(this.to_rads(this.body_heading));
    dy = -this.speed * Math.cos(this.to_rads(this.body_heading));

    dx = Math.round(dx);
    dy = Math.round(dy);

    if (!this.will_move_collide(dx, dy)) {
        this.x += dx;
        this.y += dy;
    }
};

Tank.prototype.will_move_collide = function(dx, dy) {
    var dest_x = this.x + dx;
    var dest_y = this.y + dy;

    for(var i in this.arena.walls) {
        var cur = this.arena.walls[i];
        if (dest_x-33 < cur.x+cur.width &&
            dest_x+33 > cur.x &&
            dest_y-33 < cur.y+cur.height &&
            dest_y+33 > cur.y) {
                return true;
            }


    }

    return false;
};

Tank.prototype.rotate_body = function(forward) {
    if (forward == 1) {
        this.body_heading += 5;
        this.turret_heading += 5;
    } else {
        this.body_heading -= 5;
        this.turret_heading -= 5;
    }
};

Tank.prototype.rotate_turret = function(forward) {
    if (forward == 1) {
        this.turret_heading += 5;
    } else {
        this.turret_heading -= 5;
    }
};

//convert degrees to radians
Tank.prototype.to_rads = function(degs) {
    return degs * (Math.PI / 180);
};

Tank.prototype.render = function() {
    this.update();

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
        this.arena.add_bullet(new Bullet(this.x, this.y, this.turret_heading, this.arena, this));
    }
};

Tank.prototype.set_arena = function(a) {
    this.arena = a;
};
