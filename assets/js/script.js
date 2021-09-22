//starting variables 
var startButton = document.querySelector(".start-button");
var timerEl = document.queryselector('.timer')
var startQuiz = document.queryselector('.startQuiz')


//arrays of arrays of questions and their answers. easy indexing 
var completeQuiz = [
['Commonly used types of data DO NOT include:', "1. Strings", "2. Booleans", "3. Alerts", "4. Numbers", "3. Alerts"],
['The condition in an if/else statement is enclosed within ____.', "1. Quotes", "2. Curly Brackets", "3. Parentheses", "4. Square Brackets", "2. Curly Brackets"],
['Arrays in Javascript can be used to store ____.', "1. Numbers and Strings", "2. Other Arrays", "3. Booleans", "4. All of the Above", "4. All of the Above"]
['A very useful tool used during development and debugging for printing content ot the debugger is:', '1. Javascript', '2. Terminal / Bash', '3. For Loops', '4. Console.log', '4. Console.log']
]

timer = 75;
questionNum = 0;


function init() {
//get names and scores for leaderboard page. maybe two separate functions or one not sure yet 

}

//when start button is clicked the first question is printed to the screen and timer starts
function startQuiz() {
 startButton.addEventListener('click', function(){
     printQuestion();
     startTimer();
 })
}

//function to print questions. will iterate thru "completeQuiz" and pull first index of each array element
// to get questions. the index thru to print answer choices
function printQuestion() {
 startQuiz.textContent = completeQuiz[QuestionNum][0];

 for (i =0; i < completeQuiz[questionNum].length; i++){


 }
}




startButton.addEventListener("click", startQuiz); // add start button function to the button 

init(); // just a call