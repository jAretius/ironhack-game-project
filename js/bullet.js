class Bullet {

    constructor(canvas, ctx, FPS, playerPos) {

        this.canvas = canvas
        this.ctx = ctx

        this.position = {
            x: playerPos.x + 16,
            y: playerPos.y
        }

        this.speed = 20

        this.FPS = FPS

        this.image = {

            shoot: {
                imageInstance: undefined,
                imageSource: './images/bullet.png',

                size: {
                    width: 10,
                    height: 70
                }
            },

            explosion: {
                imageInstance: undefined,
                imageSource: './images/bullet-impact.png',

                size: {
                    width: 70,
                    height: 30
                }
            },

        }

        this.isExploding = false

        this.init()

    }

    init() {

        // Image for the shoot
        this.image.shoot.imageInstance = new Image()
        this.image.shoot.imageInstance.src = this.image.shoot.imageSource

        // Image for the bullet impact
        this.image.explosion.imageInstance = new Image()
        this.image.explosion.imageInstance.src = this.image.explosion.imageSource

        // We set the current image
        this.image.current = this.image.shoot.imageInstance

        // We move it
        this.move()

    }

    move(playerSpeed) {

        if (!this.isExploding) {

            this.position.y += this.speed

        } else {

            const compesatedSpeed = ((60 / this.FPS) * playerSpeed)

            this.position.x -= compesatedSpeed

        }


    }

    explode() {

        // Change the sprite
        this.isExploding = true

        this.position.y += Math.random() * (35 - 25) + 25
        this.position.x += Math.random() * (5 + 5) - 5

    }

}