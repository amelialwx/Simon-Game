var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){
  if (!started) {
    level = 0;
    started = true;
    gamePattern = [];
    nextSequence();
  }
});

function nextSequence() {
  level++;
  userClickedPattern = [];
  $(".title").html("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
  gamePattern.push(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).fadeOut(100).fadeIn(100);
}

function checkAnswer(index) {
  if (gamePattern[index] === userClickedPattern[index]) {
    if(gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  var over = new Audio("sounds/wrong.mp3");
  over.play();
  $("body").css("background-color", "red");
  setTimeout(function() {
    $("body").css("background-color", "#1128AB");
  }, 200);
  var score = gamePattern.length - 1;
  $(".title").html("Game Over! <br/> Your score: " + score +"<br/> Press Any Key to Restart");
  started = false;
}

$("button").on("click", function() {
  userChosenColor = this.id;
  playSound(userChosenColor);
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
