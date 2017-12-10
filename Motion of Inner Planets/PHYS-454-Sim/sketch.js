//Set variables
var sun;
var mercury;
var venus;
var earth;
var mars;
var planets = [];

//Instead of creating shapes, used NASA images to blackbackgrounds
function preload() {
  sun = loadImage("nasaimages/sun.jpg");
  mercury = loadImage("nasaimages/mercury.jpg");
  venus = loadImage("nasaimages/venus.jpg");
  earth = loadImage("nasaimages/earth.jpg");
  mars = loadImage("nasaimages/mars.jpg");
 
//Set and created ratios of size, distance and random speeds
  planets.push(new Planet(10,120,random(4.5,5.8),1,mercury)); 
  planets.push(new Planet(24,218,random(1.5,2.6),1,venus));
  planets.push(new Planet(26,360,random(0.5,1),1,earth));
  planets.push(new Planet(7,458,random(0.1,0.6),1,mars));
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

}


function draw() {
// To hide black edges, hid outline by setting background black 
  background(0);
  push();
	  translate(width/2, height/2);
	  push();
		  rotate(frameCount/600);
		  image(sun, 0, 0,200,200);
	  pop();
	  for(i=0;i<planets.length;i++){
	  	planets[i].draw();
	  }
  pop();


}

//Calculated speeds according to projected ratios
var Planet = function(diam, dist, OrbitalSpeed, RadialSpeed, img) {
	this.orbitTheta = random(0,360);
	this.rotationTheta = this.orbitTheta;
	this.orbitSpeed = OrbitalSpeed;
	this.diameter = diam;
	this.distance = dist;
	this.rotationSpeed = RadialSpeed;
	this.img = img;
	this.moons = [];
	
//Choose a clockwise rotation for all planets 
	this.update = function(){
		this.orbitTheta += this.orbitSpeed;
		this.rotationTheta += this.rotationSpeed;

	}

	this.display = function(){
		imageMode(CENTER);

		var x = cos(radians(this.orbitTheta))*this.distance;
		var y = sin(radians(this.orbitTheta))*this.distance;

		push();

			translate(x, y);

				rotate(radians(this.rotationTheta));
				image(this.img,0,0,this.diameter,this.diameter);

		pop();
		for(var i = 0; i < this.moons.length; i++){
			this.moons[i].update();
		}
	}

	
	this.draw = function(){
		this.update();
		this.display();
	}

}
