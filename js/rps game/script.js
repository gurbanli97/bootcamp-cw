var userScore = 0;
var compScore = 0;

var choices = ['r', 'p', 's']


window.onkeypress = function (e) {


    var myChoice = e.key;
    var compChoice = choices[Math.floor(Math.random() * choices.length)];
    console.log('myChoice: ' + e.key)
    console.log('compChoice: ' + compChoice)


    function finalResult() {
        if (choices.indexOf(e.key) === -1) {
            console.log('You cant play')
        } else if (myChoice === compChoice) {
            console.log('Draw!')
        } else if (myChoice === 'p' && compChoice === 'r' || myChoice === 'r' && compChoice === 's' || myChoice === 's' && compChoice === 'p') {
            console.log('User score: ' + (++userScore) + " User Won")
            console.log('Comp score: ' + compScore)
        } else if (myChoice === 'r' && compChoice === 'p' || myChoice === 'p' && compChoice === 's' || myChoice === 's' && compChoice === 'r') {
            console.log('User score: ' + userScore)
            console.log('Comp score: ' + (++compScore)  + " Comp Won")
        }
    }

    finalResult();
}

