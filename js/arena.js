function Arena(width, height) {
    this.tanks = [];
    this.bullets = [];
    this.walls = [];
    this.width = width;
    this.height = height;

    this.renderables = [];
}

Arena.prototype.add_bullet = function(b) {
    this.bullets.push(b);
    this.renderables.push(b);
};

Arena.prototype.add_tank = function(t) {
    this.tanks.push(t);
    t.set_arena(this);
    this.renderables.push(t);
};

Arena.prototype.add_wall = function(w) {
    this.walls.push(w);
    w.set_arena(this);
    this.renderables.push(w);
};

Arena.prototype.update = function() {
    for(var i = this.bullets.length-1; i >= 0; i--) {
        var cur = this.bullets[i];
        var collided_with = cur.check_for_collision();
        if (collided_with.length > 0) {
            this.bullets.splice(i, 1);
        }

        if (cur.has_left_arena()) {
            console.log("bullet left arena");
            this.bullets.splice(i, 1);
        }
    }
};

Arena.prototype.render = function() {
    ctx.drawImage(imgBg, 0, 0);

    for(var i in this.renderables) {
        var cur = this.renderables[i];
        cur.render();
    }
};
