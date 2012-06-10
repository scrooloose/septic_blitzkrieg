function Bullet(x, y, heading) {
    this.x = x;
    this.y = y;
    this.heading = heading;

    this.speed = 15;
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

Bullet.prototype.check_for_collision = function(tanks) {
    var rv  = [];
    for(var i in tanks) {
        var cur = tanks[i];
        if (this.x > cur.x - 33 && this.x < cur.x + 33 && this.y > cur.y - 33 && this.y < cur.y + 33) {
            rv.push(cur);
        }
    }

    return rv;
};
