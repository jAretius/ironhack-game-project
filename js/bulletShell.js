class BulletShell {

    constructor(canvas, ctx, FPS, playerPos, gameCtx) {

        this.canvas = canvas
        this.ctx = ctx
        this.gameCtx = gameCtx

        this.position = {
            x: playerPos.x + 14, // hay que modificar
            y: playerPos.y
        }

        this.speed = 20

        this.FPS = FPS

        this.image = {

            imageInstance: undefined,
            imageSource: './images/bulletShell.png',

            size: {
                width: 10, // hay que modificarlo
                height: 70 // y este
            }
        }

        this.init()
    }

    init() {

        this.image.imageInstance = new Image()
        this.image.imageInstance.src = this.image.imageSource


        this.move()
    }

    move() { }


}