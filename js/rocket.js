class Rocket { }

class Warning {

    constructor(canvas, ctx, playerPosY, gameContext) {

        this.canvas = canvas
        this.ctx = ctx
        this.gameContext = gameContext

        this.position = {
            x: canvas.size.width - 60,
            y: playerPosY
        }

        this.size = {
            width: 50,
            height: 50
        }

        this.image = {
            imageInstance: undefined,
            imagePath: './images/rocket-warning.png',
            frames: 2,
            frameIndex: 0
        }

        this.isAboutToShoot = false

        this.init()

    }

    init() {

        this.image.imageInstance = new Image()
        this.image.imageInstance.src = this.image.imagePath

        this.changeSprite()

    }

    move(playerPosY) {

        if (!this.isAboutToShoot) {

            this.position.y = playerPosY

        }

    }

    changeSprite() {

        setTimeout(() => {

            this.image.frameIndex = 1
            this.isAboutToShoot = true
            this.shootRocket()

        }, 3000)

    }

    shootRocket() {

        setTimeout(() => {

            this.gameContext.createRocket(this)

        }, 1000);

    }


}