function Bullet(x, y, heading, arena, tank) {
    this.x = x;
    this.y = y;
    this.heading = heading;
    this.arena = arena;
    this.tank = tank;

    this.speed = 30;
}

//convert degrees to radians
Bullet.prototype.to_rads = function(degs) {
    return degs * (Math.PI / 180);
};

Bullet.prototype.update = function() {
    var heading = this.to_rads(this.heading);
    this.x += this.speed * Math.sin(heading);
    this.y -= this.speed * Math.cos(heading);
};

Bullet.prototype.check_for_collision = function() {
    var rv  = [];

    var i;
    var cur;

    for(i in this.arena.tanks) {
        cur = this.arena.tanks[i];
        if (cur != this.tank) {
            if (cur.contains_point(new Point(this.x,this.y))) {
                rv.push(cur);
            }
        }
    }

    for(i in this.arena.walls) {
        cur = this.arena.walls[i];
        if (cur.contains_point(new Point(this.x, this.y))) {
            rv.push(cur);
        }
    }

    return rv;
};

Bullet.prototype.has_left_arena = function() {
    return this.x < 0 || this.x > this.arena.width || this.y < 0 || this.y > this.arena.height;
};

Bullet.prototype.to_JSON = function() {
    rv = {}
    rv['x'] = this.x
    rv['y'] = this.y
    return rv;
}

module.exports = Bullet;
