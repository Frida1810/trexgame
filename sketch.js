var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage, cloudsGroup;
var jumpSound, checkpointSound, dieSound;

var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOverImg, restartImg;

function preload(){
    trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
    trex_collided = loadImage("trex_collided.png");
    
    groundImage = loadImage("ground2.png");

    cloudImage = loadImage("cloud.png");

    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
    obstacle6 = loadImage("obstacle6.png");

    restartImg = loadImage("restart.png");
    gameOverImg = loadImage("gameOver.png");
    
    jumpSound = loadSound("jump.mp3");
    checkpointSound = loadSound("checkpoint.mp3");
    dieSound = loadSound("die.mp3");
}

function setup() {

    createCanvas(600,200)
  
    //crear sprite de Trex
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.scale = 0.5;
    
    //crear sprite de suelo
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;

    gameOver = createSprite(300, 100);
    gameOver.addImage(gameOverImg);

    restart = createSprite(300, 140);
    restart.addImage(restartImg);

    gameOver.scale = 0.5;
    restart.scale = 0.5;
    
    //crear sprite de suelo invisible
    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;
    
    //generar numeros aleatorios
    var rand =  Math.round(random(1,100))

    score = 0;
    
    obstaclesGroup = new Group();
    cloudsGroup = new Group();

    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);

}

function draw() {
    //establecer color de fondo
    background(180);
    text("Puntaje: "+score,500,30);
    
    if(gameState === PLAY){
      ground.velocityX = -4;
      score = score+Math.round(frameCount / 60);
      
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
      
      if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -10;
        //agregar sonido 
        jumpSound.play();
      }
      
      trex.velocityY = trex.velocityY + 0.8

      if(obstaclesGroup.isTouching(trex)){
        gameState = END;
      }
      
    
    } else if(gameState === END){
      ground.velocityX = 0;

      gameOver.visible = true;
      restart.visible = true;

      obstaclesGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);

    }

    console.log(trex.y)
    
    
    
    //evitar que el Trex caiga
    trex.collide(invisibleGround);
    
    //aparecer nubes
    spawnClouds()
    spawnObstacles()
    drawSprites();
}

//función para aparecer las nubes
function spawnClouds(){
    //escribir aquí tu código 
    if (frameCount % 60 === 0){
    cloud=createSprite(600,100,40,10);
    cloud.velocityX=-3;

    cloud.addImage(cloudImage);
    cloud.scale = 0.4;

    cloud.y = Math.round(random(10,60));

    trex.depth = cloud.depth;
    trex.depth += 1;

    cloudsGroup.add(cloud);

    cloud.lifetime = 210;
    }
}
 function spawnObstacles(){
  if(frameCount % 60 ==0){
    obstacle=createSprite(700,170,20,40);
    obstacle.velocityX=-6;

    var dado= Math.round(random(1,6)); 
    switch(dado){
      case 1: obstacle.addImage(obstacle1); break;
      case 2: obstacle.addImage(obstacle2); break;
      case 3: obstacle.addImage(obstacle3); break;
      case 4: obstacle.addImage(obstacle4); break;
      case 5: obstacle.addImage(obstacle5); break;
      case 6: obstacle.addImage(obstacle6); break;
    }
     
    obstacle.scale = 0.4;
  }
 
 }




