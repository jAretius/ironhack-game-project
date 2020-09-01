window.onload = function () {

    document.getElementById("start-button").onclick = function () {

        document.getElementById("start-button").disabled = true
        Game.start();

    };

    Game.init()

}