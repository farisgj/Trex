var trex, trex_running, trex_collided , pisoinvisible;
var ground, invisibleGround, groundImage;
var nube,nubeImage;
var Ob1;
var Ob2;
var Ob3;
var Ob4;
var Ob5;
var Ob6;
var score=0;
var PLAY=1;
var END=0;
var estadodejuego=PLAY;
var gameover,gameoverI;
var restart,restartI;
var die,dieS;
var jump,jumpS;
var cp,cpS;
var mensaje="este es un mensaje";


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png")
  
  nubeImage = loadImage("cloud.png");
  
  Ob1 = loadImage("Obstacle1.png");
  
  Ob2 = loadImage("Obstacle2.png");
  
  Ob3 = loadImage("Obstacle3.png");
  
  Ob4 = loadImage("Obstacle4.png");
  
  Ob5 = loadImage("Obstacle5.png");
  
  gameoverI = loadImage("GameOver.png");
  
  restartI = loadImage("restart.png");
  
  cpS = loadSound("checkPoint.mp3.mp3");
  
  dieS = loadSound("die.mp3.mp3");
  
  jumpS = loadSound("jump.mp3.mp3");
   
}

function setup() {
  createCanvas(600, 200);

//crea el sprite del Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("chocar", trex_collided);
  trex.scale = 0.5;
  
  gameover = createSprite(300,100);
  gameover.addImage("letrero",gameoverI);
  
  restart = createSprite(300,140);
  restart.addImage("reestablecer",restartI);
  restart.scale = 0.5;
  
//crea el sprite del suelo
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  pisoinvisible = createSprite(200,190,400,10);
  pisoinvisible.visible=false;
  
  console.log("te apuesto a que no puedes llegar al score 1000"+302);
  
  score=0;
  
  cactus=new Group();
  nubes=new Group();
  
  trex.setCollider("circle",0,0,35);
  trex.debug=true;
  
}

function draw() {
  background("yellow");
  //console.log(mensaje);
  text("score:" + score,500,50);
  if(estadodejuego===PLAY){
    restart.visible=false;
    gameover.visible=false;
    trex.changeAnimation("running",trex_running);
    score=score+Math.round(getFrameRate()/60);
    ground.velocityX = -(4+3*score/100);
    //score=score+Math.round(frameCount/60);
    if (ground.x < 0) {
    ground.x = ground.width / 2;
    }
    if(score>0 && score%100===0){
       
      cpS.play();
    }
    if (keyDown("space") && trex.y>=161) {
    trex.velocityY = -10;
    jumpS.play();
    }
    trex.velocityY = trex.velocityY + 0.8
    spawnClouds();
    spawnObstacle();
    if(cactus.isTouching(trex)){
      estadodejuego=END;
      dieS.play();
    } 
 }
  else if(estadodejuego===END){
    restart.visible=true;
    gameover.visible=true;
    if(mousePressedOver(restart)){
      console.log("reiniciar juego");
      reset();
      }
    ground.velocityX=0;
    cactus.setVelocityXEach(0);
    nubes.setVelocityXEach(0); 
    trex.changeAnimation("chocar",trex_collided);
    trex.velocityY=0;
    cactus.setLifetimeEach(-1);
    nubes.setLifetimeEach(-1);
  }
  console.log("estado de juego es igual",estadodejuego);

  trex.collide(pisoinvisible);
  
  drawSprites();
}


function spawnClouds(){
  
  
  if(frameCount%60===0){
    
    nube = createSprite(600,100,40,10);
    nube.velocityX=-3;
    nube.lifetime=220;
    nube.addImage(nubeImage);
    nube.scale=0.2;
    nube.y=Math.round(random(10,60));
    nube.depth=trex.depth;
    trex.depth=trex.depth+1;  
    
    nubes.add(nube);
 } 
}

function spawnObstacle(){
  
  if(frameCount%60===0){
     
    var obstaculo = createSprite(600,165,40,10);
    obstaculo.velocityX=-(6+score/100);
    var numram=Math.round(random(1,5));
    
    switch(numram){
      case 1:obstaculo.addImage(Ob1);  
             break;
      case 2:obstaculo.addImage(Ob2); 
             break;
      case 3:obstaculo.addImage(Ob3); 
             break;
      case 4:obstaculo.addImage(Ob4); 
             break;
      case 5:obstaculo.addImage(Ob5); 
             break;
             default:break;
        
   }
    obstaculo.scale=0.5;
    obstaculo.lifetime=300;
    
    cactus.add(obstaculo);
    
  }  
}

function reset(){
  estadodejuego=PLAY;
  restart.visible=false;
  gameover.visible=false;
  cactus.destroyEach();
  nubes.destroyEach();
  trex.changeAnimation("running",trex_running);
  score=0;
  nubes.setVelocityX=0;
  cactus.setVelocityX=0;
  
  
  
}




