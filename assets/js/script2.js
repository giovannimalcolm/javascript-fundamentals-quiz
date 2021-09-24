var storedScores = localStorage.getItem("setScore");
var storedNames = localStorage.getItem("setName");
var clrbtn = document.querySelector('.clrbtn')
getScore();
getName();

if (storedNames != null && storedScores != null){
printScores();
}

function getScore() {
    storedScores = JSON.parse(localStorage.getItem("setScore"));
    console.log(storedScores)
}


function getName() {
    storedNames = JSON.parse(localStorage.getItem("setName"));
    console.log(storedNames)
}

function printScores() {
    for (i = 0; i < storedNames.length; i++) {
        console.log(i)
        var scores = document.createElement("li");
        scores.classList.add('list-group-item');
        scores.setAttribute("id", scores);
        document.body.appendChild(scores);
        var sum = i + 1
        scores.textContent = sum + '. ' + storedNames[i] + ' - ' + storedScores[i];
        sortScores(storedScores,storedNames);
    }
}

function sortScores() {
    storedNames.sort(function (storedScores, storedNames) {
        return storedScores.indexOf(storedScores) - storedScores.indexOf(storedNames);
    });
    console.log(storedScores)
}

function clearStorage(){
    localStorage.clear();
}


clrbtn.addEventListener("click",clearStorage);
