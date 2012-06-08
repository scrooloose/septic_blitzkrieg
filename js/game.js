// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

pxLoader = new PxLoader();
imgBg = pxLoader.addImage('assets/images/background.png');
imgHero = pxLoader.addImage('assets/images/hero.png');
imgMonster = pxLoader.addImage('assets/images/monster.png');
imgTank = pxLoader.addImage('assets/images/tank.png');
imgTurret = pxLoader.addImage('assets/images/turret.png');
pxLoader.addCompletionListener(function(){
    engine = new Engine();
    engine.start_game();
});
pxLoader.start();
