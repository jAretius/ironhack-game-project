window.onload = function () {

    document.getElementById("start-button").onclick = function () {

        Game.start();
        document.getElementById("start-button").disabled = true

    };

    Game.init()

}