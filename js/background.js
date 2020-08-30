class Background {

    constructor(canvas, ctx, initialPosX, FPS, playerSpeed) {

        this.ctx = ctx

        this.position = {
            x: initialPosX,
            y: 0
        }

        this.size = {
            width: canvas.size.width,
            height: canvas.size.height
        }

        this.playerSpeed = playerSpeed

        this.FPS = FPS

        this.imageInstance = undefined

        this.imagePath = './images/bg.jpg'

        this.init()

    }

    init() {

        this.imageInstance = new Image()

        this.imageInstance.src = this.imagePath

    }

    move() {

        const compesatedSpeed = ((60 / this.FPS) * this.playerSpeed)

        this.position.x -= compesatedSpeed
    }

}