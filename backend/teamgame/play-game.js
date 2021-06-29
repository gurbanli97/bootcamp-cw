var score = 0;

function getScore () {
    return score;
}

function getOffenseSum (ar) {
    var sum = 0;
    for(var i = 0; i < ar.length; i++) {
        sum += ar[i].offense;
    }

    return sum;
}

function getDefenseSum (ar) {
    var sum = 0;
    for(var i = 0; i < ar.length; i++) {
        sum += ar[i].defense;
    }

    return sum;
}

function replacePlayers (starters, subs) {
    var p1 = starters.pop();
    var p2 = subs.pop();

    starters.unshift(p2);
    subs.unshift(p1);
}

function playGame (starters, subs) {
    var rand1 = Math.floor(Math.random() * 21);
    var rand2 = Math.floor(Math.random() * 21);

    if (getOffenseSum(starters) > rand1) {
        score++;
        replacePlayers(starters, subs);
    }

    if (getDefenseSum(starters) < rand2) {
        score--;
        replacePlayers(starters, subs);
    }
}


module.exports = {
    playGame,
    getScore,
};