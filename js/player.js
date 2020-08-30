class JoyRoide {

    constructor(canvas, ctx, FPS, baseLine) {

        // Canvas
        this.canvas = canvas

        this.ctx = ctx

        // Measurement
        this.position = {
            x: canvas.size.width / 5,
            y: canvas.size.height + baseLine
        }

        this.size = {
            width: 110,
            height: 60
        }

        // Forces
        this.speed = 7

        this.gravityForce = 0.4
        this.shootingForce = 0.7

        this.isShooting = false

        // Time
        this.FPS = FPS

        // Image
        this.imageInstance = undefined

        this.imagePath = './images/player-walking.png'

        this.init()

    }

    init() {

        this.imageInstance = new Image()
        this.imageInstance.src = this.imagePath

        this.imageInstance.frames = 2
        this.imageInstance.frameIndex = 0

    }

    moveJoy() {



    }

}