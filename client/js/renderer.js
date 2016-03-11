function Renderer(images) {
    this.validateImages(images);
    this.images = images
    this.setupCanvas();
    this.tank_width = 33;
}

Renderer.prototype.setupCanvas = function() {
    var canvas = document.createElement("canvas");
    this.ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 672;
    document.body.appendChild(canvas);
};

Renderer.prototype.validateImages = function(images) {
    var requiredKeys = ['body1', 'turret1', 'body2', 'turret2', 'bg', 'wall'];
    for (i = 0; i < requiredKeys.length; i++) {
        var key = requiredKeys[i]
        if (images[key] == undefined) {
            throw new Error("Missing image key: " + key);
        }
    }
};

Renderer.prototype.render = function(worldState) {
    this.ctx.drawImage(imgBg, 0, 0);
    this.renderTank(extend(worldState.tank0, { body: this.images.body1, turret: this.images.turret1}) );
    this.renderTank(extend(worldState.tank1, { body: this.images.body2, turret: this.images.turret2}) );

    for (i = 0; i < worldState.bullets.length; i++) {
        this.renderBullet(worldState.bullets[i]);
    }

    for (i = 0; i < worldState.walls.length; i++) {
        this.renderWall(worldState.walls[i]);
    }
};

Renderer.prototype.renderTank = function(tank) {
    this.ctx.save();
    this.ctx.translate(tank.x, tank.y);
    this.ctx.rotate(this.toRads(tank.body_heading));
    this.ctx.drawImage(tank.body, -this.tank_width, -this.tank_width);

    this.ctx.rotate(-this.toRads(tank.body_heading));
    this.ctx.rotate(this.toRads(tank.turret_heading));
    this.ctx.drawImage(tank.turret, -this.tank_width, -this.tank_width);

    this.ctx.translate(-tank.x, -tank.y);
    this.ctx.restore();
};

Renderer.prototype.renderBullet = function(bullet) {
    this.ctx.beginPath();
    this.ctx.arc(bullet.x, bullet.y, 3, 0, Math.PI*2, false);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'red';
    this.ctx.stroke();
};

Renderer.prototype.renderWall = function(wall) {
    this.ctx.beginPath();
    this.ctx.rect(wall.x, wall.y, wall.width, wall.height);
    this.ctx.fillStyle = this._wallPattern();
    this.ctx.fill();
};

Renderer.prototype._wallPattern = function() {
    if (Renderer.__wallPattern === undefined) {
        Renderer._pattern = this.ctx.createPattern(this.images.wall, "repeat");
    }
    return Renderer._pattern;
}

Renderer.prototype.toRads = function(degs) {
    return degs * (Math.PI / 180);
};
