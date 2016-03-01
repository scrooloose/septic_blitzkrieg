function Wall(point, width, height, arena) {
    this.point = point;
    this.width = width;
    this.height = height;
    this.arena = null;
}

Wall.prototype.set_arena = function(arena) {
    this.arena = arena;
};

module.exports = Wall;
