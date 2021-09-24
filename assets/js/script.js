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
nameForm.className += " " + 'invisible';
var scoreBoard;
var playerName;


//arrays of arrays of questions and their answers. easy indexing 
var completeQuiz = [
    ['Commonly used types of data DO NOT include:', "1. Strings", "2. Booleans", "3. Alerts", "4. Numbers", "3. Alerts"],
    ['The condition in an if/else statement is enclosed within ____.', "1. Quotes", "2. Curly Brackets", "3. Parentheses", "4. Square Brackets", "2. Curly Brackets"],
    ['Arrays in Javascript can be used to store ____.', "1. Numbers and Strings", "2. Other Arrays", "3. Booleans", "4. All of the Above", "4. All of the Above"],
    ['A very useful tool used during development and debugging for printing content ot the debugger is:', '1. Javascript', '2. Terminal / Bash', '3. For Loops', '4. Console.log', '4. Console.log']
]

var correctAnswers = [3, 2, 4, 4];
var timer = 75;
var questionNum = 0;


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
// to get questions. the index thru to print answer choice buttons. 
function printQuestion() {
    console.log('questionNum is', questionNum);
    console.log('completeQuiz os', completeQuiz)
    if (questionNum < completeQuiz.length  && timer != 0){
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
            // ^check if the element clicked is one of the elements you want to handle 
            //  if it's not one of the 'buttons', do nothing
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
    // Sets timer
    timerID = setInterval(function() {
      timer--;
      timerEl.textContent = ("Time: " + timer + 's')
      if (timer <= 0) {
        document.querySelectorAll('.answerButton').forEach(e => e.remove());
        gameOver();
        }
    }, 1000);
  }


//checks if inputted answer is correct or not. if wrong then  subtract 10 from timer (not added yet)
function rightOrWrong() {
    if (clickedAnswer == correctAnswers[questionNum]) {
        feedback.textContent = 'Correct!'
        setTimeout(function(){
            document.getElementById("feedback").innerHTML = '';
        }, 3000);
    }
    else {
        feedback.textContent = 'False!'
        setTimeout(function(){
            document.getElementById("feedback").innerHTML = '';
        }, 3000);
        timer = timer -10;
        timerEl.textContent = ("Time: " + timer + 's')
    }
    questionNum = questionNum + 1;
    document.querySelectorAll('.answerButton').forEach(e => e.remove());
    printQuestion();
    return;
}

function gameOver() {
printQuizEl.textContent = 'All Done!'
finalScore = document.createElement("p");
finalScore.classList.add('finalscore');
document.body.appendChild(finalScore);
finalScore.textContent = 'Your final score is ' + timer + '.';
clearInterval(timerID);
nameForm.className = 'row g-3';
setScore();
}

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

  function setName(){
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
function printScores(){ 
for (i=0; i < storedNames.length; i++){
    var scores = document.querySelector('.scores')
    //var selectBubble = document.createElement("button");
    scores.textContent =  storedNames[i] + ' - ' + storedScores[i];

}
}
/// need to only save score if name is inputted

subButton.addEventListener("click",setName, setScore);
startBtnEl.addEventListener("click", startQuiz); // add start button function to the button 
init(); // just a call

