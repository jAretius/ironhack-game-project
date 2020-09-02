class JoyRoide {

    constructor(canvas, ctx, gameCtx, FPS, highLine, gravityForce) {

        // Canvas
        this.canvas = canvas

        this.ctx = ctx

        this.gameCtx = gameCtx

        // Measurement
        this.position = {
            x: canvas.size.width / 5,
            y: this.canvas.baseLine,
            initialPosY: this.canvas.baseLine,
            maxPosY: highLine
        }

        this.size = {
            width: 100,
            height: 54,
            collisionWidth: undefined,
            collisionHeight: undefined
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

        this.gunFire = {

            position: {
                x: undefined,
                y: undefined,
                initialX: -7,
                initialY: 45
            },

            size: {
                width: 100,
                height: 54
            }

        }

        // Time
        this.FPS = FPS

        // Image
        this.image = {

            player: {
                imageInstance: undefined,
                imagePath: './images/player.png',
                rows: 2,
                rowIndex: 0,
                frames: 4,
                frameIndex: 0,
            },

            gunFire: {
                imageInstance: undefined,
                imagePath: './images/gunfire.png',
                frames: 4,
                frameIndex: 0,
            },

        }

        this.spriteChangeTime = .1
        this.bullets = []
        this.explodedBullets = []
        this.bulletShells = []
        this.fireFrequency = 5
        this.fireTime = 0

        this.init()

    }

    init() {

        // We instantiate the player image
        this.image.player.imageInstance = new Image()
        this.image.player.imageInstance.src = this.image.player.imagePath

        // We instantiate the gunfire image
        this.image.gunFire.imageInstance = new Image()
        this.image.gunFire.imageInstance.src = this.image.gunFire.imagePath

        // We set the gunfire size
        this.gunFire.position.y = this.position.y + this.gunFire.position.initialY
        this.gunFire.position.x = this.position.x + this.gunFire.position.initialX

        // Collision values
        this.size.collisionWidth = this.size.width / this.image.player.frames
        this.size.collisionHeight = this.size.height / this.image.player.rows

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

        this.gunFire.position.y = this.position.y + this.gunFire.position.initialY

    }

    shoot() {

        const newBullet = new Bullet(this.canvas, this.ctx, this.FPS, this.position)

        this.gameCtx.bullets.push(newBullet)
        //this.bullets.push(newBullet)

    }

}