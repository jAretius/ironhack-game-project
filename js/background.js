class Background {

    constructor(canvas, ctx, initialPosX, FPS, backgroundType = 'main') {

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

        this.imagePathMain = './images/bg.jpg'

        this.imagePathInitial = './images/initial-background.png'

        this.imagePathGameOver = './images/game-over.jpg'

        this.backgroundType = backgroundType

        this.init()

    }

    init() {

        this.imageInstance = new Image()

        switch (this.backgroundType) {
            case 'main':

                this.imageInstance.src = this.imagePathMain

                break;

            case 'initial':

                this.imageInstance.src = this.imagePathInitial

                break;

            case 'gameOver':

                this.imageInstance.src = this.imagePathGameOver

                break;

            default:
                break;
        }

    }

    move(playerSpeed) {

        const compesatedSpeed = ((60 / this.FPS) * playerSpeed)

        this.position.x -= compesatedSpeed
    }

}