//Game bootstrapping hax0r:
//create the canvas

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 572;
document.body.appendChild(canvas);

//load the images
pxLoader = new PxLoader();
imgBg = pxLoader.addImage('assets/images/background.png');
imgTank = pxLoader.addImage('assets/images/tank.png');
imgTurret = pxLoader.addImage('assets/images/turret.png');
imgTank2 = pxLoader.addImage('assets/images/tank2.png');
imgTurret2 = pxLoader.addImage('assets/images/turret2.png');
imgWall = pxLoader.addImage('assets/images/wall.jpg');

pxLoader.addCompletionListener(function(){
    renderer = new Renderer({
        body1: imgTank,
        turret1: imgTurret,
        body2: imgTank2,
        turret2: imgTurret2,
        bg: imgBg
    });

    engine = new ClientEngine(renderer);
    engine.start();
});
pxLoader.start();
