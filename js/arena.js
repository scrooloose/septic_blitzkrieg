function Arena(width, height) {
    this.tanks = [];
    this.bullets = [];
    this.width = width;
    this.height = height;
}

Arena.prototype.add_bullet = function(b) {
    this.bullets.push(b);
};

Arena.prototype.add_tank = function(t) {
    this.tanks.push(t);
    t.arena = this;
};

Arena.prototype.update = function() {
    for(var i = this.bullets.length-1; i >= 0; i--) {
        var cur = this.bullets[i];
        var collided_with = cur.check_for_collision();
        if (collided_with.length > 0) {
            alert("Game over");
        }

        if (cur.has_left_arena()) {
            console.log("bullet left arena");
            this.bullets.splice(i, 1);
        }
    }
};
