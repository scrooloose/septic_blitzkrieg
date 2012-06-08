function Tank() {
    $this = this;

    this.body_heading = 0;
    this.turret_heading = 0;
    this.x = 160;
    this.y = 260;
    this.speed = 0; //pixels per update

    this.accelerate = function() {
        this.speed++;
    };

    this.decelerate = function() {
        this.speed--;
    };

    this.update_position = function() {
        dx = $this.speed * Math.sin($this.to_rads($this.body_heading));
        dy = $this.speed * Math.cos($this.to_rads($this.body_heading));

        $this.x += Math.round(dx);
        $this.y -= Math.round(dy);
    };

    this.rotate_body = function(forward) {
        if (forward == 1) {
            $this.body_heading += 10;
            //$this.turret_heading += 10;
        } else {
            $this.body_heading -= 10;
            //$this.turret_heading -= 10;
        }
    };

    this.rotate_turret = function(forward) {
        if (forward == 1) {
            $this.turret_heading += 10;
        } else {
            $this.turret_heading -= 10;
        }
    };

    //convert degrees to radians
    this.to_rads = function(degs) {
        return degs * (Math.PI / 180);
    };

    this.render = function() {
        $this.update_position();

        ctx.save();
        ctx.translate($this.x, $this.y);
        ctx.rotate($this.to_rads($this.body_heading));
        ctx.drawImage(imgTank, -33, -33);

        ctx.rotate(-$this.to_rads($this.body_heading));
        ctx.rotate($this.to_rads($this.turret_heading));
        ctx.drawImage(imgTurret, -33, -33);

        ctx.translate(-$this.x, -$this.y);
        ctx.restore();
    };
}
