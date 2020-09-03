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

    isLoading: false,

    gameEngineInterval: undefined,

    // Time
    time: {

        FPS: 60,
        framesCount: 0,
        isFirstFrame: true

    },

    // Physics
    gravityForce: 0.3,

    // Controls
    keys: {

        SPACE: 32,
        UP: 38

    },

    // Creation timeouts
    timeOuts: {

        rockets: undefined,
        coins: undefined,
        walkers: undefined,
        obstacles: undefined

    },

    // Game elements
    player: undefined,

    bullets: [],
    explodedBullets: [],
    bulletShells: [],

    walkersBack: [],
    walkersFront: [],
    walkersRandomTime: {
        minTime: undefined,
        maxTime: undefined,
        minInicial: .01,
        maxInicial: .3
    },

    rocketWarnings: [],
    rockets: [],
    rocketsRandomTime: {
        minTime: undefined,
        maxTime: undefined,
        minInicial: 3,
        maxInicial: 10
    },

    obstacles: [],
    obstaclesCreationTime: 4,
    obstaclesRandomTime: {

        minTime: undefined,
        maxTime: undefined,
        minInicial: .7,
        maxInicial: 3

    },

    lasers: [],

    coins: [],
    coinsRowAmount: 10,
    coinsCreationTime: 5,  // Seconds
    coinsRandomTime: {

        minTime: undefined,
        maxTime: undefined,
        minInicial: 1,
        maxInicial: 4,

    },

    speedPowerUp: undefined,

    background: {
        left: undefined,
        right: undefined,
        initial: undefined,
        gameOver: undefined
    },

    // Game points system   

    collectedCoins: 0,

    distanceDone: 0,

    audio: {

        tracks: {

            breakWallSong: new Audio('./audio/break-wall.mp3'),
            mainSong: new Audio('./audio/jetpack-main.wav'),
            runFloorSong: new Audio('./audio/runfloor.mp3'),
            shotsSong: new Audio('./audio/shooting.mp3'),
            coinsSong: new Audio('./audio/coins.mp3'),
            warningSong: new Audio('./audio/warning.mp3'),
            rocketSong: new Audio('./audio/rocket.mp3'),
            electricitySong: new Audio('./audio/zag.mp3')
        },

        overallVolume: .15


    },

    isGameOver: false,


    //----- INITIALIZE METHODS -----    

    init() {

        this.setCanvasDimensions()

        this.ctx = this.canvas.obejectInDOM.getContext('2d')


        // We create the player
        this.player = new JoyRoide(this.canvas, this.ctx, this, this.time.FPS, this.canvas.highLine, this.gravityForce)

        // We create background instances
        this.background.left = new Background(this.canvas, this.ctx, 0, this.time.FPS)
        this.background.right = new Background(this.canvas, this.ctx, this.canvas.size.width, this.time.FPS)

        this.background.initial = new Background(this.canvas, this.ctx, 0, this.time.FPS, 'initial')

        this.background.gameOver = new Background(this.canvas, this.ctx, 0, this.time.FPS, 'gameOver')

        this.background.up = new Background(this.canvas, this.ctx, this.canvas.size.height, this.time.FPS, 'iron-up', this)
        this.background.down = new Background(this.canvas, this.ctx, this.canvas.size.height, this.time.FPS, 'iron-down', this)

        // Set random creation times
        this.walkersRandomTime.minTime = this.walkersRandomTime.minInicial  // Walkers
        this.walkersRandomTime.maxTime = this.walkersRandomTime.maxInicial

        this.rocketsRandomTime.minTime = this.rocketsRandomTime.minInicial  // Rockets
        this.rocketsRandomTime.maxTime = this.rocketsRandomTime.maxInicial

        this.obstaclesRandomTime.minTime = this.obstaclesRandomTime.minInicial  // Obstacles
        this.obstaclesRandomTime.maxTime = this.obstaclesRandomTime.maxInicial

        this.coinsRandomTime.minTime = this.coinsRandomTime.minInicial
        this.coinsRandomTime.maxTime = this.coinsRandomTime.maxInicial

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

        // We clear async behaviour
        clearInterval(this.gameEngineInterval)

        // We reset values
        this.isGameOver = false
        this.distanceDone = 0
        this.collectedCoins = 0
        this.player.isDead = false
        this.time.framesCount = 0

        this.player.speedX = this.player.initialSpeedX

    },


    //----- GAME START METHODS -----

    start() {

        this.loadingScreen()

        this.reset()

        this.initiateAudio()

        this.createFrame()

        setTimeout(() => {

            this.createCoins()

            this.createWarning()

            this.createObstacle()

            this.createWalker()

        }, 1500);

    },


    //----- GAME ENGINE -----

    createFrame() {


        this.gameEngineInterval = setInterval(() => {


            if (!this.isGameOver) {


                // Player shooting
                if (this.player.isShooting && this.player.fireTime % this.player.fireFrequency === 0) {

                    this.player.shoot()

                }

                // We calculate the new position of all the elements
                this.moveAll()

                // Check collisions
                this.checkAllCollisions()

                // Move game elements
                this.clearAll()

                // We draw all
                this.drawAll()

                // We add distance
                this.addDistance()

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


            } else {

                this.clearAll()
                this.drawGameOver()
                this.drawScore()

            }
        }, 1000 / this.time.FPS)

    },


    //----- CREATORS -----

    createCoins() {

        const randomShape = Math.floor(Math.random() * 3)
        let offSet = undefined

        let minPosY = undefined
        let maxPosY = undefined
        let randomPosY = undefined

        switch (randomShape) {
            case 0:

                offSet = 0
                minPosY = 70
                maxPosY = this.canvas.size.height - 95
                randomPosY = Math.floor(Math.random() * (maxPosY - minPosY)) + minPosY
                break;

            case 1:

                offSet = 7    // Coin row shape is a descending slope (LIMIT DOWN: canvas.height-160 | LIMIT UP: 70)  
                minPosY = 70
                maxPosY = this.canvas.size.height - 160
                randomPosY = Math.floor(Math.random() * (maxPosY - minPosY)) + minPosY
                break;

            case 2:

                offSet = -7     // Coin row shape is a ascending slope
                minPosY = 130
                maxPosY = this.canvas.size.height - 95
                randomPosY = Math.floor(Math.random() * (maxPosY - minPosY)) + minPosY
                break;

            default:
                break;
        }

        const randomValue = Math.random() * (this.coinsRandomTime.maxTime - this.coinsRandomTime.minTime) + this.coinsRandomTime.minTime

        this.timeOuts.coins = setTimeout(() => {

            for (let i = 0; i < this.coinsRowAmount; i++) {

                const newCoin = new Coin(this.canvas, this.ctx, this.time.FPS, this.canvas.size.width + 25 * i, (i * offSet) + randomPosY, i)

                this.coins.push(newCoin)

            }

            this.createCoins()

        }, randomValue * 1000)

    },

    destroyBullet(bulletToKill) {

        const index = this.explodedBullets.indexOf(bulletToKill)

        this.explodedBullets.splice(index, 1)

    },

    createWarning() {

        const randomValue = Math.random() * (this.rocketsRandomTime.maxTime - this.rocketsRandomTime.minTime) + this.rocketsRandomTime.minTime

        this.timeOuts.rockets = setTimeout(() => {

            this.rocketWarnings.push(new Warning(this.canvas, this.ctx, this.player.position.y, this))
            this.createWarning()

        }, randomValue * 1000);


    },

    createRocket(warningElement) {

        const index = this.rocketWarnings.indexOf(warningElement)

        // We delete the warning from the array
        this.rocketWarnings.splice(index, 1)

        // We shoot the rocket

        this.rockets.push(new Rocket(this.canvas, this.ctx, warningElement.position.y, this))

    },

    destroyRocket(rocketToKill) {

        const index = this.rockets.indexOf(rocketToKill)

        this.rockets.splice(index, 1)

    },

    createObstacle() {

        const randomValue = Math.random() * (this.obstaclesRandomTime.maxTime - this.obstaclesRandomTime.minTime) + this.obstaclesRandomTime.minTime

        this.timeOuts.obstacles = setTimeout(() => {

            this.obstacles.push(new Obstacle(this.canvas, this.ctx, this.time.FPS))
            this.createObstacle()

        }, randomValue * 1000)

    },

    destroyObstacle(obstacleToKill) {

        const index = this.obstacles.indexOf(obstacleToKill)

        this.obstacles.splice(index, 1)

    },

    createWalker() {

        const randomTime = Math.random() * this.walkersRandomTime.maxTime + this.walkersRandomTime.minTime

        this.timeOuts.walkers = setTimeout(() => {

            // Random Y position
            const minY = 100
            const maxY = 120
            const randomPosY = Math.random() * (maxY - minY) + minY

            if (randomPosY > 110) {

                this.walkersBack.push(new Walker(this.canvas, this.canvas.size.height - randomPosY))

            } else {

                this.walkersFront.push(new Walker(this.canvas, this.canvas.size.height - randomPosY))

            }

            this.createWalker()

        }, randomTime * 1000)

    },

    destroyWalker(walkerToKill, array) {

        const index = array.indexOf(walkerToKill)

        array.splice(index, 1)

    },


    //----- CHECKERS -----

    checkAllCollisions() {

        this.playerCollision()

        this.bulletsCollision()

        this.checkShellsOut()

        this.checkCoinsOut()

        this.checkCoinsOut()
        this.checkRocketsOut()
        this.checkObstaclesOut()
        this.checkWalkersOut()

    },

    playerCollision() {

        const playerSpaceData = {
            posX: this.player.position.x,
            posY: this.player.position.y,
            width: this.player.size.collisionWidth + 25,
            height: this.player.size.collisionHeight + 25

        }

        if (!this.player.isDead) {

            this.playerCoinsCollision(playerSpaceData)

            this.playerRocketsCollision(playerSpaceData)

            this.playerObstaclesCollision(playerSpaceData)

        }

        this.playerLimitsCollision(playerSpaceData)

    },

    playerLimitsCollision(playerSpaceData) {

        let floorLimit = this.canvas.baseLine

        if (this.player.isDead) {

            floorLimit = this.player.position.deadBaseLine

        }

        // Floor collision
        if (playerSpaceData.posY >= floorLimit) {

            this.player.isTouchingFloor = true
            this.player.position.y = floorLimit
            this.player.speedY = 0

            if (!this.player.isDead) {

                this.playRunAudio()

            }

        } else {

            this.player.isTouchingFloor = false

            // Roof collision
            if (playerSpaceData.posY <= this.canvas.highLine) {

                this.player.isTouchingRoof = true
                this.player.position.y = this.canvas.highLine
                this.player.speedY = 0

            } else {

                this.player.isTouchingRoof = false

            }

            this.stopRunAudio()

        }

    },

    playerCoinsCollision(playerSpaceData) {

        // Coins collision
        this.coins.forEach((elm => {

            const coinPosX = elm.position.x
            const coinPosY = elm.position.y
            const coinWidth = elm.size.width
            const coinHeight = elm.size.height


            // We check if is invading the coin area
            if (playerSpaceData.posX < coinPosX + coinWidth &&
                playerSpaceData.posX + playerSpaceData.width > coinPosX &&
                playerSpaceData.posY < coinPosY + coinHeight &&
                playerSpaceData.posY + playerSpaceData.height > coinPosY) {

                // We delete the coin
                this.coins.splice(this.coins.indexOf(elm), 1)

                // We play the audio                

                if (this.audio.tracks.coinsSong.currentTime > .04) {

                    this.audio.tracks.coinsSong.currentTime = 0

                }

                this.audio.tracks.coinsSong.play()

                // We add a point
                this.addPoints()
            }

        }))

    },

    playerRocketsCollision(playerSpaceData) {

        // We check Rockets Colision
        this.rockets.forEach(elm => {

            const rocketsPosX = elm.position.x
            const rocketsPosY = elm.position.y
            const rocketsWidth = elm.size.width
            const rocketsHeight = elm.size.height

            if (playerSpaceData.posX < rocketsPosX + rocketsWidth &&
                playerSpaceData.posX + playerSpaceData.width > rocketsPosX &&
                playerSpaceData.posY < rocketsPosY + rocketsHeight &&
                playerSpaceData.posY + playerSpaceData.height > rocketsPosY) {

                this.destroyRocket(elm)
                this.player.die()

            }

        })

    },

    playerObstaclesCollision(playerSpaceData) {

        // We check Obstacles collision
        this.obstacles.forEach(elm => {

            let obstaclesPosX = elm.position.x + elm.collisionMargin
            let obstaclesPosY = elm.position.y + elm.collisionMargin

            let obstaclesWidth = elm.size.width - (elm.collisionMargin * 2)
            let obstaclesHeight = elm.size.height - (elm.collisionMargin * 2)

            if (playerSpaceData.posX < obstaclesPosX + obstaclesWidth &&
                playerSpaceData.posX + playerSpaceData.width > obstaclesPosX &&
                playerSpaceData.posY < obstaclesPosY + obstaclesHeight &&
                playerSpaceData.posY + playerSpaceData.height > obstaclesPosY) {

                this.player.shock()
            }

        })

    },


    bulletsCollision() {

        // If the array is not empty
        if (this.bullets.length) {

            this.bullets.forEach(elm => {

                const bulletPosX = elm.position.x
                const bulletPosY = elm.position.y
                const bulletWidth = elm.image.shoot.size.width
                const bulletHeight = elm.image.shoot.size.height

                // Collision with walkersBack
                const backWalkersToKill = []

                this.walkersBack.forEach(e => {

                    if (!e.isExploding) {

                        const walkersPosX = e.position.x
                        const walkersPosY = e.position.y
                        const walkersWidth = e.size.width
                        const walkersHeight = e.size.height

                        if (bulletPosX < walkersPosX + walkersWidth &&
                            bulletPosX + bulletWidth > walkersPosX &&
                            bulletPosY < walkersPosY + walkersHeight &&
                            bulletPosY + bulletHeight > walkersPosY) {

                            backWalkersToKill.push(e)

                            //this.destroyWalker(elm, this.walkersBack)
                        }
                    }


                })

                // Collision with walkersFront
                const frontWalkersToKill = []

                this.walkersFront.forEach(e => {

                    if (!e.isExploding) {

                        const walkersPosX = e.position.x
                        const walkersPosY = e.position.y
                        const walkersWidth = e.size.width
                        const walkersHeight = e.size.height

                        if (bulletPosX < walkersPosX + walkersWidth &&
                            bulletPosX + bulletWidth > walkersPosX &&
                            bulletPosY < walkersPosY + walkersHeight &&
                            bulletPosY + bulletHeight > walkersPosY) {

                            frontWalkersToKill.push(e)

                            //this.destroyWalker(elm, this.walkersFront)
                        }
                    }


                })

                backWalkersToKill.forEach(e => {

                    this.destroyWalker(e, this.walkersBack)

                })

                frontWalkersToKill.forEach(e => {

                    this.destroyWalker(e, this.walkersFront)

                })
            })

            //----- FLOOR -----


            // Collision with floor
            const touchingFloorBullets = []

            this.bullets.forEach(elm => {

                const bulletPosX = elm.position.x
                const bulletPosY = elm.position.y
                const bulletWidth = elm.image.shoot.size.width
                const bulletHeight = elm.image.shoot.size.height

                // If it touches the floor
                if (elm.position.y >= this.canvas.baseLine - 15) {

                    const index = this.player.bullets.indexOf(elm)

                    touchingFloorBullets.push(elm)

                }

            })

            // We delete form the bullets array all the elements touching floor
            touchingFloorBullets.forEach(elm => {

                elm.explode()

                this.bullets.splice(this.bullets.indexOf(elm), 1)
                this.explodedBullets.push(elm)

            })

        }

    },

    checkShellsOut() {

        this.bulletShells.forEach(elm => {

            if (elm.position.x + elm.size.width <= 0 || elm.position.y >= this.canvas.size.height) {

                const index = this.bulletShells.indexOf(elm)

                this.bulletShells.splice(index, 1)

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

    checkRocketsOut() {

        if (this.rockets.length) {

            this.rockets.forEach(elm => {



                if (elm.position.x + elm.size.width <= 0) {

                    this.destroyRocket(elm)
                }
            })
        }
    },

    checkObstaclesOut() {

        if (this.obstacles.length) {

            this.obstacles.forEach(elm => {

                if (elm.position.x + elm.size.width <= 0) {

                    this.destroyObstacle(elm)
                }
            })
        }

    },

    checkWalkersOut() {

        this.walkersBack.forEach(elm => {

            if (elm.position.x + elm.size.width <= 0) {

                this.destroyWalker(elm, this.walkersBack)

            }
        })

        this.walkersFront.forEach(elm => {

            if (elm.position.x + elm.size.width <= 0) {

                this.destroyWalker(elm, this.walkersFront)

            }
        })
    },


    //----- MOTION METHODS -----    

    moveAll() {

        this.moveBackground()

        this.moveLoadingScreen()

        this.movePlayer()

        // We move the bullets

        this.moveBullets()

        this.moveBulletShells()

        this.moveCoins()

        this.moveRockets()

        this.moveObstacles()

        this.moveWalkersBack()

        this.moveWalkersFront()

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

    moveLoadingScreen() {

        this.background.up.move()
        this.background.down.move()

    },

    movePlayer() {

        this.player.move(this.player.speedX)

    },

    moveBullets() {

        this.bullets.forEach((elm) => {

            elm.move(this.player.speedX)

        })

    },

    moveBulletShells() {

        this.bulletShells.forEach((elm) => {

            elm.move(this.player.speedX)

        })

    },                                //EHhhhh!!! HEREEEE!!!!! 

    moveCoins() {

        this.coins.forEach(elm => {

            elm.move(this.player.speedX)

        })

    },

    moveRockets() {

        // We move the warnings
        this.rocketWarnings.forEach(elm => {

            elm.move(this.player.position.y)

        })

        // We move the rockets

        this.rockets.forEach(elm => {

            elm.move()

        })

    },

    moveObstacles() {

        this.obstacles.forEach(elm => {

            elm.move(this.player.speedX)

        })

    },

    moveWalkersBack() {

        this.walkersBack.forEach(elm => {

            elm.move(this.player.speedX)

        })

    },

    moveWalkersFront() {

        this.walkersFront.forEach(elm => {

            elm.move(this.player.speedX)

        })

    },


    //----- RENDERING IMAGE-----

    clearAll() {

        this.ctx.clearRect(0, 0, this.canvas.size.width, this.canvas.size.height)

    },

    drawAll() {

        this.drawBackgrond()
        this.drawObstacles()
        this.drawWalkersBack()
        this.drawCoins()
        this.drawBullets()
        this.drawBulleShells()                         //EH!!!!! HEREEEEEEEE!!!
        this.drawRockets()
        this.drawPlayer()
        this.drawWalkersFront()
        this.drawScore()

        if (this.isLoading) {

            this.drawLoadingScreen()

        }

    },

    drawInit() {

        this.drawBackgrond()
        this.drawPlayer()

    },

    drawBackgrond() {

        this.ctx.drawImage(this.background.left.imageInstance, this.background.left.position.x, 0, this.canvas.size.width, this.canvas.size.height)
        this.ctx.drawImage(this.background.right.imageInstance, this.background.right.position.x, 0, this.canvas.size.width, this.canvas.size.height)

    },

    drawInitialBackground() {

        this.ctx.drawImage(
            this.background.initial.imageInstance,
            0,
            0,
            this.canvas.size.width,
            this.canvas.size.height)

    },

    drawLoadingScreen() {

        this.ctx.drawImage(this.background.up.imageInstance, 0, this.background.up.position.y, this.canvas.size.width, this.canvas.size.height / 2)
        this.ctx.drawImage(this.background.down.imageInstance, 0, this.background.down.position.y, this.canvas.size.width, this.canvas.size.height / 2)

    },

    drawPlayer() {

        if (!this.player.isDead && !this.player.isShocking) {

            if (!this.player.isShooting) {

                this.player.spriteChangeTime = .1

            } else {

                this.player.spriteChangeTime = .05

            }

            // We change the sprite row depending on is touching floor (run) or not (fly)
            if (this.player.isTouchingFloor) {

                this.player.image.player.rowIndex = 0

            } else {

                this.player.image.player.rowIndex = 1

            }

            // We change the running sprite
            if (!this.player.isTouchingFloor && !this.player.isShooting) {

                this.player.image.player.frameIndex = 3

            } else {

                if (this.time.framesCount % (this.time.FPS * this.player.spriteChangeTime) === 0) {

                    if (this.player.image.player.frameIndex === this.player.image.player.frames - 1) {

                        this.player.image.player.frameIndex = 0
                        this.player.image.gunFire.frameIndex = 0

                    } else {

                        this.player.image.player.frameIndex += 1
                        this.player.image.gunFire.frameIndex += 1
                    }

                }
            }

            if (!this.player.isShooting) {

                this.player.image.gunFire.frameIndex = 3

            }


            // Draw player
            this.ctx.drawImage(
                this.player.image.player.imageInstance,
                this.player.image.player.frameIndex * Math.floor(this.player.image.player.imageInstance.width / this.player.image.player.frames),
                this.player.image.player.rowIndex * Math.floor(this.player.image.player.imageInstance.height / this.player.image.player.rows),
                Math.floor(this.player.image.player.imageInstance.width / this.player.image.player.frames),
                Math.floor(this.player.image.player.imageInstance.height / this.player.image.player.rows),
                this.player.position.x,
                this.player.position.y,
                (this.player.size.width * 2) / this.player.image.player.frames,
                this.player.size.height)

            // Draw gun fire
            this.ctx.drawImage(
                this.player.image.gunFire.imageInstance,
                this.player.image.gunFire.frameIndex * Math.floor(this.player.image.gunFire.imageInstance.width / this.player.image.gunFire.frames),
                0,
                Math.floor(this.player.image.gunFire.imageInstance.width / this.player.image.gunFire.frames),
                this.player.image.gunFire.imageInstance.height,
                this.player.gunFire.position.x,
                this.player.gunFire.position.y,
                (this.player.gunFire.size.width * 2) / this.player.image.gunFire.frames,
                this.player.gunFire.size.height)

        } else if (this.player.isShocking) {    // Shocking

            this.ctx.drawImage(
                this.player.image.playerElectric.imageInstance,
                this.player.position.x,
                this.player.position.y,
                this.player.size.width / 2,
                this.player.size.height

            )

        } else {

            this.ctx.drawImage(
                this.player.image.playerDead.imageInstance,

                this.player.position.x,
                this.player.position.y,
                this.player.size.width / 1.8,
                this.player.size.height / 1.8
            )

        }


    },

    drawBullets() {

        // If there is some bullet in the array

        this.bullets.forEach(elm => {

            this.ctx.drawImage(elm.image.shoot.imageInstance, elm.position.x, elm.position.y, elm.image.shoot.size.width, elm.image.shoot.size.height)

        })

        // If there is some exploded bullet

        this.explodedBullets.forEach(elm => {

            this.ctx.drawImage(
                elm.image.explosion.imageInstance,
                elm.image.explosion.frameIndex * Math.floor(elm.image.explosion.imageInstance.width / elm.image.explosion.frames),
                0,
                elm.image.explosion.imageInstance.width / 2,
                elm.image.explosion.imageInstance.height,


                elm.position.x,
                elm.position.y,
                elm.image.explosion.size.width,
                elm.image.explosion.size.height)

        })
    },

    drawBulleShells() {

        // this.bulletShells.forEach(elm => {                  /// EHHHHHHHH!!! HEREEEEEEEE!!

        //     this.ctx.drawImage(
        //         elm.image.imageInstance,
        //         elm.image.frameIndex * (elm.image.imageInstance.width / elm.image.frames),
        //         0,
        //         elm.image.imageInstance.width / elm.image.frames,
        //         elm.image.imageInstance.height,
        //         elm.position.x,
        //         elm.position.y,
        //         elm.size.width,
        //         elm.size.height)

        // })


        this.bulletShells.forEach(elm => {                  /// EHHHHHHHH!!! HEREEEEEEEE!!

            if (this.time.framesCount % (this.time.FPS * this.bulletShells[0].image.spriteChangeTime) === 0) {

                if (elm.image.frameIndex !== 7) {

                    elm.image.frameIndex++

                } else {

                    elm.image.frameIndex = 0

                }

            }

            this.ctx.drawImage(
                elm.image.imageInstance,
                elm.image.frameIndex * (elm.image.imageInstance.width / elm.image.frames),
                0,
                elm.image.imageInstance.width / elm.image.frames,
                elm.image.imageInstance.height,
                elm.position.x,
                elm.position.y,
                elm.size.width,
                elm.size.height)

        })

    },

    drawCoins() {

        // we change the sprite Coins
        if (this.coins.length) {

            if (this.time.framesCount % (this.time.FPS * this.coins[0].flipCoinTime) === 0) {

                this.coins.forEach(elm => {

                    const index = this.coins.indexOf(elm)

                    if (elm.image.frameIndex !== elm.image.frames - 1) {

                        elm.image.frameIndex += 1

                    } else {

                        elm.image.frameIndex = 0

                    }
                })
            }
        }

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

    drawScore() {

        // We draw distance
        const distanceToDraw = `${Math.floor(this.distanceDone)}M`

        this.ctx.font = 'bold 40px Arial'
        this.ctx.fillStyle = 'white'
        this.ctx.fillText(distanceToDraw, 20, 50)
        this.ctx.lineWidth = 2
        this.ctx.strokeText(distanceToDraw, 20, 50)

        // We draw coins
        const coinsToDraw = `${this.collectedCoins} $`

        this.ctx.font = 'bold 30px Arial'
        this.ctx.fillText(coinsToDraw, 20, 80)
        this.ctx.strokeText(coinsToDraw, 20, 80)

    },

    drawRockets() {

        // We draw the warnings
        this.rocketWarnings.forEach(elm => {

            this.ctx.drawImage(
                elm.image.imageInstance,
                elm.image.frameIndex * Math.floor(elm.image.imageInstance.width / elm.image.frames),
                0,
                Math.floor(elm.image.imageInstance.width / elm.image.frames),
                elm.image.imageInstance.height,
                elm.position.x,
                elm.position.y,
                (elm.size.width * 2) / elm.image.frames,
                elm.size.height
            )

        })

        // We draw the rockets
        this.rockets.forEach(elm => {

            this.ctx.drawImage(
                elm.image.imageInstance,
                elm.position.x,
                elm.position.y,
                elm.size.width,
                elm.size.height
            )
        })

    },

    drawObstacles() {

        this.obstacles.forEach(elm => {


            this.ctx.drawImage(
                elm.image.imageInstance,
                elm.position.x,
                elm.position.y,
                elm.size.width,
                elm.size.height
            )

        })

    },

    drawWalkersBack() {

        this.walkersBack.forEach(elm => {


            this.ctx.drawImage(
                elm.image.imageInstance,
                elm.position.x,
                elm.position.y,
                elm.size.width,
                elm.size.height
            )

        })

    },

    drawWalkersFront() {

        this.walkersFront.forEach(elm => {


            this.ctx.drawImage(
                elm.image.imageInstance,
                elm.position.x,
                elm.position.y,
                elm.size.width,
                elm.size.height
            )

        })

    },

    drawGameOver() {

        this.ctx.drawImage(this.background.gameOver.imageInstance, 0, 0, this.canvas.size.width, this.canvas.size.height)

    },

    animateDead() {

        this.player.isShooting = false
        this.player.forces.totalForce = 0 - this.player.forces.gravityForce

        this.audio.track.shotsSong.pause()

    },


    //----- GAME OVER -----

    gameOver() {

        setTimeout(() => {

            this.isGameOver = true

            // We stop the automatic creation
            clearTimeout(this.timeOuts.rockets)
            clearTimeout(this.timeOuts.coins)
            clearTimeout(this.timeOuts.walkers)
            clearTimeout(this.timeOuts.obstacles)

            // We empty all the arrays
            this.rocketWarnings = []
            this.rockets = []
            this.coins = []
            this.walkersBack = []
            this.walkersFront = []
            this.obstacles = []

            this.audio.tracks.mainSong.volume /= 1.02

        }, 1000)

    },

    //----- LOADING SCREEN -----

    loadingScreen() {

        this.isLoading = true

    },



    //----- SCORE SYSTEM -----
    addPoints() {

        this.collectedCoins++

    },

    addDistance() {

        this.distanceDone = this.distanceDone + (this.player.speedX / 30)

        switch (Math.floor(this.distanceDone)) {
            case 300:
                this.rocketsRandomTime.minTime = .2
                this.rocketsRandomTime.maxTime = .5

                break;

            case 500:
                this.rocketsRandomTime.minTime = this.rocketsRandomTime.minInicial
                this.rocketsRandomTime.maxTime = this.rocketsRandomTime.maxInicial

            default:
                break;
        }

    },

    //----- AUDIOS -----

    initiateAudio() {

        const tracksArray = Object.keys(this.audio.tracks)

        tracksArray.forEach(elm => {

            this.audio.tracks[elm].volume = this.audio.overallVolume

        })

        this.audio.tracks.mainSong.volume = .2
        this.audio.tracks.runFloorSong.volume = .1
        this.audio.tracks.coinsSong.volume = .1
        this.audio.tracks.warningSong.volume = .1

        this.audio.tracks.breakWallSong.play()

        setTimeout(() => {

            this.audio.tracks.mainSong.play()

        }, 1000)


    },

    playRunAudio() {

        this.audio.tracks.runFloorSong.play()

    },

    stopRunAudio() {

        this.audio.tracks.runFloorSong.pause()

    },



    //----- EVENT HANDLERS -----

    setEventHandlers() {

        // Controls
        window.onkeypress = (e) => {

            if (!this.player.isDead) {

                if (e.keyCode === this.keys.SPACE) {

                    this.player.isShooting = true
                    this.player.forces.totalForce = this.player.forces.shootingForce - this.gravityForce

                    // We play the shot audio
                    this.audio.tracks.shotsSong.play()

                }

            }

        }

        window.onkeyup = (e) => {

            if (e.keyCode === this.keys.SPACE) {

                this.player.isShooting = false
                this.player.forces.totalForce = 0 - this.player.forces.gravityForce

                this.audio.tracks.shotsSong.pause()

            }

            this.player.fireTime = 0

        }

        // Image loading
        this.background.initial.imageInstance.onload = () => {

            this.drawInitialBackground()

        }

    },

    linearTransition(initialX, initialY, finalX, finalY, currentX) {

        const slope = (initialY - finalY) / (initialX - finalX)
        const n = initialY - (slope * initialX)

        return slope * currentX + n

    }
}