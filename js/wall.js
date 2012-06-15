function Wall(x, y, width, height, arena) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.arena = null;
}

Wall.pattern = function() {
    if (Wall._pattern === undefined) {
        console.log("Initing wall.pattern");
        Wall._pattern = ctx.createPattern(imgWall, "repeat");
    }

    return Wall._pattern;
};

Wall.prototype.set_arena = function(arena) {
    this.arena = arena;
};

Wall.prototype.render = function() {
    ctx.fillStyle = Wall.pattern();
    ctx.fillRect(this.x, this.y, this.width, this.height);
};


