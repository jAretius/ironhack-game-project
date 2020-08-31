class Bullet {

    constructor(canvas, ctx, FPS, playerPos) {

        this.canvas = canvas
        this.ctx = ctx

        this.position = {
            x: playerPos.x + 16,
            y: playerPos.y
        }

        this.speed = 30

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

    move() {

        this.position.y += this.speed

    }

    explode(player, index) {

        // Change the sprite
        this.isExploding = true

    }

}