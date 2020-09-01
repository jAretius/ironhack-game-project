class Walker {

    constructor(canvas) {

        this.canvas = canvas

        this.position = {
            x: canvas.size.width,
            y: undefined,
            minY: 100,
            maxY: 120
        }

        this.size = {
            width: 30,
            height: 45
        }

        this.image = {
            imageInstance: undefined,
            imageWalker1Path: './images/walker1.png',
            imageWalker2Path: './images/walker2.png',
            imageWalker3Path: './images/walker3.png',

        }

        this.speed = 0

        this.init()
    }

    init() {

        // Random walker type

        const walkerType = Math.floor(Math.random() * 3)
        this.image.imageInstance = new Image()

        switch (walkerType) {
            case 0:
                this.image.imageInstance.src = this.image.imageWalker1Path
                break;
            case 1:
                this.image.imageInstance.src = this.image.imageWalker2Path
                this.size.width = 35
                break;
            case 2:
                this.image.imageInstance.src = this.image.imageWalker3Path
                break;

            default:
                break;
        }

        // Random Y position
        const randomPosY = Math.random() * (this.position.maxY - this.position.minY) + this.position.minY
        this.position.y = this.canvas.size.height - randomPosY

    }

    move(playerSpeed) {

        this.position.x -= (playerSpeed + this.speed)
    }

}