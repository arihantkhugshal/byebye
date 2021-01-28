var jake,back
var PLAY=1;
var END=0;
var gamestate=PLAY;
var coingroup;
var traingroup;
var coin,coinImage;
var path,pathImage;
var jake,jakeImage;
var coin,coinImage;
var train,trainImage;
var leftBoundary,rightBoundary;
var train,trainImage;
var jake,back
var traingroup;
 
function preload(){
  pathImage=loadImage("track.png");
  coinImage=loadImage("coin.png");
  jakeImage = loadAnimation("jake1.png","jake2.png","jake3.png","jake4.png","jake5.png");
  jakestop=loadAnimation("jake1.png")
  restartImage=loadImage("reload.png");
  trainImage=loadImage("thomas.png");
  sound=loadSound("Subway.mp3")
  gameoverImage=loadImage("gameover.png")
  backImage=loadImage("Cyan.png")
  bombimg=loadImage("bomb.png")
}
function setup() {
  createCanvas(1200, 400);
  path=createSprite(600,200)
  path.addImage(pathImage)
  path.scale=1.4
  path.velocityY=2
  jake=createSprite(600,300,59,200)
  jake.addAnimation("jakerunning",jakeImage)
  jake.scale=0.5
//create right Boundary
rightBoundary=createSprite(1150,0,100,800);
rightBoundary.visible = false;

leftBoundary=createSprite(0,0,100,800);
leftBoundary.visible = false;

   // back=createSprite(600,200,1200,400) ;
   // back.addImage(backImage);
   // back.scale=0.4;
    gameover=createSprite(600,150,25,10) ;
    gameover.addImage(gameoverImage);  
   gameover.scale=0.4
   gameover.visible=false 

     restart=createSprite(600,250,25,10) ;
   restart.addImage(restartImage);
    restart.scale=0.2;
    restart.visible=false;
  
  coingroup=new Group ();
  traingroup=new Group ();
   bombgroup=new Group();
  sound.loop();
}
  function draw(){

  background(backImage)      
  if(gamestate===PLAY){
    if(keyDown("left")){
      jake.x=jake.x-4
    }
    if(path.y>400){path.y=200}
    if(keyDown("right")){
      jake.x=jake.x+4
    }
    if(jake.isTouching(bombgroup)||jake.isTouching(traingroup)){
      gamestate=END;
    }
    Bomb()
 Coin();   
 trains();               
  }
  if(gamestate===END){
    coingroup.destroyEach();
    bombgroup.destroyEach();
    traingroup.destroyEach();
    path.velocityY=0;
    jake.changeAnimation("stop",jakestop)
    gameover.visible=true
    restart.visible=true
    sound.stop();
    reset()
  }
  edges= createEdgeSprites();
  jake.collide(edges[3]);
  jake.collide(leftBoundary);
  jake.collide(rightBoundary);


  drawSprites()
  }

function Coin(){
  if(frameCount%60===0){
coin=createSprite(Math.round(random(100,1000)),Math.round(random(20,340)))
coin.velocityY=2;
coingroup.add(coin)
coin.addImage(coinImage);
coin.scale=0.4

  }
}

function trains(){
  if(frameCount%100===0){ 
train=createSprite(100,10,5,2)
train.x = Math.round(random(100,1000));
train.addImage(trainImage)
 train.velocityY = 2;
  train.debug=false;     
   train.setCollider("circle",0,0,30);
   traingroup.add(train);
   train.scale=0.4 
} 


}
function Bomb(){
  if(frameCount%60===0){
bomb=createSprite(Math.round(random(135,1000)),Math.round(random(20,340)))
bomb.velocityY=2;
bombgroup.add(bomb)
bomb.addImage(bombimg)
bomb.scale=0.1  
  }
}

function reset(){
  if(mousePressedOver(restart)){
  gamestate=PLAY;
  coingroup.destroyEach();
  traingroup.destroyEach();
  jake.visible=true;
score=0;
sound.loop();
gameover.visible=false
restart.visible=false
path.velocityY=3
  }
  
}


