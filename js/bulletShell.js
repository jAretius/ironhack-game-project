class BulletShell {

    constructor(canvas, ctx, FPS, playerPos, gameCtx) {

        this.canvas = canvas
        this.ctx = ctx
        this.gameCtx = gameCtx

        this.position = {
            x: playerPos.x + 14, // hay que modificar
            y: playerPos.y + 20
        }

        this.size = {
            width: 10, // hay que modificarlo
            height: 15 // y este
        }

        this.speedY = 1.09

        this.FPS = FPS

        this.image = {

            imageInstance: undefined,
            imageSource: './images/bulletShell.png',
            frames: 8,
            frameIndex: 0,
            spriteChangeTime: .05
        }

        this.init()
    }

    init() {

        this.image.imageInstance = new Image()
        this.image.imageInstance.src = this.image.imageSource
    }

    move(playerPosX) {

        this.position.x -= playerPosX
        this.position.y *= this.speedY

    }


}