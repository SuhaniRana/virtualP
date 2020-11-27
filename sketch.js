//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;
var addFood, feedPet;
var fedTime, lastFed;
var foodObj

function preload()
{
  //load images here
  dogImage = loadImage("Dog.png");
  happyDogImage = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
  background(46,139,87);
  createCanvas(1000, 400);

  
  
  dog = createSprite(800,200,150,2150);
  dog.addImage(dogImage);
  dog.scale = 0.15;

   foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feedPet = createButton("Feed the dog");
   feedPet.position(700, 95);
  feedPet.mousePressed(addFoods);

  addFood = createButton("Add the food");
   addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){

    lastFed = data.val();
  });
  
  
}


function draw() {  
  background(49,50,100);
  fill(255,255,254);
textSize(15);

if(lastFed>=12){

text("last feed" + lastFed%12 + "PM" + 350, 30);


} else if (lastFed == 0){

text("last fed 12 AM:" ,350, 30);

} else{

text("last feed" + lastFed + "AM" ,350, 30);

}

  drawSprites();
  //add styles here
  textSize(20);
 // fill(blue);
 text("Food remaining:" + foodS, 100, 80);
  stroke(6);



  foodObj.display();

}

function readStock(data){

foodS = data.val();
foodObj.updateFoodStock(foodS);




}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

database.ref('/').update({
Food : x

})

}

function feedDog(){

dog.addImage(happyDogImage);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
Food: foodObj.getFoodStock(),
Feedtime:hour()
})

}

function addFoods(){

foodS++;
database.ref('/').update({

Food: foodS
})

}


