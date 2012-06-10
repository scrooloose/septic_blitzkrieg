// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 572;
document.body.appendChild(canvas);

pxLoader = new PxLoader();
imgBg = pxLoader.addImage('assets/images/background.png');
imgTank = pxLoader.addImage('assets/images/tank.png');
imgTurret = pxLoader.addImage('assets/images/turret.png');
imgTank2 = pxLoader.addImage('assets/images/tank2.png');
imgTurret2 = pxLoader.addImage('assets/images/turret2.png');
pxLoader.addCompletionListener(function(){
    engine = new Engine();
    engine.start_game();
});
pxLoader.start();
