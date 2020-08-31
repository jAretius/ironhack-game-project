class Coin {
    constructor(canvas, ctx, FPS, positionX, positionY) {

        this.canvas = canvas
        this.ctx = ctx

        this.position = {
            x: positionX,
            y: positionY
        }

        this.size = {
            width: 25,
            height: 25
        }

        this.speed = 1

        this.FPS = FPS

        this.image = {

            imageInstance: undefined,
            imageSource: './images/Coins.png',
            frames: 8,
            frameIndex: 0
        }

        this.flipCoinTime = .1

        this.init()

    }

    init() {

        // Image for the coins
        this.image.imageInstance = new Image()
        this.image.imageInstance.src = this.image.imageSource

    }

    move() {

        this.position.x -= this.speed

    }

}