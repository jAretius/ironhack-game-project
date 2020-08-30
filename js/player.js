class JoyRoide {

    constructor(canvas, ctx, FPS, baseLine, highLine, gravityForce) {

        // Canvas
        this.canvas = canvas

        this.ctx = ctx

        // Measurement
        this.position = {
            x: canvas.size.width / 5,
            y: baseLine,
            initialPosY: baseLine,
            maxPosY: highLine
        }

        this.size = {
            width: 110,
            height: 60
        }

        this.isTouchingFloor = true
        this.isTouchingRoof = false

        // Forces
        this.speed = 7

        this.gravityForce = gravityForce
        this.shootingForce = 3

        this.isShooting = false

        // Time
        this.FPS = FPS

        // Image
        this.imageInstance = undefined

        this.imagePath = './images/player-walking.png'

        this.runSpriteTime = .1

        this.init()

    }

    init() {

        this.imageInstance = new Image()
        this.imageInstance.src = this.imagePath

        this.imageInstance.frames = 2
        this.imageInstance.frameIndex = 0

    }

    move() {

        if (this.isShooting) {

            if (this.isTouchingRoof) {

                this.position.y = this.position.maxPosY

            } else {

                this.position.y -= this.shootingForce

            }


        } else {

            if (this.isTouchingFloor) {

                this.position.y = this.position.initialPosY

            } else {

                this.position.y -= this.gravityForce

            }


        }

    }

}