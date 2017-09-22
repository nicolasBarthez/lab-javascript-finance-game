var game;

$(document).ready(function() {
  var timer;
  var gameOverOverlay = $("#screen-game-over");
  var gameWin = $(".leaderboard");
  var refreshData = function() {
    $("#question-details").text(game.currentQuestion.question);
    $("#img-q-r").attr("src", game.currentQuestion.imageQuestion);
    $("#level").text(game.file.level);
    $("#target").text(game.targetOfLevel.toLocaleString("fr-FR"));
    $("#score").text(game.score.toFixed(2).toLocaleString("fr-FR"));
    $("#timer").text(game.timeLeft);
  };
  var clearData = function() {
    refreshData();
    $(".response").empty();
    $(".response-detail").empty();
    $(".news-containers div").empty();
  };

  gameOverOverlay.hide();
  gameWin.hide();
  game = new Quiz();
  refreshData();

  $("#startGame").click(function() {
    game.playerOne.name = $("#name").val();
    game.playerOne.username = $("#name").val();
    game.playerOne.pic = picPath;
    $("#fullName").text($("#name").val());
    $("#pseudo").text($("#username").val());
    $("#screen-log-in").hide();
  });

  // launch the wheelOfChance
  $("#btn-launch-wheel").click(function() {
    // launch timer the first time
    if (game.currentCategory === "") game.startTimer();
    setInterval(function() {
      $("#timer").text(game.timeLeft);
    }, 500);

    $("#btn-launch-wheel").addClass("rotation");

    $(".response").text("");
    $(".response-detail").text("");
    game.launchWheelOfChance();
    refreshData();
    // $("#question-category").text(game.currentCategory);
    // $("#question-details").text(game.currentQuestion.question);
    // $("#img-q-r").attr("src", game.currentQuestion.imageQuestion);
  });

  // ********************************
  // Answer buy
  // ********************************
  $("#buy-btn").click(function() {
    var resp = game.processAnswer("buy", game.currentQuestion.vol);
    // Display response
    $("#btn-launch-wheel").removeClass("rotation");
    $("#score").text(game.score.toFixed(2).toLocaleString("fr-FR"));
    $("#img-q-r").attr("src", game.currentQuestion.correctAnswer[2]);
    $(".response").text(function() {
      return resp ? "Correct!" : "You're wrong!";
    });
    $(".response-detail").text(game.currentQuestion.correctAnswer[1]);
    // Put response in the history section
    if (resp) {
      $(".news-containers").append(
        "<div class='news-block'><i class='glyphicon glyphicon-ok'></i><p class='p-news-container'>" +
          game.currentQuestion.sum +
          "</p></div>"
      );
    } else {
      $(".news-containers").append(
        "<div class='news-block'><i class='glyphicon glyphicon-remove'></i><p class='p-news-container'>" +
          game.currentQuestion.sum +
          "</p></div>"
      );
      $(".feedback-sum").append(
        "<div class='feedback-block'><i class='glyphicon glyphicon-remove'></i><p class='p-feedback-container'>" +
          game.currentQuestion.sum +
          "</p></div>"
      );
    }
  });

  // **********************************
  // Answer sell
  // **********************************
  $("#sell-btn").click(function() {
    var resp = game.processAnswer("sell", game.currentQuestion.vol);
    $("#btn-launch-wheel").removeClass("rotation");
    // Display response
    $("#score").text(game.score.toFixed(2).toLocaleString("fr-FR"));
    $("#img-q-r").attr("src", game.currentQuestion.correctAnswer[2]);
    $(".response").text(function() {
      return resp ? "Correct!" : "You're wrong!";
    });
    $(".response-detail").text(game.currentQuestion.correctAnswer[1]);
    // Put response in the history section
    if (resp) {
      $(".news-containers").append(
        "<div class='news-block'><i class='glyphicon glyphicon-ok'></i><p class='p-news-container'>" +
          game.currentQuestion.sum +
          "</p></div>"
      );
    } else {
      $(".news-containers").append(
        "<div class='news-block'><i class='glyphicon glyphicon-remove'></i><p class='p-news-container'>" +
          game.currentQuestion.sum +
          "</p></div>"
      );
      $(".feedback-sum").append(
        "<div class='feedback-block'><i class='glyphicon glyphicon-remove'></i><p class='p-feedback-container'>" +
          game.currentQuestion.sum +
          "</p></div>"
      );
    }
  });

  // ***********************************
  // Restart game
  // ***********************************
  $("#restart").click(function() {
    var gameOverOverlay = $("#screen-game-over");
    gameOverOverlay.hide();
    game = new Quiz();
    clearData();
  });

  // ***********************************
  // Next level
  // ***********************************
  $("#nextLevel").click(function() {
    gameWin.hide();
    game.level++;
    game.file = game.levelList[game.level];
    game.targetOfLevel = game.file.target;
    clearData();
  });
});

// Upload picture
var picPath;
function uploadPic() {
  var file = $("#pic")[0].files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    $("#profile-pic").attr("src", e.target.result);
    picPath = e.target.result;
  };
  reader.readAsDataURL(file);
}
