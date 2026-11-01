function Vehicle(color){
    this.color = color;
    this.speed = 0
}

Vehicle.prototype.go = function(speed){
    this.speed = speed;
    console.log(`vehicle is now going at ${this.speed} MPH`);
}
Vehicle.prototype.print = function(){
    console.log(`The ${this.color} vehicle is going at ${this.speed} MPH`)
};



////////////////
function Plane (color){
    Vehicle.call(this, color)
}
Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.constructor = Plane;
Plane.prototype.go = function(speed){
    this.speed = speed
    console.log(`plane is now flying at ${speed} MPH`)
}
const p1 = new Plane('white');
const v1 = new Vehicle('blue');
v1.go(100);
v1.print();
p1.go(600);
p1.print();


/////////////////////////////////

class Vehicle2{
    constructor(color){
        this.color = color;
        this.speed = 0;
    }
    go(speed){
        this.speed = speed;
        console.log(`vehicle is now going at ${this.speed} MPH`);
    }
    print(){
        console.log(`The ${this.color} vehicle is going at ${this.speed} MPH`)
    }
}

class Plane2 extends Vehicle2{
    constructor(color){
        super(color);
    }
    go(speed){
        this.speed = speed;
        console.log(`plane is now flying at ${speed} MPH`);
    }
}
const p2 = new Plane2('white');
const v2 = new Vehicle2('blue');
v2.go(100);
v2.print();
p2.go(600);
p2.print();

