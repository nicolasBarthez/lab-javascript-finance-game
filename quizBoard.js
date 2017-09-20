// Object constructor
function Quiz(username) {
  this.playerOne = {
    username: username,
    photoUser: "./avatar.png"
  };
  this.score = 100000;
  this.level = level1;
  this.target = this.level.target;
  this.timeLeft = this.level.time;
  this.currentCategory = "";
  this.currentQuestion = {
    question: "Are you ready?",
    imageQuestion: "home.png",
    vol: 0,
    correctAnswer: {}
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
  var bucket = this.level[this.currentCategory];
  return _.without(bucket, this.questionAlreadyAsked);
};

// Find a question in the database according to the wheel of chance
Quiz.prototype.generateQuestion = function() {
  // return apropriate action
  switch (this.currentCategory) {
    case "timerPlus":
      this.timeLeft += 60000;
      this.currentQuestion.question =
        "You earn more time to reach your target, new time is " +
        this.timeLeft +
        ".";
      this.currentQuestion.imageQuestion = "images/timePlus.jpeg";
      break;
    case "timerMinus":
      this.timeLeft -= 30000;
      this.currentQuestion.question =
        "You have lost time, too bad... New time is " + this.timeLeft + ".";
      this.currentQuestion.imageQuestion = "images/timeMinus.jpeg";
      break;
    default:
      // find a question in a bucket build with remaining questions
      var index = Math.floor(Math.random() * this.remainQuestion().length);

      // Check question has not been already asked
      if (this.remainQuestion().length === 0) {
        this.currentQuestion.question =
          "No more question, you answered already all!!!";
        this.launchWheelOfChance();
      }

      // process actions triggered by the new question
      this.currentQuestion = this.remainQuestion()[index];
      this.questionAlreadyAsked.push(this.remainQuestion()[index]);
  }
};

// Update game with the user answer
Quiz.prototype.processAnswer = function(answer, vol) {
  vol = parseFloat(vol);

  if (answer === this.currentQuestion.correctAnswer[0]) {
    this.updatePortfolio(vol, true);
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
    ? console.log("You succeed!")
    : console.log("You fail miserabily!");
};

// Check end Game
Quiz.prototype.checkGame = function() {
  if (this.score <= 0) {
    this.isGameOver = true;
    this.endOfTheGame();
  } else if (this.score >= this.target) {
    this.endOfTheGame();
  }
};
