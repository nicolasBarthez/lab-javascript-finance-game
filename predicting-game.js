var game;

$(document).ready(function() {
  game = new Quiz("Nicolas");
  $("#img-q-r").attr("src", game.currentImage);
  $("#level").text(game.level.level);
  $("#target").text(game.level.target);
  $("#score").text(game.score);

  // launch the wheelOfChance
  $(".btn-launch-wheel").click(function() {
    game.launchWheelOfChance();
    $("#question-category").text(game.currentCategory);
    $("#question-details").text(game.currentQuestion);
    $("#img-q-r").attr("src", game.currentImage);
  });

  // Answer buy
  $("#buy-btn").click(function() {
    game.processAnswer();
    $("#score").text(game.score);
    $("#question-details").text(game.currentQuestion);
    $("#img-q-r").attr("src", game.currentImage);
  });
});
