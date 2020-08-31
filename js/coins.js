class Coin {
    constructor(canvas, ctx, FPS, positionX, positionY, index) {

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

        this.speed = 7

        this.FPS = FPS

        this.image = {

            imageInstance: undefined,
            imageSource: './images/Coins.png',
            frames: 8,
            frameIndex: index
        }

        this.flipCoinTime = .1

        this.init()

    }

    init() {

        // Image for the coins
        this.image.imageInstance = new Image()
        this.image.imageInstance.src = this.image.imageSource

        // Asign frameIndex value
        this.image.frameIndex -= Math.floor(this.image.frameIndex + 1 / this.image.frames)

    }

    move(playerSpeed) {

        const compensatedSpeed = ((60 / this.FPS) * playerSpeed)

        this.position.x -= compensatedSpeed

    }

}