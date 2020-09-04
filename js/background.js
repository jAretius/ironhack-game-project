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

        this.imagePathTransitionUp = './images/iron-up-blue-yellow.png'
        this.imagePathTrasitionDown = './images/iron-down-blue-yellow.png'

        this.loadingTransitionTime = .5
        this.loadingTransitionWaitTime = 1.3
        this.loadingTransitionCurrentTime = 0
        this.loadingTransitionState = 'close'

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

        } else if (this.gameCtx.isLoading) {        // Movement for transition screen

            const closeStartTime = 0
            const closeEndTime = this.loadingTransitionTime
            const waitStartTime = closeEndTime
            const waitEndTime = waitStartTime + this.loadingTransitionWaitTime
            const openStartTime = waitEndTime
            const openEndTime = openStartTime + this.loadingTransitionTime

            const currentTime = this.loadingTransitionCurrentTime

            let initialPosY = undefined
            let finalPosY = undefined

            if (currentTime < closeEndTime) {       // Close animation

                if (this.backgroundType === 'iron-up') {

                    initialPosY = -this.size.height
                    finalPosY = 0

                } else {

                    initialPosY = this.size.height * 2
                    finalPosY = this.size.height

                }

                this.position.y = this.gameCtx.linearTransition(closeStartTime, initialPosY, closeEndTime, finalPosY, currentTime)

            } else if (currentTime >= waitStartTime && currentTime <= waitEndTime) {        // Waiting time

                if (this.backgroundType === 'iron-up') {

                    this.position.y = 0

                } else {

                    this.position.y = this.size.height

                }

            } else if (currentTime < openEndTime) {         // Open animation

                this.gameCtx.isPlaying = true
                this.gameCtx.isGameOver = false


                if (this.backgroundType === 'iron-up') {

                    initialPosY = 0
                    finalPosY = -this.size.height

                } else {

                    initialPosY = this.size.height
                    finalPosY = this.size.height * 2

                }

                this.position.y = this.gameCtx.linearTransition(openStartTime, initialPosY, openEndTime, finalPosY, currentTime)

            } else {

                if (this.backgroundType === 'iron-up') {

                    this.position.y = -this.size.height

                } else {

                    this.position.y = this.size.height * 2

                }

                this.gameCtx.isLoading = false
                this.loadingTransitionState = 'close'
                this.loadingTransitionCurrentTime = 0

                return

            }

            this.loadingTransitionCurrentTime += 1 / (this.loadingTransitionTime * 60)
        }


    }

}