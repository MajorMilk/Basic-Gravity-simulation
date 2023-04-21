let FixedBodies, MovingBodies;
function setup() 
{
    frameRate(240);
	createCanvas(windowWidth, windowHeight);
    FixedBodies = [];
    MovingBodies = [];
    
    //constructor(x = 0, y= 0, radius = 1, mass = 1, fixed = false, initialVelocity = createVector(0,0), color = color(255, 255, 255))
    //FixedBodies.push(new Body(0, 0, 20, 200, false,  createVector(0.3, 0), color(255,255,255)));
    //MovingBodies.push(new Body(0, 200, 20, 200, false, createVector(0.1, 0), color(255,255,255)));

    for(let i = 0; i < 1; i++)
    {
        let randWidth = random(-width/2, width/2);
        let randHeight = random(-height/2, height/2);

        let randMass = random(1000, 2000);

        let randVelocity = p5.Vector.fromAngle(random(0, 2*PI));
        randVelocity.mult(random(0.1, 0.3));

        FixedBodies.push(new Body(0, 0, 
            sqrt(randMass), randMass, false,  randVelocity, color(255,255,255)));

        
    }

    for(let i = 0; i < 5000; i++)
    {
        let randWidth = random(-width, width);
        let randHeight = random(-height, height);

        let randMass = random(10, 500);

        let randVelocity = p5.Vector.fromAngle(random(0, 2*PI));
        randVelocity.mult(random(0.7, 1.5));

        let randColor = color(random(0, 255), random(0, 255), random(0, 255));
        MovingBodies.push(new Body(randWidth, randHeight, 
            sqrt(randMass), randMass, false,  randVelocity, randColor));

        
    }

    // const fixedBody = FixedBodies[0];
    // const movingBody = MovingBodies[0];
    // const r = p5.Vector.dist(fixedBody.position, movingBody.position);
    // const requiredVelocity = sqrt(3 * ((fixedBody.mass + movingBody.mass) / r));
    // movingBody.velocity = createVector(requiredVelocity/2, 0);
}

function draw()
{
    translate(width/2, height/2);
    background(0);
    FixedBodies.forEach(body => {
        //body.update(FixedBodies, true);
        body.show();
    });
    

    MovingBodies.forEach(body => {
        body.show();
        body.update(FixedBodies);
    });
}
