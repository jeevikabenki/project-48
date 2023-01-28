var Play = 1;
var End = 0;
var gameState = Play;

var astronaut, astronaut_shooting;
var asteroid, astroid_explode;
var asteroidsGroup, asteroid1, asteroid2, asteroid3, asteroid4, asteroid5, asteroid6, asteroid7, asteroid8, asteroid9, asteroid10
var backgroundImage;
var bullet, bulletGroup;

var score;
var gameOver, restart;
var life;
var gameOverImage;
var youWinImage;

function preload(){
  astronaut_shooting = loadAnimation("a1.png","a2.png","a4.png","a6.png","doneShooting.png");
  asteroid_explode = loadAnimation("e1.png","e2.png");

  asteroid1 = loadImage("m1.png")
  asteroid2 = loadImage("m2.png")
  asteroid3 = loadImage("m3.png")
  asteroid4 = loadImage("m4.png")
  asteroid5 = loadImage("m5.png")
  asteroid6 = loadImage("m6.png")
  asteroid7 = loadImage("m7.png")
  asteroid8 = loadImage("m8.png")
  asteroid9 = loadImage("m9.png")
  asteroid10 = loadImage("m10.png")
  bulletImage = loadImage("bullet.png")
  backgroundImage = loadImage("background.png")
  fullHeartImage = loadImage("fullHeart.png")
  emptyHeartImage = loadImage("emptyHeart.png")
  gameOverImage = loadImage("gameover.png")
  youWinImage = loadImage("youWin.png")

  shootingSound = loadSound("laserSound.wav")
  destroySound = loadSound("asteroidDestroy.mp3")
  gameOverSound = loadSound("gameOverSound.wav")
  victorySound = loadSound("victorySound.mp3")
}


function setup() {
  createCanvas(800,400);

  astronaut = createSprite(100,300,20,55);
  astronaut.addAnimation("shooting", astronaut_shooting);
  asteroidsGroup = createGroup()
  bulletGroup = createGroup()
  score = 0;
  life = 3;
  
  gameOver = createSprite(400,200,100,100);
  gameOver.addImage("gameOverImage", gameOverImage);
 gameOver.visible = false;

 youWin = createSprite(400,200,100,100)
 youWin.addImage("youWinImage",youWinImage);
 youWin.visible = false;


  fullHeart1 = createSprite(60,40,10,10);
  fullHeart1.addImage("fullHeart1",fullHeartImage);
  fullHeart1.addImage("emptyHeart1",emptyHeartImage);
  fullHeart1.scale = 0.2

  fullHeart2 = createSprite(90,40,10,10);
  fullHeart2.addImage("fullHeart2",fullHeartImage);
  fullHeart2.addImage("emptyHeart2", emptyHeartImage);
  fullHeart2.scale = 0.2;

  fullHeart3 = createSprite(120,40,10,10);
  fullHeart3.addImage("fullHeart3",fullHeartImage);
  fullHeart3.addImage("emptyHeart3", emptyHeartImage);
  fullHeart3.scale = 0.2
  
}

function draw() {
  background(backgroundImage); 
  textSize (25);
  text("Score: "+score, 600,50);
  text("Life: "+life, 800,50);
  
  drawSprites();
  if(gameState === Play){
    spawnAsteroids()
  
  if(keyDown("space")){
    SpawnBullet();
    shootingSound.play();
    shootingSound.setVolume(0.2);
  }
  if(keyDown("up")){
    astronaut.y -= 3;
  }
  if(keyDown("down")){
    astronaut.y += 3;
  }

  if(astronaut.y<50){
    astronaut.y=50
  }

  if(astronaut.y>350){
    astronaut.y=350;
  }

  if(bulletGroup.isTouching(asteroidsGroup)){
    asteroidsGroup[0].destroy()
    bulletGroup.destroyEach()
    score += 1;
    destroySound.play();
    destroySound.setVolume(0.4);
  }
  
  if(asteroidsGroup.isTouching(astronaut)){
    asteroidsGroup[0].destroy()
    life = life-1
  
  }
  if(life==2){
    fullHeart3.changeImage("emptyHeart3", emptyHeartImage);
  }
  if(life==1){
    fullHeart2.changeImage("emptyHeart2", emptyHeartImage);
  }
  if(life<=0){
   
    gameOverSound.play();
    gameOverSound.setVolume(0.4);
    gameState = End
  }
  
  if(score == 20){
    youWin.visible = true;
    asteroidsGroup.destroyEach();
    bulletGroup.destroyEach();
    astronaut.destroy();
    victorySound.play();
    victorySound.setVolume(0.4);
  }
}

if(gameState === End){
  fullHeart1.changeImage("emptyHeart1",emptyHeartImage);
  astronaut.destroy();
  gameOver.visible = true;
  asteroidsGroup.destroyEach();
  bulletGroup.destroyEach();
}
}



function spawnAsteroids(){
  if(frameCount % 60 === 0) {
    asteroid = createSprite(800,200,40,40);
    asteroid.velocityX = -(3 + 3*score/10);
    asteroid.y = Math.round(random(100,350));
    
    var rand = Math.round(random(1,10))
    switch(rand) {
      case 1: asteroid.addImage(asteroid1);
      break;
      case 2: asteroid.addImage(asteroid2);
      break;
      case 3: asteroid.addImage(asteroid3);
      break;
      case 4: asteroid.addImage(asteroid4);
      break;
      case 5: asteroid.addImage(asteroid5);
      break;
      case 6: asteroid.addImage(asteroid6);
      break;
      case 7: asteroid.addImage(asteroid7);
      break;
      case 8: asteroid.addImage(asteroid8);
      break;
      case 9: asteroid.addImage(asteroid9);
      break;
      case 10: asteroid.addImage(asteroid10);
      break;
      default: break;
    }
    asteroid.scale = 0.7
    asteroid.lifetime = 300;
    asteroidsGroup.add(asteroid);
  }
}

function SpawnBullet(){
  if(frameCount % 10 === 0){
var bullet = createSprite(100,300,20,20);
bullet.addImage(bulletImage);
bullet.velocityX = 5;
bullet.lifetime = 200;
bullet.scale = .2;
bullet.y = astronaut.y;
bulletGroup.add(bullet);

  }
}
