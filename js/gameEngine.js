const Game = {

    // Metadata
    name: 'JetPack Joyride',
    author: 'Sergio Baltanás & Jon Arechalde',
    version: '1.0.0',
    license: undefined,
    description: 'Go through the longest distance you can',

    // Canvas
    canvas: {

        size: {
            width: 900,
            height: 500
        },
        baseLine: - 120,
        highLine: 66,

        obejectInDOM: undefined

    },
    ctx: undefined,

    // Time
    time: {

        FPS: 60,
        framesCount: 0

    },

    // Physics
    gravityForce: -2,

    // Controls
    keys: {

        SPACE: 32,
        UP: 38

    },

    // Game elements
    player: undefined,
    bullets: [],
    bulletShells: [],

    walkers: [],
    rockets: [],
    obstacles: [],
    lasers: [],

    coins: [],

    background: {
        left: undefined,
        right: undefined
    },

    // Game points system
    distanceDone: {

        position: {
            x: 0,
            y: 0
        },
        value: 0

    },

    coins: {

        position: {
            x: 0,
            y: 0
        },
        value: 0

    },


    //----- INITIALIZE METHODS -----    

    init() {

        this.setCanvasDimensions()

        this.ctx = this.canvas.obejectInDOM.getContext('2d')

        // We create the player
        this.player = new JoyRoide(this.canvas, this.ctx, this.time.FPS, this.canvas.baseLine, this.canvas.highLine, this.gravityForce)

        // We create background instances
        this.background.left = new Background(this.canvas, this.ctx, 0, this.time.FPS, this.player.speed)
        this.background.right = new Background(this.canvas, this.ctx, this.canvas.size.width, this.time.FPS, this.player.speed)

        // We set the event listeners
        this.setEventHandlers()

    },

    setCanvasDimensions() {

        this.canvas.obejectInDOM = document.querySelector('#my-canvas')
        this.canvas.obejectInDOM.width = this.canvas.size.width
        this.canvas.obejectInDOM.height = this.canvas.size.height

        this.canvas.baseLine = this.canvas.size.height + this.canvas.baseLine


    },

    reset() {

    },


    //----- GAME START METHODS -----

    start() {

        this.createFrame()

    },


    //----- GAME ENGINE -----

    createFrame() {

        setInterval(() => {

            // Check collisions
            this.checkAllCollisions()

            // Move game elements
            this.moveAll()
            this.clearAll()

            // We change the sprite

            if (this.player.isTouchingFloor) {

                if (this.time.framesCount % (this.time.FPS * this.player.runSpriteTime) === 0) {

                    if (this.player.floorImageInstance.frameIndex === 0) {

                        this.player.floorImageInstance.frameIndex = 1

                    } else {

                        this.player.floorImageInstance.frameIndex = 0

                    }

                }

            }


            // We draw all
            this.drawAll()

            // We update the frames count
            this.time.framesCount++

            if (this.time.framesCount === 5000) {

                this.time.framesCount = 0

            }

        }, 1000 / this.time.FPS)

    },


    //----- CREATORS -----

    createEnemies() {

    },

    deleteOutsiders() {

    },


    //----- CHECKERS -----

    checkAllCollisions() {

        this.playerCollision()

    },

    playerCollision() {

        // Floor collision
        if (this.player.position.y >= this.canvas.baseLine) {

            this.player.isTouchingFloor = true

        } else {

            this.player.isTouchingFloor = false

            // Roof collision
            if (this.player.position.y <= this.canvas.highLine) {

                this.player.isTouchingRoof = true

            } else {

                this.player.isTouchingRoof = false

            }

        }

    },

    bulletsCollision() {

    },


    //----- MOTION METHODS -----    

    moveAll() {

        this.moveBackground()

        this.movePlayer()

    },

    moveBackground() {

        // If the left image is out from the canvas
        if (this.background.right.position.x <= 0) {

            this.background.left.position.x = this.background.right.position.x
            this.background.right.position.x += this.canvas.size.width

        }

        this.background.left.move()
        this.background.right.move()

    },

    moveEnemies() {

    },

    movePlayer() {

        this.player.move()

    },


    //----- RENDERING IMAGE-----

    clearAll() {

        this.ctx.clearRect(0, 0, this.canvas.size.width, this.canvas.size.height)

    },

    drawAll() {

        this.drawBackgrond()
        this.drawPlayer()

    },

    drawInit() {

        this.drawBackgrond()
        this.drawPlayer()

    },

    drawBackgrond() {


        this.ctx.drawImage(this.background.left.imageInstance, this.background.left.position.x, 0, this.canvas.size.width, this.canvas.size.height)
        this.ctx.drawImage(this.background.right.imageInstance, this.background.right.position.x, 0, this.canvas.size.width, this.canvas.size.height)

    },

    drawEnemies() {

    },

    drawPlayer() {

        // If is touching floor
        if (this.player.isTouchingFloor) {

            this.ctx.drawImage(
                this.player.floorImageInstance,
                this.player.floorImageInstance.frameIndex * Math.floor(this.player.floorImageInstance.width / this.player.floorImageInstance.frames),
                0,
                Math.floor(this.player.floorImageInstance.width / this.player.floorImageInstance.frames),
                this.player.floorImageInstance.height,
                this.player.position.x,
                this.player.position.y,
                (this.player.size.width * 2) / this.player.floorImageInstance.frames,
                this.player.size.height
            )

        } else {    // If is not touching floor

            this.ctx.drawImage(
                this.player.shootingImageInstance,
                this.player.position.x,
                this.player.position.y,
                this.player.size.width,
                this.player.size.height
            )

        }

        // If is touching floor


    },


    //----- GAME OVER -----

    gameOver() {

    },

    //----- EVENT HANDLERS -----

    setEventHandlers() {

        // Controls
        window.onkeypress = (e) => {

            if (e.keyCode === this.keys.SPACE) {

                this.player.isShooting = true

            }

        }

        window.onkeyup = (e) => {

            if (e.keyCode === this.keys.SPACE) {

                this.player.isShooting = false

            }

        }

        // Image loading
        this.background.left.imageInstance.onload = () => {

            this.drawBackgrond()

        }

        //this.background.left.imageInstance.addEventListener('load', this.drawInit())

        this.player.floorImageInstance.onload = () => {

            setTimeout(() => {

                this.drawPlayer()

            }, 100)

        }

    },
}