var game;

$(document).ready(function() {
  game = new Quiz("Nicolas");
  $("#img-q-r").attr("src", game.currentQuestion.imageQuestion);
  $("#level").text(game.level.level);
  $("#target").text(game.level.target);
  $("#score").text(game.score);
  $("#timer").text(game.timeLeft);

  // launch the wheelOfChance
  $(".btn-launch-wheel").click(function() {
    $(".response").text("");
    $(".response-detail").text("");
    game.launchWheelOfChance();
    $("#question-category").text(game.currentCategory);
    $("#question-details").text(game.currentQuestion.question);
    $("#img-q-r").attr("src", game.currentQuestion.imageQuestion);
  });

  // Answer buy
  $("#buy-btn").click(function() {
    var resp = game.processAnswer("buy", game.currentQuestion.vol);
    $("#score").text(game.score);
    $("#img-q-r").attr("src", game.currentQuestion.correctAnswer[2]);
    $(".response").text(function() {
      return resp ? "Correct!" : "You're wrong!";
    });
    $(".response-detail").text(game.currentQuestion.correctAnswer[1]);
  });
});
