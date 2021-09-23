//starting variables 
var startBtnEl = document.querySelector(".start-button");
var timerEl = document.querySelector('.timer')
var printQuizEl = document.querySelector('.startQuiz')
var feedback = document.querySelector('.feedback')
var clickedAnswer = document.querySelector('.answerButton')
var selectBubble;



//arrays of arrays of questions and their answers. easy indexing 
var completeQuiz = [
    ['Commonly used types of data DO NOT include:', "1. Strings", "2. Booleans", "3. Alerts", "4. Numbers", "3. Alerts"],
    ['The condition in an if/else statement is enclosed within ____.', "1. Quotes", "2. Curly Brackets", "3. Parentheses", "4. Square Brackets", "2. Curly Brackets"],
    ['Arrays in Javascript can be used to store ____.', "1. Numbers and Strings", "2. Other Arrays", "3. Booleans", "4. All of the Above", "4. All of the Above"]
    ['A very useful tool used during development and debugging for printing content ot the debugger is:', '1. Javascript', '2. Terminal / Bash', '3. For Loops', '4. Console.log', '4. Console.log']
]

var correctAnswers = [3, 2, 4, 4];
var timer = 75;
var questionNum = 0;


function init() {
    //get names and scores for leaderboard page. maybe two separate functions or one not sure yet 

}

//when start button is clicked the first question is printed to the screen and timer starts
function startQuiz() {
    //  printQuizEl.addEventListener('click', function () {

    printQuestion();
    startTimer();


}

//function to print questions. will iterate thru "completeQuiz" and pull first index of each array element
// to get questions. the index thru to print answer choices
function printQuestion() {
console.log('var is', questionNum)
    if (questionNum > 0) {
        selectBubble.classList.remove('.answerButton');
    }



    for (i = 1; i < completeQuiz[questionNum].length - 1; i++) {
        console.log(questionNum)
        printQuizEl.textContent = completeQuiz[questionNum][0];
        var selectBubble = document.createElement("button");
        selectBubble.classList.add('answerButton');
        selectBubble.setAttribute("id", i);
        document.body.appendChild(selectBubble);
        selectBubble.textContent = completeQuiz[questionNum][i];
        console.log(selectBubble.className);
        console.log(selectBubble)
    }

    (function chooseAnswer() {
        document.body.addEventListener("click", clickButtons);
        // ^ one handler for all clicks
        function clickButtons(evt) {
            const from = evt.target;
            //console.clear();

            if (from.className != 'answerButton') { return; }
            // ^check if the element clicked is one of the elements you want to handle 
            //  if it's not one of the 'buttons', do nothing
            console.log("you clicked " + from.id);
            clickedAnswer = from.id;
            console.log(clickedAnswer)
            rightorWrong();

        }
    }())

}

//start the timer
function startTimer() {
    var timerID = setInterval(timerClick, 1000);
}

function timerClick() {
    if (timer > 0) {
        console.log(timer);
        timer--;
        timerEl.textContent = timer;
        console.log(timerEl);
    }
    else {
        gameOver(); /// add game over function to display scoreboard and final time
        return;
    }

}
//checks if inputted answer is correct or not. if wrong then subtract 10 from timer
function rightorWrong() {
    if (clickedAnswer == correctAnswers[questionNum]) {
        feedback.textContent = 'Correct!'
    }
    else {
        feedback.textContent = 'False!'
    }
    questionNum++;
    printQuestion();

}




startBtnEl.addEventListener("click", startQuiz); // add start button function to the button 

init(); // just a call

