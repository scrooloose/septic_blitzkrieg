global.Point = require('./point.js');
global.Tank = require('./tank.js');
global.Engine = require('./engine.js');
global.Bullet = require('./bullet.js');
global.Arena = require('./arena.js');
global.Wall = require('./wall.js');

var engine = new Engine();

var PORT = 9378;
var HOST = "127.0.0.1";
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: PORT });
wss.on('connection', function connection(ws) {

    ws.on('message', function incoming(message) {
        keys = JSON.parse(message)['keysDown'];
        player = JSON.parse(message)['player'];
        if (typeof keys !== 'undefined' && keys != {}) {
            engine.processInput(keys, player);
        }

        console.log('received: %s', message);
        console.log('Sending data: ' + engine.arena.to_JSON());
        ws.send(engine.arena.to_JSON());
    });

  //ws.send('something');
});
