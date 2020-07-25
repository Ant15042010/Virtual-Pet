var D, hD, database, f, fS, Dimg, hDimg, addButton, removeButton,FOOD,FedTime,lastFed;

function preload(){
  Dimg = loadImage("images/dogImg.png");
  hDimg = loadImage("images/dogImg1.png");
}

function setup() {
   database = firebase.database();

  createCanvas(1150, 600);

  FOOD = new Food();

  addButton = createButton('Add Milk');
  addButton.position(1150/2,40);
  
  removeButton = createButton('Feed Dog');
  removeButton.position(480,40);
 
  addButton.mousePressed(addFoods);
  removeButton.mousePressed(FeedDogs);


  D = createSprite(950, 300);

  hD = createSprite(950, 300);

  hD.visible = false;

  D.addImage("dog",Dimg);
  D.scale = 0.15;

  hD.addImage("Hdog",hDimg);
  hD.scale = 0.15

  fS=database.ref('Food');
  fS.on("value",(data)=>{f=data.val();});
}


function draw() { 

  background(101, 128, 182);

  FOOD.display();

  fill(255,255,255);
  textSize(20);

  FedTime=database.ref('FeedTime');
  FedTime.on("value",function(data){lastFed=data.val();})
  if(lastFed>=12){
    text("Last Fed at "+lastFed%12+" pm",485,100);
  }
  else if(lastFed===0){
    text("Last Fed at 12 am",485,100);
  }
  else{
    text("Last Fed at"+lastFed%12+" am",485,100)
  }

  drawSprites();

}

function readStock(data){
  f = data.val();
  FOOD.updateFoodStock(f);
}

function FeedDogs(){
  D.visible=false;
  hD.visible=true;

  FOOD.updateFoodStock(FOOD.getFoodStock()-1);

  database.ref('/').update({Food:FOOD.getFoodStock(),FeedTime:hour()});
}

function addFoods(){
  f++
  database.ref('/').update({Food:f});
}