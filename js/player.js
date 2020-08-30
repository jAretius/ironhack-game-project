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
            width: 55,
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
        this.floorImageInstance = undefined

        this.floorImagePath = './images/player-walking.png'

        this.shootingImageInstance = undefined

        this.shootingImagePath = './images/player-flying.png'

        this.runSpriteTime = .1

        this.init()

    }

    init() {

        this.floorImageInstance = new Image()
        this.floorImageInstance.src = this.floorImagePath

        this.floorImageInstance.frames = 2
        this.floorImageInstance.frameIndex = 0

        this.shootingImageInstance = new Image()
        this.shootingImageInstance.src = this.shootingImagePath

    }

    move() {

        // If is shooting
        if (this.isShooting) {

            // Is it already touching the roof?
            if (this.isTouchingRoof) {

                this.position.y = this.position.maxPosY

            } else {

                this.position.y -= this.shootingForce

            }


        } else {    // If is not shooting

            // Is it already touching the floor?
            if (this.isTouchingFloor) {

                this.position.y = this.position.initialPosY

            } else {

                this.position.y -= this.gravityForce

            }


        }

    }

}