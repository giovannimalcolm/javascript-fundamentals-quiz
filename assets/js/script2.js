//starting variables
var storedScores = localStorage.getItem("setScore");
var storedNames = localStorage.getItem("setName");
var clrbtn = document.querySelector('.clrbtn')

//int here again incase user first visits this page 
getScore();
getName();
//if there is something in the local storage then print it
if (storedNames != null && storedScores != null) {
    printScores();
}

function getScore() {
    storedScores = JSON.parse(localStorage.getItem("setScore"));
}


function getName() {
    storedNames = JSON.parse(localStorage.getItem("setName"));
}

function printScores() {
    for (i = 0; i < storedNames.length; i++) {
        var scores = document.createElement("li");
        scores.classList.add('list-group-item');
        scores.setAttribute("id", scores);
        document.body.appendChild(scores);
        var sum = i + 1
        scores.textContent = sum + '. ' + storedNames[i] + ' - ' + storedScores[i];
    }
    sortScores(storedScores, storedNames);
}

function clearStorage() {
    localStorage.clear();
}

function refresh() {
    window.location.href = window.location.href;
}

clrbtn.addEventListener("click", clearStorage); //clear user local storage upon button press
clrbtn.addEventListener("click", refresh); //refresh upon clearing scores
