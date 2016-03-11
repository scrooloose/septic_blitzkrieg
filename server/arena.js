function Arena(width, height) {
    this.tanks = [];
    this.bullets = [];
    this.walls = [];
    this.width = width;
    this.height = height;
}

Arena.prototype.add_bullet = function(b) {
    this.bullets.push(b);
};

Arena.prototype.add_tank = function(t) {
    this.tanks.push(t);
    t.set_arena(this);
};

Arena.prototype.add_wall = function(w) {
    this.walls.push(w);
    w.set_arena(this);
};

Arena.prototype.update = function() {
    for(var i in this.tanks) {
        this.tanks[i].update();
    }

    for(var i = this.bullets.length-1; i >= 0; i--) {
        var cur = this.bullets[i];
        var collided_with = cur.check_for_collision();
        if (collided_with.length > 0) {
            this.bullets.splice(i, 1);
            console.log("bullet collision");
        }

        if (cur.has_left_arena()) {
            console.log("bullet left arena");
            this.bullets.splice(i, 1);
        }
    }
};

Arena.prototype.to_JSON = function() {
    var rv = {}
    for(i = 0; i < this.tanks.length; i++) {
        rv['tank' + i] = this.tanks[i].to_JSON();
    }

    rv.bullets = []
    for(i = 0; i < this.bullets.length; i++) {
        rv.bullets.push(this.bullets[i].to_JSON());
    }

    rv.walls = []
    for(i = 0; i < this.walls.length; i++) {
        rv.walls.push(this.walls[i].to_JSON());
    }


    return JSON.stringify(rv)
};

module.exports = Arena;
