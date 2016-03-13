function Bullet(point, heading, arena, tank) {
    this.point = point;
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
    this.point.x += this.speed * Math.sin(heading);
    this.point.y -= this.speed * Math.cos(heading);
};

Bullet.prototype.check_for_collision = function() {
    var rv  = [];

    var i;
    var cur;

    for(i in this.arena.tanks) {
        cur = this.arena.tanks[i];
        if (cur != this.tank) {
            if (cur.contains_point(this.point)) {
                cur.process_hit(this);
                rv.push(cur);
            }
        }
    }

    for(i in this.arena.walls) {
        cur = this.arena.walls[i];
        if (cur.contains_point(this.point)) {
            rv.push(cur);
        }
    }

    return rv;
};

Bullet.prototype.has_left_arena = function() {
    return !this.arena.contains_point(this.point);
};

Bullet.prototype.to_JSON = function() {
    rv = {}
    rv['x'] = this.point.x
    rv['y'] = this.point.y
    return rv;
}

module.exports = Bullet;
