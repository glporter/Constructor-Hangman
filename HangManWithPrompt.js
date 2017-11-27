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
    "programmer",
    "algorithm",
    "pseudocode",
    "prototype",
    "template",
    "giraffe"
];

//var count = 0;
//var letterEntered = "";


// constructor function used to create Game objects
function Game() {
    this.currentWordIndex = 0;
    this.currentWordLength = 0;
    this.wins = 0;
    this.losses = 0;
    this.correctLetters = "";
    this.guessesRemaining = 0;
    this.lettersAlreadyGuessed = [""];
    this.dashArray = [""];
    this.letterEntered = "";

    this.resetGame = function() {
            this.currentWordIndex = 0;
            this.currentWordLength = 0;
            this.wins = 0;
            this.losses = 0;
            this.correctLetters = "";
            this.guessesRemaining = 0;
            this.lettersAlreadyGuessed = [""];
            this.dashArray = [""];
            this.letterEntered = "";
            //set a random index value to index the word array
            this.setWordArrayIndex();
            //build the dashes array
            this.buildDashArray();
        } //end function resetGame

    this.checkWordArray = function() {
        var aWord = aWordArray[this.currentWordIndex];
        //var aWord = aWordArray[0];
        currentWordLength = aWord.length;
        console.log("The word to guess is: " + aWord);
        for (var index = 0; index < currentWordLength; index++) {
            //check if the letter entered is contained in the word
            if (aWord[index] === this.letterEntered) {
                // a character match was found	
                this.correctLetters++;
                this.dashArray[index] = this.letterEntered.trim();
                console.log(this.dashArray);
            } //else {
            //  this.dashArray[index] = '_';
            //  console.log(this.dashArray);
            //} //end else
        }

    }; //end function checkWordArray

    this.buildDashArray = function() {
        aWordToGuess = aWordArray[this.currentWordIndex];
        currentWordLength = aWordToGuess.length;
        for (var index = 0; index < currentWordLength - 1; index++) {
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
    }; //end function wordGuessed


    this.setWordArrayIndex = function() {
        this.currentWordIndex = Math.floor(Math.random() * 9) + 0;
        //console.log("SetWordArrayIndex: " + this.currentWordIndex);
    }; //end function setWordArrayIndex

}; //end  Game construction function



// creates the printInfo method and applies it to all programmer objects
Game.prototype.printInfo = function() {
    console.log("Wins: " + this.wins + "\nCorrectLetters: " + this.correctLetters + "\nGuessesRemaining: " +
        this.guessesRemaining + "\nLettersAlreadyGuessed: " + this.lettersAlreadyGuessed);
};


var newGame = new Game();
newGame.setWordArrayIndex();
newGame.buildDashArray();
console.log("CurrentWordIndex: " + newGame.currentWordIndex);
//*****var currentWordLength = aWordArray[newGame.currentWordIndex].length;
newGame.currentWordLength = aWordArray[newGame.currentWordIndex].length;
newGame.guessesRemaining = newGame.currentWordLength;
console.log("Word Length: " + newGame.currentWordLength);

// variable we will use to count how many times our questions have been asked
var count = 0;

var askQuestion = function() {
    // if statement to ensure that our questions are only asked five times
    if (count < newGame.currentWordLength + 1) {
        // runs inquirer and asks the user a series of questions whose replies are
        // stored within the variable answers inside of the .then statement
        inquirer.prompt([{
            name: "name",
            message: "Guess a Letter?"
        }]).then(function(answers) {
            // initializes the variable newguy to be a programmer object which will take
            // in all of the user's answers to the questions above

            newGame.lettersAlreadyGuessed.push(answers.name);
            newGame.letterEntered = answers.name;
            newGame.checkWordArray();
            // printInfo method is run to show that the newguy object was successfully created and filled
            //newGame.printInfo();
            // add one to count to increment our recursive loop by one
            count++;
            newGame.guessesRemaining--;
            // run the askquestion function again so as to either end the loop or ask the questions again
            askQuestion();
        });
        // else statement which prints "all questions asked" to the console
        // when the code has been run five times
    } else {
        console.log("All letters guessed");
        newGame.wordGuessed();
        newGame.printInfo();
        //sdfdsfsdf
        inquirer.prompt([{
            type: "confirm",
            name: "confirm",
            message: "Wish to play game again???",
            default: true
        }]).then(function(inquirerResponse) {
            if (inquirerResponse.confirm) {
                //var newGame = new Game();
                // newGame.setWordArrayIndex();
                //newGame.buildDashArray();
                newGame.resetGame()
                newGame.currentWordLength = aWordArray[newGame.currentWordIndex].length;
                newGame.guessesRemaining = newGame.currentWordLength;
                newGame.guessesRemaining = currentWordLength;
                console.log("Word Index: " + newGame.currentWordIndex);
                console.log("Word Length after -- Play game again???: " + currentWordLength);

                // variable we will use to count how many times our questions have been asked
                count = 0;
                askQuestion();
            } else {
                console.log("\nThank you for playing. Have a great day!!!!\n");
            }

        });

    }
};

// call askquestion to run our code
askQuestion();