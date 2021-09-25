//starting variables 
var startBtnEl = document.querySelector(".start-button");
var timerEl = document.querySelector('.timer')
var printQuizEl = document.querySelector('.startQuiz')
var feedback = document.querySelector('.feedback')
var clickedAnswer = document.querySelector('.answerButton')
var selectBubble;
var endOfGame = document.querySelector('.endOfGame')
var timerID;
var finalScore = document.querySelector(".lose");
var subButton = document.querySelector('.btn')
var nameForm = document.getElementById('nameForm');
var scoreBoard = [];
var playerName = [];


//arrays of arrays of questions and their answers. (object would've been easier/cleaner)
var completeQuiz = [
    ['Commonly used types of data DO NOT include:', "1. Strings", "2. Booleans", "3. Alerts", "4. Numbers", "3. Alerts"],
    ['The condition in an if/else statement is enclosed within ____.', "1. Quotes", "2. Curly Brackets", "3. Parentheses", "4. Square Brackets", "2. Curly Brackets"],
    ['Arrays in Javascript can be used to store ____.', "1. Numbers and Strings", "2. Other Arrays", "3. Booleans", "4. All of the Above", "4. All of the Above"],
    ['A very useful tool used during development and debugging for printing content ot the debugger is:', '1. Javascript', '2. Terminal / Bash', '3. For Loops', '4. Console.log', '4. Console.log']
]

var correctAnswers = [3, 2, 4, 4];
var timer = 75;
var questionNum = 0;

//called on page load to retrieve data from the local storage for the scoreboard page
function init() {
    getScore();
    getName();
}

//when start button is clicked the first question is printed to the screen and timer starts
function startQuiz() {
    printQuestion();
    startTimer();
}

//function to print questions. will iterate thru "completeQuiz" and pull first index of each array element
// to get questions. then index thru the second dimension of the array to print answer choice buttons. 
function printQuestion() {
    console.log('questionNum is', questionNum);
    console.log('completeQuiz os', completeQuiz)
    if (questionNum < completeQuiz.length && timer != 0) {
        for (i = 1; i < completeQuiz[questionNum].length - 1; i++) {
            printQuizEl.textContent = completeQuiz[questionNum][0];
            var selectBubble = document.createElement("button");
            selectBubble.classList.add('answerButton');
            selectBubble.setAttribute("id", i);
            document.body.appendChild(selectBubble);
            selectBubble.textContent = completeQuiz[questionNum][i];
        }
        //only when one of the buttons is clicked will a "clickedAnswer" be logged and rightOrWrong will run 
        (function chooseAnswer() {
            document.body.addEventListener("click", clickButtons);
            // ^ one handler for all clicks
            function clickButtons(evt) {

                const from = evt.target;
                if (from.className != 'answerButton') { return; }
                // ^check if the element the user clicks is a answer or not  
                //  if not, do nothing
                clickedAnswer = from.id;
                document.body.removeEventListener('click', clickButtons);
                rightOrWrong();
                return;
            }
        }())
    }
    else {

        gameOver();
    }
}

//start the timer
function startTimer() {
    // sets timer
    timerID = setInterval(function () {
        timer--;
        timerEl.textContent = ("Time: " + timer + 's')
        if (timer <= 0) {
            document.querySelectorAll('.answerButton').forEach(e => e.remove());
            gameOver();
        }
    }, 1000);
}


//checks if inputted answer is correct or not and prints message to user. if wrong then subtract 10 from timer 
//if wrong and time is under 9 seconds then make the score 0 and end the game
//question number is increased same time and previous question answer buttons are removed and replaced by fx printQuestion
function rightOrWrong() {
    if (clickedAnswer == correctAnswers[questionNum]) {
        feedback.textContent = 'Correct!'
        setTimeout(function () {
            document.getElementById("feedback").innerHTML = '';
        }, 3000);
    }
    else if (clickedAnswer !== correctAnswers[questionNum] && timer <= 9) {
        feedback.textContent = 'False!'
        setTimeout(function () {
            document.getElementById("feedback").innerHTML = '';
        }, 3000);
        timer = 0;
        timerEl.textContent = ("Time: " + timer + 's')
    }
    else if (clickedAnswer !== correctAnswers[questionNum]) {
        feedback.textContent = 'False!'
        setTimeout(function () {
            document.getElementById("feedback").innerHTML = '';
        }, 3000);
        timer = timer - 10;
        timerEl.textContent = ("Time: " + timer + 's')
    }
    questionNum = questionNum + 1;
    document.querySelectorAll('.answerButton').forEach(e => e.remove());
    printQuestion();
    return;
}

function gameOver() {
    printQuizEl.classList.remove('p')
    printQuizEl.classList.add('h1')
    printQuizEl.textContent = 'All Done!'
    finalScore = document.createElement("p");
    finalScore.classList.add('finalscore')
    document.body.appendChild(finalScore);
    finalScore.textContent = 'Your final score is ' + timer + '.';
    clearInterval(timerID);
    nameForm.className = 'd-flex justify-content-center';
    console.log(timer)
}

//functions to retrieve and submit scores to and from the user local storage 
function setScore() {
    scoreBoard = timer;
    var scoreBoardHistory = JSON.parse(localStorage.getItem('setScore')) || [];
    scoreBoardHistory.push(scoreBoard);
    localStorage.setItem("setScore", JSON.stringify(scoreBoardHistory));
}

function getScore() {
    var storedScores = localStorage.getItem("setScore");
    console.log(storedScores)
}

function setName() {
    playerName = document.getElementById('name2').value;
    var nameHistory = JSON.parse(localStorage.getItem('setName')) || [];
    nameHistory.push(playerName);
    localStorage.setItem("setName", JSON.stringify(nameHistory));

}
function getName() {
    var storedNames = localStorage.getItem("setName");
    console.log(storedNames)
}

//function to print current high scores
function printScores() {
    for (i = 0; i < storedNames.length; i++) {
        var scores = document.querySelector('.scores')
        scores.textContent = storedNames[i] + ' - ' + storedScores[i];

    }
}

subButton.addEventListener("click", setScore); //log score when name is submitted
subButton.addEventListener("click", setName); //log name when score is submitted
startBtnEl.addEventListener("click", startQuiz); // start quiz when start button is clicked
init();

