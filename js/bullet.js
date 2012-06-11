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

Bullet.prototype.render = function() {
    //draw a circle
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
};

Bullet.prototype.check_for_collision = function() {
    var rv  = [];

    var i;
    var cur;


    for(i in this.arena.tanks) {
        cur = this.arena.tanks[i];
        if (cur != this.tank) {
            if (this.x > cur.x - 33 && this.x < cur.x + 33 && this.y > cur.y - 33 && this.y < cur.y + 33) {
                alert("hit!");
                rv.push(cur);
            }
        }
    }

    for(i in this.arena.walls) {
        cur = this.arena.walls[i];
        if (this.x > cur.x && this.x < cur.x + cur.width && this.y > cur.y && this.y < cur.y + cur.height) {
            rv.push(cur);
        }
    }

    return rv;
};

Bullet.prototype.has_left_arena = function() {
    return this.x < 0 || this.x > this.arena.width || this.y < 0 || this.y > this.arena.height;
};
