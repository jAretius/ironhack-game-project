window.onload = function () {

    console.log(`El resto es: ${500 % 500}`)



    document.getElementById("start-button").onclick = function () {

        Game.start();
        document.getElementById("start-button").disabled = true

    };

    Game.init()

}