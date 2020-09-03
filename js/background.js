class Background {

    constructor(canvas, ctx, initialPosX, FPS, backgroundType = 'main', gameCtx = null) {

        this.ctx = ctx

        this.gameCtx = gameCtx

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

        this.imagePathTransitionUp = './images/iron-up.png'
        this.imagePathTrasitionDown = './images/iron-down.png'

        this.loadingTransitionTime = .5
        this.loadingTransitionWaitTime = 1.2
        this.loadingTransitionCurrentTime = 0
        this.loadingTransitionMultiplier = 1

        this.backgroundType = backgroundType

        this.init()

    }

    init() {

        if (this.backgroundType === 'iron-up' || this.backgroundType === 'iron-down') {

            this.size.height /= 2
            this.position.x = 0

        }

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

            case 'iron-up':

                this.imageInstance.src = this.imagePathTransitionUp
                break;

            case 'iron-down':

                this.imageInstance.src = this.imagePathTrasitionDown

            default:
                break;
        }

    }

    move(playerSpeed) {

        // Movement for regular background
        if (this.backgroundType !== 'iron-up' && this.backgroundType !== 'iron-down') {

            const compesatedSpeed = ((60 / this.FPS) * playerSpeed)
            this.position.x -= compesatedSpeed

        } else {        // Movement for transition screen

            let pendiente = undefined

            if (this.loadingTransitionMultiplier === 1) {       // Transition first movement

                if (this.loadingTransitionTime > this.loadingTransitionCurrentTime) {

                    if (this.backgroundType === 'iron-up') {

                        pendiente = this.size.height / this.loadingTransitionTime

                        this.position.y = pendiente * this.loadingTransitionCurrentTime - this.size.height

                    } else {

                        pendiente = ((this.size.height * 2) - this.size.height) / (-this.loadingTransitionTime)

                        pendiente *= this.loadingTransitionMultiplier

                        this.position.y = pendiente * this.loadingTransitionCurrentTime + this.size.height * 2

                    }


                } else {

                    if (this.backgroundType === 'iron-up') {

                        this.position.y = 0

                    } else {

                        this.position.y = this.size.height

                    }

                }



            } else {            // Transition second movement

                if (this.loadingTransitionTime > this.loadingTransitionCurrentTime) {

                    if (this.backgroundType === 'iron-up') {

                        pendiente = -this.size.height / this.loadingTransitionTime

                        this.position.y = pendiente * this.loadingTransitionCurrentTime

                    } else {

                        pendiente = ((this.size.height * 2) - this.size.height) / (this.loadingTransitionTime)

                        this.position.y = pendiente * this.loadingTransitionCurrentTime + this.size.height

                    }


                } else {

                    if (this.backgroundType === 'iron-up') {

                        this.position.y = -this.size.height

                    } else {

                        this.position.y = this.size.height * 2

                    }

                }

            }

            this.loadingTransitionCurrentTime += 1 / (this.loadingTransitionTime * 60)

            if (this.loadingTransitionCurrentTime >= this.loadingTransitionTime + this.loadingTransitionWaitTime) {

                if (this.loadingTransitionMultiplier === -1) {

                    this.gameCtx.isLoading = false
                    this.loadingTransitionMultiplier = 1

                } else {

                    this.loadingTransitionMultiplier = -1

                }

                this.loadingTransitionCurrentTime = 0

            }

        }

    }

    // move(playerSpeed) {

    //     // Movement for regular background
    //     if (this.backgroundType !== 'iron-up' && this.backgroundType !== 'iron-down') {

    //         const compesatedSpeed = ((60 / this.FPS) * playerSpeed)
    //         this.position.x -= compesatedSpeed

    //     } else {        // Movement for transition screen

    //         let pendiente = undefined

    //         if (this.loadingTransitionMultiplier === 1) {       // Transition first movement

    //             if (this.loadingTransitionTime > this.loadingTransitionCurrentTime) {

    //                 if (this.backgroundType === 'iron-up') {

    //                     pendiente = this.size.height / this.loadingTransitionTime

    //                     this.position.y = pendiente * this.loadingTransitionCurrentTime - this.size.height

    //                 } else {

    //                     pendiente = ((this.size.height * 2) - this.size.height) / (-this.loadingTransitionTime)

    //                     pendiente *= this.loadingTransitionMultiplier

    //                     this.position.y = pendiente * this.loadingTransitionCurrentTime + this.size.height * 2

    //                 }


    //             } else {

    //                 if (this.backgroundType === 'iron-up') {

    //                     this.position.y = 0

    //                 } else {

    //                     this.position.y = this.size.height

    //                 }

    //             }



    //         } else {            // Transition second movement

    //             if (this.loadingTransitionTime > this.loadingTransitionCurrentTime) {

    //                 if (this.backgroundType === 'iron-up') {

    //                     pendiente = -this.size.height / this.loadingTransitionTime

    //                     this.position.y = pendiente * this.loadingTransitionCurrentTime

    //                 } else {

    //                     pendiente = ((this.size.height * 2) - this.size.height) / (this.loadingTransitionTime)

    //                     this.position.y = pendiente * this.loadingTransitionCurrentTime + this.size.height

    //                 }


    //             } else {

    //                 if (this.backgroundType === 'iron-up') {

    //                     this.position.y = -this.size.height

    //                 } else {

    //                     this.position.y = this.size.height * 2

    //                 }

    //             }

    //         }

    //         this.loadingTransitionCurrentTime += 1 / (this.loadingTransitionTime * 60)

    //         if (this.loadingTransitionCurrentTime >= this.loadingTransitionTime + this.loadingTransitionWaitTime) {

    //             if (this.loadingTransitionMultiplier === -1) {

    //                 this.gameCtx.isLoading = false
    //                 this.loadingTransitionMultiplier = 1

    //             } else {

    //                 this.loadingTransitionMultiplier = -1

    //             }

    //             this.loadingTransitionCurrentTime = 0

    //         }

    //     }

    // }


}