// Object constructor
function Quiz(username) {
  this.playerOne = {
    username: username,
    photoUser: "./avatar.png"
  };
  this.score = 100000;
  this.currentBet = 0;
  this.level = level1;
  this.target = this.level.target;
  this.timeLeft = this.level.time;
  this.currentCategory = "";
  this.questionAlreadyAsked = [];
  this.isGameOver = false;
}

// identify options when user launch the wheel of chance
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

// Find a question in the database according to the wheel of chance
Quiz.prototype.generateQuestion = function() {
  // return apropriate action
  switch (this.currentCategory) {
    case "timerPlus":
      this.timeLeft += 60000;
      console.log(
        "You earn more time to reach your target, new time is " +
          this.timeLeft +
          "."
      );
      setTimeout(this.launchWheelOfChance(), 3000);
    case "timerMinus":
      this.timeLeft -= 30000;
      console.log(
        "You have lost time, too bad... New time is " + this.timeLeft + "."
      );
      setTimeout(this.launchWheelOfChance(), 3000);
    default:
      // find a question in a bucket build with remainig questions
      var bucket = this.level[this.currentCategory];
      var remainQuestion = _.without(bucket, this.questionAlreadyAsked);
      var index = Math.floor(Math.random() * remainQuestion.length);

      // Check question has not been already asked
      if (remainQuestion.length === 0) {
        console.error("No more question");
        this.launchWheelOfChance();
      }
      this.questionAlreadyAsked.push(remainQuestion[index]);
  }
};

// Update game with the user answer
Quiz.prototype.processAnswer = function(answer, vol) {
  vol = parseFloat(vol);
  console.log(vol);
  if (
    answer ===
    this.questionAlreadyAsked[this.questionAlreadyAsked.length - 1]
      .correctAnswer[0]
  ) {
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
    ? console.log("You succed!")
    : console.log("You fail miserabily!");
};

// Check end Game
Quiz.prototype.checkGame = function() {
  if (this.score <= 0) {
    this.isGameOver = true;
    this.endOfTheGame();
  } else if (this.score >= this.target) {
    this.endOfTheGame();
  } else {
    this.launchWheelOfChance();
  }
};
