var simonColors = ["red", "green", "blue", "yellow"];
var selectedColors = [];
var clickedPattern = [];
var gameStart = false;
var level = 0;




function sequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var firstColor = simonColors[randomNumber];
    $("#" + firstColor).fadeOut(200).fadeIn(200);
    selectedColors.push(firstColor);
    var sequenceSound = new Audio("sounds/sequence.wav");
    sequenceSound.play();
}

function animatePress(currentColor) {
    var clickSound = new Audio("sounds/click.wav");
    clickSound.play();
    $("#" + currentColor).addClass("clicked");
    setTimeout(function () {
        $("#" + currentColor).removeClass("clicked");
    }, 100);
}

$(".start").on("click", function () {
    if (gameStart === false) {
        sequence();
        level++;
        $(".game_text").text("LEVEL " + level);
        $(".welcome").text("");
        gameStart = true;
    }
});

$(".btn").on("click", function () {
    if (gameStart === true) {
        var userClickColor = $(this).attr("id");
        animatePress(userClickColor);
        clickedPattern.push(userClickColor);

        if (arraysMatch(selectedColors, clickedPattern) === true) {
            setTimeout(function () {
                sequence();
                level++;
                $(".game_text").text("LEVEL " + level);
                clickedPattern = [];
            }, 500);
        }

        if (arraysMatch(clickedPattern, selectedColors) === false) {
            var endSound = new Audio("sounds/gameover.mp3");
            endSound.play();
            $(".game_text").text("GAME OVER!");
            $("button").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            $(".game_text").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            $(".start").text("RESTART");
            $(".start").addClass("restart");
            $(".restart").removeClass("start");
            gameStart = false;
            
            $(".restart").on("click", function () {
                location.reload();
            });
        }  
    }
    return;
});




function arraysMatch(arr1, arr2) {

    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}




