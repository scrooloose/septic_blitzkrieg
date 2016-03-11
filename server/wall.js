function Wall(point, width, height, arena) {
    this.point = point;
    this.width = width;
    this.height = height;
    this.arena = null;
}

Wall.prototype.set_arena = function(arena) {
    this.arena = arena;
};

Wall.prototype.to_JSON = function() {
    rv = {}
    rv['x'] = this.point.x
    rv['y'] = this.point.y
    rv['height'] = this.height;
    rv['width'] = this.width;

    return rv;
};

module.exports = Wall;
