class Obstacle {
    constructor(canvas, FPS) {

        this.canvas = canvas
        this.FPS = FPS

        this.position = {
            x: canvas.size.width,
            y: (canvas.size.height / 2) - 20
        }

        this.size = {
            width: undefined,
            height: undefined
        }

        this.image = {
            imageInstance: undefined,
            imageSmallVerticalPath: './images/obstacle1.png',
            imageSmallHorizontalPath: './images/obstacle2.png',
            imageLargeVerticalPath: './images/obstacle3.png',
            imageLargeHorizontalPath: './images/obstacle4.png',
            imageDiagonalAscendingPath: './images/obstacle5.png',
            imageDiagonalDescendingPath: './images/obstacle6.png'
        }

        this.init()
    }

    init() {

        const obstacleType = Math.floor(Math.random() * 4)
        this.image.imageInstance = new Image()

        let minPosY = undefined
        let maxPosY = undefined
        let randomPosY = undefined

        // We choose the imagePath depending on what random value we have (0, 1, 2, 3)
        switch (obstacleType) {
            case 0:
                this.image.imageInstance.src = this.image.imageSmallVerticalPath //imageSmallVertical
                this.size.width = 60
                this.size.height = 150

                minPosY = 70
                maxPosY = this.canvas.size.height - 210
                randomPosY = Math.floor(Math.random() * (maxPosY - minPosY)) + minPosY

                this.position.y = randomPosY

                break;

            case 1:
                this.image.imageInstance.src = this.image.imageSmallHorizontalPath  //imageSmallHorizontal
                this.size.width = 150
                this.size.height = 60

                minPosY = 70
                maxPosY = this.canvas.size.height - 110
                randomPosY = Math.floor(Math.random() * (maxPosY - minPosY)) + minPosY

                this.position.y = randomPosY
                break;
            case 2:
                this.image.imageInstance.src = this.image.imageLargeVerticalPath    //imageLargeVertical
                this.size.width = 60
                this.size.height = 225

                minPosY = 70
                maxPosY = this.canvas.size.height - 280
                randomPosY = Math.floor(Math.random() * (maxPosY - minPosY)) + minPosY

                this.position.y = randomPosY
                break;

            case 3:
                this.image.imageInstance.src = this.image.imageLargeHorizontalPath  //imageLargeHorizontal
                this.size.width = 225
                this.size.height = 60

                minPosY = 70
                maxPosY = this.canvas.size.height - 110
                randomPosY = Math.floor(Math.random() * (maxPosY - minPosY)) + minPosY

                this.position.y = randomPosY
                break;

            case 4:
                this.image.imageInstance.src = this.image.imageDiagonalAscendingPath  //imageDiagonalAscending
                this.size.width = 159
                this.size.height = 159
                minPosY = 130
                maxPosY = this.canvas.size.height - 95
                randomPosY = Math.floor(Math.random() * (maxPosY - minPosY)) + minPosY
                break;

            case 5:
                this.image.imageInstance.src = this.image.imageDiagonalDescendingPath  //imageDiagonalDesending
                this.size.width = 159
                this.size.height = 159
                minPosY = 70
                maxPosY = this.canvas.size.height - 160
                randomPosY = Math.floor(Math.random() * (maxPosY - minPosY)) + minPosY
                break;

            default:
                break;
        }
    }

    move(playerSpeed) {

        this.position.x -= playerSpeed

    }
}
