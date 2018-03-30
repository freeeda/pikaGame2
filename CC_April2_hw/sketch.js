//variables for loading pokeball and pikachu images
var pokeball, pikachu;
var ballX, ballY;

//pika objects stored in an array
var pika = []


function preload(){
  pikachu = loadImage("pika1.png");
  pokeball = loadImage("pokeball.png");
}


//create the object of pika
function Pikachu(){
  //customize different moles later on
  this.xPos = random(60,540);
  this.yPos = random(60,740);

  //create states - 0: mole down; 1: mole up
  this.state = 0;

  //create a timer that tracks the duration of mole - randomly change the state if it reaches a number
  this.timer = 0;
  this.timerMax = int(random(30,80));

  //create the display function to adjust mole in differest states
  this.display = function(){
    //mole down when state = 0; display a filled ellipse
    if (this.state == 0) {
      stroke(0);
      strokeWeight(5);
      fill(128);
      ellipse(this.xPos, this.yPos, 120, 120);
    }
    //mole up when state = 1 with owl appeared
    else {
      stroke(0);
      fill(255);
      ellipse(this.xPos, this.yPos, 120, 120);
      image(pikachu, this.xPos, this.yPos, 100, 100);
    }

  }

  //create a update function for mole to change state when reaching a maximum limit of time
  this.update = function(){
    //set maximum time a random number and change state if the exceeds it
    this.timer += 1;
    if (this.timer >= this.timerMax){
      if (this.state == 0){
        this.state = 1;
      }
      else{
        this.state = 0;
      }
      //reset the timer
      this.timer = 0;
    }

  }
  //create a check method to see if the pokeball successfully hit the pikachu
  this.checkIt = function(ballX, ballY){
    //when pokeball hits the mole area
    if (dist(ballX, ballY, this.xPos, this.yPos) <= 50){
      //if mole is up, return true and add score
      if (this.state == 1){
        this.state = 0;
        return true;
      }
      else{
        return false;

      }

    }
  }
}

function setup(){

  createCanvas(600,800);

  //pokeball is initially set up at the center of the screen
  ballX = 250;
  ballY = 250;

  //create pika objects
  //load pikas for the game
   for (i = 0; i<5; i++){
     pika.push(new Pikachu());

   }

}

function draw(){
  background(128);


  //draw all the pikachu
  for (i = 0; i<5; i++){
    pika[i].display();
    pika[i].update();
    pika[i].checkIt(ballX, ballY);

  }

  //draw the pokeball and let mouse control it
  imageMode(CENTER);
  image(pokeball, ballX, ballY, 50, 50);
  ballX = mouseX;
  ballY = mouseY;



}
