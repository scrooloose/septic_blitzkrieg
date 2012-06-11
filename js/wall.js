function Wall(x, y, width, height, arena) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.arena = null;
}

Wall.prototype.set_arena = function(arena) {
    this.arena = arena;
};

Wall.prototype.render = function() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
};


