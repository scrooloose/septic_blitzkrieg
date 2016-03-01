function ClientEngine(renderer) {
    this.serverHost = this._extractHost();
    this.serverPort = 9378
    this.playerNumber = getQStringParam("player")
    this.renderer = renderer;

    // Handle keyboard controls
    this.keysDown = {};

    $this = this;
    addEventListener("keydown", function(e) {
        $this.keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function(e) {
        delete $this.keysDown[e.keyCode];
    }, false);
}

ClientEngine.prototype._extractHost = function() {
    if (getQStringParam("host") != undefined) {
        return getQStringParam("host");
    }

    return "localhost";
}

ClientEngine.prototype.start = function() {
    var $this = this;

    socket = new WebSocket('ws://' + this.serverHost + ':' + this.serverPort);

    socket.onopen = function() {
        window.setInterval(function() {

            var params = JSON.stringify({
                "keysDown": $this.keysDown,
                "player": $this.playerNumber,
            });

            socket.send(params);

        }, 50);
    };

    socket.onmessage = function(message) {
        $this.renderer.render(JSON.parse(message.data));
    };
}
