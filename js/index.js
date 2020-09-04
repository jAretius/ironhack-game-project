window.onload = function () {

    document.getElementById("start-button").onclick = function () {

        document.getElementById("start-button").disabled = true
        Game.start();

    };

    document.getElementById('my-canvas').onclick = function () {

        document.getElementById("start-button").disabled = true

        if (!Game.isPlaying) {

            Game.start()

        }

    };

    Game.init()
    document.getElementById('my-canvas').style.opacity = 1

}