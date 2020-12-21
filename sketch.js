var ground;
var monkey ,monkey_running,monkey_jumping,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score=0,survivalTime=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver,gameOver_image,restart,restart_image;

function preload(){
  
  
  monkey_running =
  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_jumping=loadAnimation("sprite_0.png");
  monkey_collided=loadAnimation("sprite_1.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  gameOver_image=loadImage("gameover.png");
  restart_image=loadImage("restart.png");
  
}



function setup() {
 createCanvas(500,500) ;

 ground=createSprite(250,460,1000,20);
  
 //invisible_c=createSprite(250,250,500,500); 
 //invisible_c.visible=false; 
 
 gameOver=createSprite(250,200,10,10) ;
 gameOver.addImage("gameover",gameOver_image) ;
 gameOver.scale=0.5; 
 gameOver.visible=false;
  
 restart=createSprite(250,300,10,10) ;
 restart.addImage("restart",restart_image) ;
 restart.scale=0.3; 
 restart.visible=false; 
  
  
 monkey=createSprite(50,405,10,10) ;
 monkey.addAnimation("monkey",monkey_running) ;
 monkey.addAnimation("monkey_j",monkey_jumping);
 monkey.addAnimation("monkey_c",monkey_collided);
 monkey.scale=0.15;
// monkey.debug=true;
 
 foodGroup=createGroup() ;
 obstacleGroup=createGroup();
  
 console.warn("hungry monkey!!!") ;
 console.info("but don't worry after sometime he won't be hungry anymore because he chasing the path on which there are bananas and maybe where the path ends he'll find a bunch of fruits and thennnnnn...he'll be singing Yummy!...maybe he'll fail justin in singing ...no one knows how good a monkey can sing so we have to wait to find that out...until then you can sing ,enjoy seeing this monkey doing his catwalk!!! :D  ... and don't forget to make him jump over the stones cause he can get stuck!!!") 
  
  
  
  
}


function draw() {
  background(255);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: "+ survivalTime,100,50);
  
  if(monkey.y<402){ 
   monkey.changeAnimation("monkey_j");
  }
 else{
   monkey.changeAnimation("monkey") ;
 }
  
if(gameState===PLAY){
  
  ground.velocityX=-2;
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  survivalTime=Math.ceil(frameCount/frameRate());  
  
 if(keyDown("space")&monkey.y>=403  ) {
   monkey.velocityY=-15;
  }
  
  monkey.velocityY=monkey.velocityY+0.5 ;
  
  monkey.collide(ground);
  
  food();
  rock();
  
  if (monkey.isTouching(obstacleGroup)){
     gameState=END;
  }
  
 } 
  
if(gameState===END) {
  ground.velocityX=0;
  monkey.velocityY=0;
  foodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  foodGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1);
  monkey.changeAnimation("monkey_c")
  gameOver.visible=true;
  restart.visible=true;
  
  if(mousePressedOver(restart)){
    reset();
   }
}  
  drawSprites();
}

function reset(){
  gameState=PLAY;
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  survivalTime=0;
  score=0;
  frameCount=0;
  gameOver.visible=false;
  restart.visible=false;
}

function food(){
  
 if(frameCount % 80==0){  
  banana=createSprite(500,300,10,10)
  banana.addImage("banana",bananaImage);
  banana.scale=0.1;
  banana.velocityX=-3;
  banana.y=Math.round(random(170,300));
  banana.lifetime=250;
  monkey.depth=banana.depth+1;
  foodGroup.add(banana);
   
 } 
  
}

function rock(){
 if(frameCount % 300==0) {
  obstacle=createSprite(500,410,10,10) ; 
  obstacle.addImage("obstacle",obstacleImage);
   //obstacle.debug=true;
   obstacle.setCollider("circle",-20,40,200 )
  obstacle.scale=0.25;
  obstacle.velocityX=-5;
  obstacle.lifetime=250;
  obstacleGroup.add(obstacle) ;
 } 
  
}


