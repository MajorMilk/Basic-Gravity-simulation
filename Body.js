class Body
{
    /**
     * This is a constructor function that creates a particle object with various properties such as
     * position, velocity, acceleration, radius, mass, fixed status, color, and disabled status.
     * @param [x=0] - The x-coordinate of the object's initial position.
     * @param [y=0] - The y-coordinate of the position vector of the object being created. It
     * determines the vertical position of the object on the canvas.
     * @param [radius=1] - The radius parameter is the size of the object being created. It determines
     * the distance from the center of the object to its edge.
     * @param [mass=1] - The mass of the object. It determines how much force is required to accelerate
     * the object.
     * @param [fixed=false] - A boolean value that determines whether the object is fixed in place or
     * can move. If fixed is set to true, the object will not move regardless of any forces acting on
     * it. If fixed is set to false, the object will move according to the laws of physics.
     * @param [initialVelocity] - The initial velocity of the object, which is a vector that determines
     * the object's speed and direction of movement. It is set to (0,0) by default, meaning the object
     * starts at rest.
     * @param [color] - The color of the object represented as an RGB value. The default color is white
     * (255, 255, 255).
     */
    constructor(x = 0, y= 0, radius = 1, mass = 1, fixed = false, initialVelocity = createVector(0,0), color = color(255, 255, 255))
    {
        this.position = createVector(x, y);
        this.velocity = initialVelocity;
        this.acceleration = createVector(0, 0);
        this.radius = radius;
        this.mass = mass;
        this.fixed = fixed;
        this.color = color;

        this.disabled = false;
        
    }

    applyForce(force)
    {
        let f = p5.Vector.div(force.copy(), this.mass);
        this.acceleration.add(f);
    }

    absorbBody(body)
    {
        this.mass += body.mass;
        this.radius = sqrt(this.mass);
    }

    /**
     * This function calculates the gravitational force between two bodies based on their masses and
     * distance.
     * @param body - The "body" parameter in this function refers to another object in the simulation
     * that is interacting with the current object. It is likely an instance of the same class as the
     * current object, and has properties such as mass and position. The function calculates the
     * gravitational force between the current object and the "body
     * @returns The function `calcForce` is returning a `p5.Vector` object representing the direction
     * and magnitude of the gravitational force between two bodies.
     */
    calcForce(body)
    {
        let distance = p5.Vector.dist(this.position, body.position);
        let f = body.mass * this.mass * 0.02;
        f /= distance * distance;

        let direction = p5.Vector.sub(body.position, this.position);
        direction.normalize();
        direction.mult(f);
        
        return direction;
    }

    /**
     * This function updates the position and velocity of a body in a simulation, checks for collisions
     * with other bodies, and applies forces to the body.
     * @param bodyList - An array of Body objects that this function will interact with.
     */
    update(bodyList)
    {
        if(!this.fixed)
        {
            bodyList.forEach(body => {
                if(body == this) return;
                if(p5.Vector.dist(this.position, body.position) < body.radius)
                {
                    if (body.disabled || this.disabled || body.fixed) return;
                    this.position = p5.Vector.add(this.position, this.velocity);
                    this.fixed = true;
                    this.disabled = true;
                    body.absorbBody(this);
                    return;
                }
                let force = this.calcForce(body);
                this.applyForce(force);
            });

            if(this.position.x > width - this.radius || this.position.x < -width + this.radius)
            {
                this.velocity.x *= -1;
                this.position.x = this.position.x > 0 ? width - this.radius : -width + this.radius;
            }
            if(this.position.y > height - this.radius || this.position.y < -height + this.radius)
            {
                this.velocity.y *= -1;
                this.position.y = this.position.y > 0 ? height - this.radius : -height + this.radius;
            }

            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
        }
    }

    show()
    {
        if(this.disabled) return;
        fill(this.color);
        ellipse(this.position.x, this.position.y, this.radius, this.radius);
    }
}