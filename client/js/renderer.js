function Renderer(images) {
    this.validateImages(images);

    this.images = images
    this.tank_width = 33;
}

Renderer.prototype.validateImages = function(images) {
    var requiredKeys = ['body1', 'turret1', 'body2', 'turret2', 'bg'];
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
    //draw a circle
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, 2, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
};


Renderer.prototype.toRads = function(degs) {
    return degs * (Math.PI / 180);
};
