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
        framesCount: 0,
        isFirstFrame: true

    },

    // Physics
    gravityForce: 0.2,

    // Controls
    keys: {

        SPACE: 32,
        UP: 38

    },

    // Game elements
    player: undefined,

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

    coins: [],

    coinsRowAmount: 10,

    coinsCreationTime: 3,  // Seconds

    collectedCoins: 0,


    //----- INITIALIZE METHODS -----    

    init() {

        this.setCanvasDimensions()

        this.ctx = this.canvas.obejectInDOM.getContext('2d')

        // We create the player
        this.player = new JoyRoide(this.canvas, this.ctx, this.time.FPS, this.canvas.highLine, this.gravityForce)

        // We create background instances
        this.background.left = new Background(this.canvas, this.ctx, 0, this.time.FPS)
        this.background.right = new Background(this.canvas, this.ctx, this.canvas.size.width, this.time.FPS)

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

            // We create coins every 10 secs
            if (!this.time.isFirstFrame && this.time.framesCount % (this.coinsCreationTime * this.time.FPS) === 0) {

                this.createCoins()

            }


            // Player shooting
            if (this.player.isShooting && this.player.fireTime % this.player.fireFrequency === 0) {

                this.player.shoot()

            }

            this.moveAll()

            // Check collisions
            this.checkAllCollisions()

            this.checkSpritesChange()

            // Move game elements
            this.clearAll()

            // We draw all
            this.drawAll()

            // We update the counters

            // Frames counter
            this.time.framesCount++

            // Shooting time counter
            if (this.player.isShooting) {

                this.player.fireTime++

            }

            // Frames count reseter
            if (this.time.framesCount === 6000) {

                this.time.framesCount = 0

            }

            this.time.isFirstFrame = false

        }, 1000 / this.time.FPS)

    },


    //----- CREATORS -----

    createEnemies() {

    },

    deleteOutsiders() {

    },

    createCoins() {

        for (let i = 0; i < this.coinsRowAmount; i++) {

            const newCoin = new Coin(this.canvas, this.ctx, this.time.FPS, this.canvas.size.width + 25 * i, (this.canvas.size.height / 2 + (i * 4)) - 50, i)

            this.coins.push(newCoin)

        }

    },


    //----- CHECKERS -----

    checkAllCollisions() {

        this.playerCollision()

        if (this.player.bullets.length) {

            this.bulletsCollision()

        }

        this.checkCoinsOut()

    },

    playerCollision() {

        // Floor collision
        if (this.player.position.y >= this.canvas.baseLine) {

            this.player.isTouchingFloor = true
            this.player.position.y = this.canvas.baseLine
            this.player.speedY = 0

        } else {

            this.player.isTouchingFloor = false

            // Roof collision
            if (this.player.position.y <= this.canvas.highLine) {

                this.player.isTouchingRoof = true
                this.player.position.y = this.canvas.highLine
                this.player.speedY = 0

            } else {

                this.player.isTouchingRoof = false

            }

        }

        // Coins collision
        const playerPosX = this.player.position.x
        const playerPosY = this.player.position.y
        const playerWidth = this.player.size.width
        const playerHeight = this.player.size.height

        this.coins.forEach((elm => {

            var rect1 = { x: 5, y: 5, width: 50, height: 50 }
            var rect2 = { x: 20, y: 10, width: 10, height: 10 }

            const coinPosX = elm.position.x
            const coinPosY = elm.position.y
            const coinWidth = elm.size.width
            const coinHeight = elm.size.height


            // We check if is invading the coin area
            if (playerPosX < coinPosX + coinWidth &&
                playerPosX + playerWidth > coinPosX &&
                playerPosY < coinPosY + coinHeight &&
                playerPosY + playerHeight > coinPosY) {


                // We delete the coin
                this.coins.splice(this.coins.indexOf(elm), 1)

                // We add a point
                this.collectedCoins++
                console.log(this.collectedCoins)
            }

        }))



    },

    bulletsCollision() {

        this.player.bullets.forEach(elm => {

            // If it touches the floor
            if (elm.position.y >= this.canvas.baseLine) {

                const index = this.player.bullets.indexOf(elm)

                elm.explode()

            }

        })

    },

    checkCoinsOut() {

        if (this.coins.length) {

            this.coins.forEach(elm => {

                if (elm.position.x + elm.size.width <= 0) {

                    const index = this.coins.indexOf(elm)

                    this.coins.splice(index, 1)

                }

            })

        }

    },

    checkSpritesChange() {

        // We change the running sprite
        if (this.player.isTouchingFloor) {

            if (this.time.framesCount % (this.time.FPS * this.player.runSpriteTime) === 0) {

                if (this.player.image.floor.frameIndex === 0) {

                    this.player.image.floor.frameIndex = 1

                } else {

                    this.player.image.floor.frameIndex = 0

                }

            }

        }

        // we change the sprite Coins
        if (this.coins.length) {

            if (this.time.framesCount % (this.time.FPS * this.coins[0].flipCoinTime) === 0) {

                this.coins.forEach(elm => {

                    const index = this.coins.indexOf(elm)

                    switch (this.coins[index].image.frameIndex) {
                        case 0:
                            this.coins[index].image.frameIndex = 1
                            break;
                        case 1:
                            this.coins[index].image.frameIndex = 2
                            break;
                        case 2:
                            this.coins[index].image.frameIndex = 3
                            break;
                        case 3:
                            this.coins[index].image.frameIndex = 4
                            break;
                        case 4:
                            this.coins[index].image.frameIndex = 5
                            break;
                        case 5:
                            this.coins[index].image.frameIndex = 6
                            break;
                        case 6:
                            this.coins[index].image.frameIndex = 7
                            break;
                        case 7:
                            this.coins[index].image.frameIndex = 0
                            break;

                        default:
                            break;
                    }



                })
            }
        }

    },


    //----- MOTION METHODS -----    

    moveAll() {

        this.moveBackground()

        this.movePlayer()

        // We move the bullets
        if (this.player.bullets.length) {

            this.moveBullets()

        }

        // We move the coins
        this.moveCoins()

    },

    moveBackground() {

        // If the left image is out from the canvas
        if (this.background.right.position.x <= 0) {

            this.background.left.position.x = this.background.right.position.x
            this.background.right.position.x += this.canvas.size.width

        }

        this.background.left.move(this.player.speedX)
        this.background.right.move(this.player.speedX)

    },

    moveEnemies() {

    },

    movePlayer() {

        this.player.move(this.player.speedX)

    },

    moveBullets() {

        this.player.bullets.forEach((elm) => {

            elm.move()

        })

    },

    moveCoins() {

        this.coins.forEach(elm => {

            elm.move(this.player.speedX)

        })

    },


    //----- RENDERING IMAGE-----

    clearAll() {

        this.ctx.clearRect(0, 0, this.canvas.size.width, this.canvas.size.height)

    },

    drawAll() {

        this.drawBackgrond()
        this.drawPlayer()
        this.drawBullets()
        this.drawCoins()

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
                this.player.image.floor.imageInstance,
                this.player.image.floor.frameIndex * Math.floor(this.player.image.floor.imageInstance.width / this.player.image.floor.frames),
                0,
                Math.floor(this.player.image.floor.imageInstance.width / this.player.image.floor.frames),
                this.player.image.floor.imageInstance.height,
                this.player.position.x,
                this.player.position.y,
                (this.player.size.width * 2) / this.player.image.floor.frames,
                this.player.size.height
            )

        } else {    // If is not touching floor

            // If is shooting
            if (this.player.isShooting) {

                this.ctx.drawImage(
                    this.player.image.flyingShooting.imageInstance,
                    this.player.position.x,
                    this.player.position.y,
                    this.player.size.width,
                    this.player.size.height + 26
                )

            } else {    // If is not shooting

                this.ctx.drawImage(
                    this.player.image.flying.imageInstance,
                    this.player.position.x,
                    this.player.position.y,
                    this.player.size.width,
                    this.player.size.height
                )

            }

        }

        // If is touching floor


    },

    drawBullets() {

        // If there is some bullet in the array
        if (this.player.bullets.length) {

            this.player.bullets.forEach(elm => {

                if (!elm.isExploding) {

                    this.ctx.drawImage(elm.image.shoot.imageInstance, elm.position.x, elm.position.y, elm.image.shoot.size.width, elm.image.shoot.size.height)

                } else {

                    this.ctx.drawImage(elm.image.explosion.imageInstance, elm.position.x - 25, elm.position.y + 10, elm.image.explosion.size.width, elm.image.explosion.size.height)

                    const index = this.player.bullets.indexOf(elm)

                    this.player.bullets.splice(index, 1)

                }


            })
        }
    },

    drawCoins() {

        this.coins.forEach(elm => {

            this.ctx.drawImage(
                elm.image.imageInstance,
                elm.image.frameIndex * Math.floor(elm.image.imageInstance.width / elm.image.frames),
                0,
                Math.floor(elm.image.imageInstance.width / elm.image.frames),
                elm.image.imageInstance.height,
                elm.position.x,
                elm.position.y,
                elm.size.width,
                elm.size.height)

        })


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
                this.player.forces.totalForce = this.player.forces.shootingForce - this.gravityForce

            }

        }

        window.onkeyup = (e) => {

            if (e.keyCode === this.keys.SPACE) {

                this.player.isShooting = false
                this.player.forces.totalForce = 0 - this.player.forces.gravityForce

            }

            this.player.fireTime = 0

        }

        // Image loading
        this.background.left.imageInstance.onload = () => {

            this.drawBackgrond()

        }

        this.player.image.floor.imageInstance.onload = () => {

            setTimeout(() => {

                this.drawPlayer()

            }, 100)

        }

    },
}