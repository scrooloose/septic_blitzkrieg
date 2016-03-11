function Tank(point, heading) {
    this.body_heading = heading;
    this.turret_heading = heading;
    this.point = point;
    this.speed = 0; //pixels per update

    this.last_fired = null;
    this.bounding_box_rad = 30;
    this.width = 33;
    this.fire_delay = 500;
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
        this.point.x += dx;
        this.point.y += dy;
    } else {
        //fairly ineffecient way to make the tank stop at the closest point to
        //colliding object... will do for now
        this.speed--;
        this.update();
    }
};

Tank.prototype.will_move_collide = function(dx, dy) {
    var dest_x = this.point.x + dx;
    var dest_y = this.point.y + dy;

    for(var i in this.arena.walls) {
        var cur = this.arena.walls[i];
        if (dest_x-this.bounding_box_rad < cur.point.x+cur.width &&
            dest_x+this.bounding_box_rad > cur.point.x &&
            dest_y-this.bounding_box_rad < cur.point.y+cur.height &&
            dest_y+this.bounding_box_rad > cur.point.y) {
                return true;
            }
    }

    return false;
};

Tank.prototype.contains_point = function(point) {
    return this.point.x > point.x - this.width &&
           this.point.x < point.x + this.width &&
           this.point.y > point.y - this.width &&
           this.point.y < point.y + this.width
}

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

Tank.prototype.to_JSON = function() {
    rv = {}
    rv['x'] = this.point.x
    rv['y'] = this.point.y
    rv['body_heading'] = this.body_heading;
    rv['turret_heading'] = this.turret_heading;

    return rv;
};

Tank.prototype.fire = function() {
    var now = Date.now();
    if (this.last_fired === null || now - this.last_fired > this.fire_delay) {
        this.last_fired = now;
        this.arena.add_bullet(new Bullet(this.point.x, this.point.y, this.turret_heading, this.arena, this));
    }
};

Tank.prototype.set_arena = function(a) {
    this.arena = a;
};

module.exports = Tank;
