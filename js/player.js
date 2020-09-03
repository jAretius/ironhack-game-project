class JoyRoide {

    constructor(canvas, ctx, gameCtx, FPS, highLine, gravityForce) {

        // Canvas
        this.canvas = canvas

        this.ctx = ctx

        this.gameCtx = gameCtx

        // Measurement
        this.position = {
            x: canvas.size.width / 5,
            y: this.canvas.baseLine,
            initialPosY: this.canvas.baseLine,
            maxPosY: highLine
        }

        this.size = {
            width: 100,
            height: 54,
            collisionWidth: undefined,
            collisionHeight: undefined
        }

        this.isTouchingFloor = true
        this.isTouchingRoof = false

        // Physics
        this.speedX = undefined
        this.speedY = 0
        this.shockingSpeedY = 5
        this.initialSpeedX = 7

        this.forces = {

            gravityForce: gravityForce,
            shootingForce: 0.8,
            totalForce: this.gravityForce

        }

        this.isShooting = false

        this.gunFire = {

            position: {
                x: undefined,
                y: undefined,
                initialX: -7,
                initialY: 45,
                deadBaseLine: undefined
            },

            size: {
                width: 100,
                height: 54
            }

        }

        this.isShocking = false

        this.isDead = false

        // Time
        this.FPS = FPS

        // Image
        this.image = {

            player: {
                imageInstance: undefined,
                imagePath: './images/player.png',
                rows: 2,
                rowIndex: 0,
                frames: 4,
                frameIndex: 0,
            },

            gunFire: {
                imageInstance: undefined,
                imagePath: './images/gunfire.png',
                frames: 4,
                frameIndex: 0,
            },

            playerDead: {
                imageInstance: undefined,
                imagePath: './images/playerdead.png',
            },

            playerElectric: {
                imageInstance: undefined,
                imagePath: './images/electrocuted-player.png'
            }


        }

        this.spriteChangeTime = .1
        this.bullets = []
        this.explodedBullets = []
        this.bulletShells = []
        this.fireFrequency = 5
        this.fireTime = 0

        this.init()

    }

    init() {

        // We instantiate the player image
        this.image.player.imageInstance = new Image()
        this.image.player.imageInstance.src = this.image.player.imagePath

        // We instantiate the gunfire image
        this.image.gunFire.imageInstance = new Image()
        this.image.gunFire.imageInstance.src = this.image.gunFire.imagePath

        // We instantiate the playerdead image
        this.image.playerDead.imageInstance = new Image()
        this.image.playerDead.imageInstance.src = this.image.playerDead.imagePath

        // We instantiate the playerelectrocuted image
        this.image.playerElectric.imageInstance = new Image()
        this.image.playerElectric.imageInstance.src = this.image.playerElectric.imagePath

        // We set player speed
        this.speedX = this.initialSpeedX

        // We set the gunfire size
        this.gunFire.position.y = this.position.y + this.gunFire.position.initialY
        this.gunFire.position.x = this.position.x + this.gunFire.position.initialX

        // Collision values
        this.size.collisionWidth = this.size.width / this.image.player.frames
        this.size.collisionHeight = this.size.height / this.image.player.rows

        // Dead baseLine
        this.position.deadBaseLine = this.canvas.baseLine + 30

    }

    move() {

        // If is shocking
        if (this.isShocking) {

            this.speedX = 0
            return

        }

        // For sliding when is dead in the floor
        if (this.isDead && this.isTouchingFloor) {

            if (this.speedX <= 0) {

                this.speedX = 0

                this.gameCtx.gameOver()

            } else {

                this.speedX -= 0.1

            }


        }

        // If is shooting and is already touching the roof
        if (this.isShooting && this.isTouchingRoof) {

            this.position.y = this.position.maxPosY

        } else if (!this.isShooting && this.isTouchingFloor) {  // If is not shooting and already touching the floor

            if (!this.isDead) {

                this.position.y = this.position.initialPosY

            } else {

                this.position.deadBaseLine

            }

        } else {

            this.speedY = this.speedY + this.forces.totalForce
            this.position.y = this.position.y - this.speedY + (this.forces.totalForce) / 2

        }

        this.gunFire.position.y = this.position.y + this.gunFire.position.initialY

    }

    shoot() {

        const newBullet = new Bullet(this.canvas, this.ctx, this.FPS, this.position, this.gameCtx)
        this.gameCtx.bullets.push(newBullet)

        const newShell = new BulletShell(this.canvas, this.ctx, this.FPS, this.position, this.gameCtx)
        this.gameCtx.bulletShells.push(newShell)

    }

    shock() {

        this.gameCtx.audio.tracks.electricitySong.play()

        this.isShocking = true

        setTimeout(() => {

            //this.speedY = this.shockingSpeedY

            this.isShocking = false
            this.speedX = this.initialSpeedX
            this.speedY = this.shockingSpeedY

            this.die()

        }, 200)

    }

    die() {

        this.isShooting = false

        this.isDead = true

        this.forces.totalForce = 0 - this.forces.gravityForce

        this.gameCtx.audio.tracks.shotsSong.pause()

    }

}