class Obstacle {
    constructor(canvas, cxt, FPS) {

        this.canvas = canvas
        this.cxt = cxt
        this.FPS = FPS

        this.position = {
            x: canvas.size.width,
            y: (canvas.size.height / 2) - 20
        }

        this.size = {
            width: 60,
            height: 225
        }

        this.image = {
            imageInstance: undefined,
            imageSmallVerticalPath: './images/obstacle1.png',
            imageSmallHorizontalPath: './images/obstacle2.png',
            imageLargeVerticalPath: './images/obstacle3.png',
            imageLargeHorizontalPath: './images/obstacle4.png'
        }

        this.init()
    }

    init() {

        const obstacleType = Math.floor(Math.random() * 4)
        this.image.imageInstance = new Image()

        // We choose the imagePath depending on what random value we have (0, 1, 2, 3)
        switch (obstacleType) {
            case 0:
                this.image.imageInstance.src = this.image.imageSmallVerticalPath //imageSmallVertical
                this.size.width = 60
                this.size.height = 150
                break;

            case 1:
                this.image.imageInstance.src = this.image.imageSmallHorizontalPath  //imageSmallHorizontal
                this.size.width = 150
                this.size.height = 60
                break;
            case 2:
                this.image.imageInstance.src = this.image.imageLargeVerticalPath    //imageLargeVertical
                this.size.width = 60
                this.size.height = 225
                break;

            case 3:
                this.image.imageInstance.src = this.image.imageLargeHorizontalPath  //imageLargeHorizontal
                this.size.width = 225
                this.size.height = 60
            default:
                break;
        }
    }
    move(playerSpeed) {

        this.position.x -= playerSpeed
    }
}
