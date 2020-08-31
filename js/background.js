class Background {

    constructor(canvas, ctx, initialPosX, FPS) {

        this.ctx = ctx

        this.position = {
            x: initialPosX,
            y: 0
        }

        this.size = {
            width: canvas.size.width,
            height: canvas.size.height
        }

        this.FPS = FPS

        this.imageInstance = undefined

        this.imagePath = './images/bg.jpg'

        this.init()

    }

    init() {

        this.imageInstance = new Image()

        this.imageInstance.src = this.imagePath

    }

    move(playerSpeed) {

        const compesatedSpeed = ((60 / this.FPS) * playerSpeed)

        this.position.x -= compesatedSpeed
    }

}