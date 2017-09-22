// Object constructor
function Quiz() {
  this.playerOne = {
    name: "name",
    username: "username",
    pic: "./avatar.png"
  };
  this.score = 1000;
  this.level = 0;
  this.file = level1;
  this.levelList = [level1, level2, level3];
  this.targetOfLevel = this.file.target;
  this.timeLeft = 10;
  this.secondsIncrement = 30;
  this.currentCategory = "";
  this.currentQuestion = {
    question:
      "Are you ready? Click on the button on the right to launch the quiz.\nYou have 30 seconds to predict the best position to adopt according the information given.\nGood luck ;-)",
    imageQuestion: "home.png",
    vol: 0,
    correctAnswer: {},
    sum: ""
  };
  this.questionAlreadyAsked = [];
  this.isGameOver = false;
}

// Identify options when user launch the wheel of chance
Quiz.prototype.wheelOfChance = function() {
  var wheelClassicOptions = ["Fundemental", "Chart", "Macroeconomy"];
  var wheelFunOptions = ["timerPlus", "timerMinus"];
  return Math.random() < 0.9
    ? wheelClassicOptions[
        Math.floor(Math.random() * wheelClassicOptions.length)
      ]
    : wheelFunOptions[Math.floor(Math.random() * wheelFunOptions.length)];
};

// Launch the wheel of chance and find a category
Quiz.prototype.launchWheelOfChance = function() {
  this.currentCategory = this.wheelOfChance();
  this.generateQuestion();
};

// Identify the remaining question for a bucket
Quiz.prototype.remainQuestion = function() {
  var questionCat = this.file[this.currentCategory];
  var bucket = questionCat.map(function(el) {
    return el.id;
  });
  console.log("question already asked is: " + this.questionAlreadyAsked);
  return _.without(bucket, ...this.questionAlreadyAsked).map(function(qId) {
    return questionCat.find(function(qObj) {
      return qObj.id === qId;
    });
  });
};

// Find a question in the database according to the wheel of chance
Quiz.prototype.generateQuestion = function() {
  // return apropriate action
  switch (this.currentCategory) {
    case "timerPlus":
      this.timeLeft += 10;
      this.currentQuestion.question =
        "You win 10 seconds! Click on the button to ask a new question.";
      this.currentQuestion.imageQuestion =
        "https://media.giphy.com/media/3oz8xKaR836UJOYeOc/source.gif";
      break;
    case "timerMinus":
      this.timeLeft -= 10;
      this.currentQuestion.question =
        "Ooups… you’ve lost 10 seconds! You win 10 seconds! Click on the button to ask a new question." +
        this.timeLeft +
        ".";
      this.currentQuestion.imageQuestion =
        "https://media.giphy.com/media/3oKIPwv9exqYPaB03K/source.gif";
      break;
    default:
      // find a question in a bucket build with remaining questions
      var index = Math.floor(Math.random() * this.remainQuestion().length);

      // Check question has not been already asked
      if (this.remainQuestion().length === 0) {
        alert("No more question, you answered already all!!!");
      }

      // process actions triggered by the new question
      this.currentQuestion = this.remainQuestion()[index];
      this.questionAlreadyAsked.push(this.remainQuestion()[index].id);
  }
};

// Update game with the user answer
Quiz.prototype.processAnswer = function(answer, vol) {
  vol = parseFloat(vol);

  if (answer === this.currentQuestion.correctAnswer[0]) {
    this.updatePortfolio(vol, true);
    this.timeLeft += 10;
    this.checkGame();
    return true;
  }
  this.updatePortfolio(vol, false);
  this.checkGame();
  return false;
};

// update portfolio
Quiz.prototype.updatePortfolio = function(vol, correct) {
  return correct
    ? (this.score += vol * this.score)
    : (this.score -= vol * this.score);
};

// End of the Game
Quiz.prototype.endOfTheGame = function() {
  return !this.isGameOver
    ? $(".leaderboard").show()
    : $("#screen-game-over").show();
};

// Check end Game
Quiz.prototype.checkGame = function() {
  if (this.score <= 0) {
    this.isGameOver = true;
    this.endOfTheGame();
  } else if (this.score >= this.targetOfLevel) {
    this.endOfTheGame();
  }
};

// Timer function
Quiz.prototype.startTimer = function() {
  var self = this;
  this.timer = setInterval(function() {
    self.checkTimer();
  }, 1000);
};

Quiz.prototype.checkTimer = function() {
  if (this.timeLeft > 0) {
    this.timeLeft--;
    // console.log(this.secondsLeft);
  } else {
    clearInterval(this.timer);
    this.isGameOver = true;
    this.endOfTheGame();
    // console.log("You lost!");
  }
};
