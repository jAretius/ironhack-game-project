class JoyRoide {

    constructor(canvas, ctx, FPS, highLine, gravityForce) {

        // Canvas
        this.canvas = canvas

        this.ctx = ctx

        // Measurement
        this.position = {
            x: canvas.size.width / 5,
            y: this.canvas.baseLine,
            initialPosY: this.canvas.baseLine,
            maxPosY: highLine
        }

        this.size = {
            width: 48,
            height: 54
        }

        this.isTouchingFloor = true
        this.isTouchingRoof = false

        // Physics
        this.speedX = 7
        this.speedY = 0

        this.forces = {

            gravityForce: gravityForce,
            shootingForce: 0.6,
            totalForce: this.gravityForce

        }

        this.isShooting = false

        // Time
        this.FPS = FPS

        // Image
        this.image = {

            floor: {
                imageInstance: undefined,
                imagePath: './images/player-walking.png',
                frames: 2,
                frameIndex: 0
            },

            flying: {
                imageInstance: undefined,
                imagePath: './images/player-flying.png'
            },

            flyingShooting: {
                imageInstance: undefined,
                imagePath: './images/player-flying-shooting.png'
            }

        }

        this.runSpriteTime = .1

        this.bullets = []
        this.explodedBullets = []
        this.bulletShells = []
        this.fireFrequency = 5
        this.fireTime = 0

        this.init()

    }

    init() {

        // We instantiate floor image
        this.image.floor.imageInstance = new Image()
        this.image.floor.imageInstance.src = this.image.floor.imagePath

        // We instantiate flying image
        this.image.flying.imageInstance = new Image()
        this.image.flying.imageInstance.src = this.image.flying.imagePath

        // We instantiate flying shooting
        this.image.flyingShooting.imageInstance = new Image()
        this.image.flyingShooting.imageInstance.src = this.image.flyingShooting.imagePath

    }

    move() {


        // If is shooting
        if (this.isShooting) {

            // Is it already touching the roof?
            if (this.isTouchingRoof) {

                this.position.y = this.position.maxPosY

            } else {

                //this.position.y -= this.forces.shootingForce

                // We update the velocity
                this.speedY = this.speedY + (0.5)
                this.position.y = this.position.y - this.speedY + (this.forces.totalForce) / 2

            }


        } else {    // If is not shooting

            // Is it already touching the floor?
            if (this.isTouchingFloor) {

                this.position.y = this.position.initialPosY

            } else {

                this.speedY = this.speedY + (-0.3)
                this.position.y = this.position.y - this.speedY + (this.forces.totalForce) / 2

            }

        }

    }

    shoot() {

        const newBullet = new Bullet(this.canvas, this.ctx, this.FPS, this.position)
        this.bullets.push(newBullet)

    }

}