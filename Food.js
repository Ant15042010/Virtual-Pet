class Food{
    constructor(){
       this.foodStock = 0;
       this.lastFed;
       this.image = loadImage("Milk.png");
    }
    updateFoodStock(x){
      this.foodStock = x;
    }
    
    getFedTime(lf){
      this.lastFed = lf;
    }

    detectFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock -1;
        }
    }

    getFoodStock(){
        return this.foodStock;
    }

    display(){

        var x = 80;
        var y = 100;
        imageMode(CENTER);
        image(this.image,720,220,50,50);
        console.log(this.foodStock);
        if(this.foodStock!=0){

           for(var i=0;i<this.foodStock;i++){
              console.log(i);
              if (i%10===0){x=80;y=y+50}

              image(this.image,x,y,50,50);
              x=x+30;
           }

        }
    }


}