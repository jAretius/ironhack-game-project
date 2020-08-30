class Bullet {

    constructor(canvas, ctx, FPS, playerPos) {

        this.canvas = canvas
        this.ctx = ctx

        this.position = {
            x: playerPos.x + 16,
            y: playerPos.y
        }

        this.size = {
            width: 10,
            height: 70
        }

        this.speed = 30

        this.FPS = FPS

        this.image = {

            shoot: {
                imageInstance: undefined,
                imageSource: './images/bullet.png'
            },

            explosion: {
                imageInstance: undefined,
                imageSource: undefined
            }

        }

        this.init()

    }

    init() {

        // Image for the shoot
        this.image.shoot.imageInstance = new Image()
        this.image.shoot.imageInstance.src = this.image.shoot.imageSource

        // We move it
        this.move()

    }

    move() {

        this.position.y += this.speed

    }

    explode() {

        // Change the sprite

    }

}