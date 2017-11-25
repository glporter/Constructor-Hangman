//  Pseudo Code - HangManWithPrompt
//  Do while there are words to guess
//      instantiate new Game object
//      Set guessesRemaining = word[x].length
//      Prompt user to guess the word by asking for a letter
//          get letter entered by user
//          if letter is correct, display letter in position in dash array
//              add letter to lettersAlreadyGuessed array;
//              decrement guessesRemaining;
//              if no more letters to guess and user guessed the word then
//                  increment wins  - user guessed the word
//                  set currentword to next word in the array            
//                  return prompt user to guess the next word


// dependency for inquirer npm package
// programmersLoop-recursion.js
// dependency for inquirer npm package
var inquirer = require("inquirer");

var aWordArray = ["aardvark",
    "snowmobile",
    "elephant",
    "dinosaur",
    "programmer"
];

var count = 0;
var letterEntered = "";
var aWordArrayIndex = 0;

// constructor function used to create Game objects
function Game() {
    this.currentWordIndex = 1;
    this.wins = 0;
    this.losses = 0;
    this.correctLetters = "";
    this.guessesRemaining = 0;
    this.lettersAlreadyGuessed = [""];
    this.dashArray = [""];

    this.checkWordArray = function() {
        var aWord = aWordArray[this.currentWordIndex];
        //var aWord = aWordArray[0];
        wordLength = aWord.length;
        console.log("The word to guess is: " + aWord);
        for (var index = 0; index < wordLength; index++) {
            //check if the letter entered is contained in the word
            if (aWord[index] === letterEntered) {
                // a character match was found	
                this.dashArray[index] = letterEntered.trim();
                console.log(this.dashArray);
            } //else {
            //  this.dashArray[index] = '_';
            //  console.log(this.dashArray);
            //} //end else
        }

    }; //end function checkWordArray

    this.buildDashArray = function() {
        aWordToGuess = aWordArray[this.currentWordIndex];
        wordLength = aWordToGuess.length;
        for (var index = 0; index < wordLength - 1; index++) {
            this.dashArray.push("_");
        }
        console.log(this.dashArray);
    };

    this.getNextWord = function() {
        this.currentWordIndex++;
    }; //end function getNextWord


    this.wordGuessed = function() {
        if (this.dashArray.includes("_")) {
            this.losses++;
            console.log("***** User didn't guess the word ******");
        } else {
            this.wins++;
            console.log("***** User successfully guessed the word ********");
        }
    }

} //end  Game construction function


// creates the printInfo method and applies it to all programmer objects
Game.prototype.printInfo = function() {
    console.log("Wins: " + this.wins + "\nCorrectLetters: " + this.correctLetters + "\nGuessesRemaining: " +
        this.guessesRemaining + "\nLettersAlreadyGuessed: " + this.lettersAlreadyGuessed);
};


var newGame = new Game();
newGame.buildDashArray();
var wordlength = aWordArray[newGame.currentWordIndex].length;
console.log("Word Length: " + wordlength);

// variable we will use to count how many times our questions have been asked
var count = 0;

var askQuestion = function() {
    // if statement to ensure that our questions are only asked five times
    if (count < wordlength) {
        // runs inquirer and asks the user a series of questions whose replies are
        // stored within the variable answers inside of the .then statement
        inquirer.prompt([{
            name: "name",
            message: "Guess a Letter?"
        }]).then(function(answers) {
            // initializes the variable newguy to be a programmer object which will take
            // in all of the user's answers to the questions above

            newGame.lettersAlreadyGuessed.push(answers.name);
            letterEntered = answers.name;
            newGame.checkWordArray();
            // printInfo method is run to show that the newguy object was successfully created and filled
            newGame.printInfo();
            // add one to count to increment our recursive loop by one
            count++;
            // run the askquestion function again so as to either end the loop or ask the questions again
            askQuestion();
        });
        // else statement which prints "all questions asked" to the console
        // when the code has been run five times
    } else {
        console.log("All letters guessed");
        newGame.wordGuessed();
    }
};

// call askquestion to run our code
askQuestion();