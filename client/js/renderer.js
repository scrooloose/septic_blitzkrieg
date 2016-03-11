function Renderer(images) {
    this.validateImages(images);
    this.images = images
    this.setupCanvas();
    this.tank_width = 33;

    this.HEALTH_BAR_WID = 500;
    this.HEALTH_BAR_HEIGHT = 30;
    this.HEALTH_BAR_Y = 610;
}

Renderer.prototype.setupCanvas = function() {
    var canvas = document.createElement("canvas");
    this.ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 672;
    document.body.appendChild(canvas);

    this.renderPlayerNames();
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

    this.renderHealthBars(worldState);
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

Renderer.prototype.renderHealthBars = function(worldState) {
    var tank0 = worldState['tank0'];
    this.ctx.fillStyle="green";
    this.ctx.fillRect(0, this.HEALTH_BAR_Y, this.HEALTH_BAR_WID, 30);
    this.ctx.fillStyle="red";
    var barWid = Math.max(-500, -(this.HEALTH_BAR_WID - (this.HEALTH_BAR_WID * (tank0.health / 100))));
    this.ctx.fillRect(this.HEALTH_BAR_WID, this.HEALTH_BAR_Y, barWid, 30);

    var tank1 = worldState['tank1'];
    this.ctx.fillStyle="green";
    this.ctx.fillRect(524, this.HEALTH_BAR_Y, this.HEALTH_BAR_WID, 30);
    this.ctx.fillStyle="red";
    var barWid = Math.max(-500, -(this.HEALTH_BAR_WID - (this.HEALTH_BAR_WID * (tank1.health / 100))));
    this.ctx.fillRect(1024, this.HEALTH_BAR_Y, barWid, 30);

};

Renderer.prototype.renderPlayerNames = function(worldState) {
    this.ctx.fillStyle="black";
    this.ctx.font = "14px sans-serif";
    this.ctx.fillText("Player One", 0, 600);

    this.ctx.fillStyle="black";
    this.ctx.font = "16px Arial";
    this.ctx.fillText("Player two", 524, 600);
};
