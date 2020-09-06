var simonColors = ["red", "green", "blue", "yellow"];
var selectedColors = [];
var clickedPattern = [];
var gameStart = false;
var level = 0;




function sequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var firstColor = simonColors[randomNumber];
    $("." + firstColor).fadeOut(200).fadeIn(200);
    selectedColors.push(firstColor);
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("clicked");
  setTimeout(function () {
    $("." + currentColor).removeClass("clicked");
  }, 200);
}

$(document).on("keypress", function () {
    if (gameStart === false) {
        sequence();
        level++;
        $(".game_text").text("LEVEL " + level);
        $(".welcome").text("");
        gameStart = true;
    }
});

$("button").on("click", function () {
    if (gameStart === true) {
        var userClickColor = $(this).attr("class");
        animatePress(userClickColor);
        clickedPattern.push(userClickColor);

        if (arraysMatch(selectedColors, clickedPattern) === true) {
            setTimeout(function () {
                sequence();
                level++;
                $(".game_text").text("LEVEL " + level);
                clickedPattern = [];
            }, 400);
        }

        if (arraysMatch(clickedPattern, selectedColors) === false) {
            $(".game_text").text("GAME OVER!");
            $("button").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            $(".game_text").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            $(".reset").text("Press any key to RESTART.");
            $(document).on("keypress", function () {
                gameStart = false;
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




