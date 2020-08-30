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
        baseLine: -120,

        obejectInDOM: undefined

    },
    ctx: undefined,

    // Time
    time: {

        FPS: 60,
        framesCount: 0

    },

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
        this.player = new JoyRoide(this.canvas, this.ctx, this.time.FPS, this.canvas.baseLine)

        // We create background instances
        this.background.left = new Background(this.canvas, this.ctx, 0, this.time.FPS, this.player.speed)
        this.background.right = new Background(this.canvas, this.ctx, this.canvas.size.width, this.time.FPS, this.player.speed)

        console.log(this.background.left.imageInstance)

        // We set the event listeners
        this.setEventHandlers()

    },

    setCanvasDimensions() {

        this.canvas.obejectInDOM = document.querySelector('#my-canvas')
        this.canvas.obejectInDOM.width = this.canvas.size.width
        this.canvas.obejectInDOM.height = this.canvas.size.height

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

            this.moveAll()
            this.clearAll()
            this.drawAll()

        }, 1000 / this.time.FPS)

    },


    //----- CREATORS -----

    createEnemies() {

    },

    deleteOutsiders() {

    },


    //----- MOTION METHODS -----    

    moveAll() {

        this.moveBackground()

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

    },


    //----- CHECKERS -----

    checkCollisions() {

    },

    playerCollision() {

    },

    bulletsCollision() {

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

        this.ctx.drawImage(
            this.player.imageInstance,
            this.player.imageInstance.frameIndex * Math.floor(this.player.imageInstance.width / this.player.imageInstance.frames),
            0,
            Math.floor(this.player.imageInstance.width / this.player.imageInstance.frames),
            this.player.imageInstance.height,
            this.player.position.x,
            this.player.position.y,
            this.player.size.width / this.player.imageInstance.frames,
            this.player.size.height
        )

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

        this.player.imageInstance.onload = () => {

            setTimeout(() => {

                this.drawPlayer()

            }, 100)

        }

    },
}