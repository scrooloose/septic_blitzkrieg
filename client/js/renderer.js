function Renderer(images) {
    this.validateImages(images);

    this.images = images
    this.tank_width = 33;
}

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
    ctx.drawImage(imgBg, 0, 0);
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
    ctx.save();
    ctx.translate(tank.x, tank.y);
    ctx.rotate(this.toRads(tank.body_heading));
    ctx.drawImage(tank.body, -this.tank_width, -this.tank_width);

    ctx.rotate(-this.toRads(tank.body_heading));
    ctx.rotate(this.toRads(tank.turret_heading));
    ctx.drawImage(tank.turret, -this.tank_width, -this.tank_width);

    ctx.translate(-tank.x, -tank.y);
    ctx.restore();
};

Renderer.prototype.renderBullet = function(bullet) {
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, 3, 0, Math.PI*2, false);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    ctx.stroke();
};

Renderer.prototype.renderWall = function(wall) {
    ctx.beginPath();
    ctx.rect(wall.x, wall.y, wall.width, wall.height);
    ctx.fillStyle = this._wallPattern();
    ctx.fill();
};

Renderer.prototype._wallPattern = function() {
    if (Renderer.__wallPattern === undefined) {
        Renderer._pattern = ctx.createPattern(this.images.wall, "repeat");
    }
    return Renderer._pattern;
}

Renderer.prototype.toRads = function(degs) {
    return degs * (Math.PI / 180);
};
