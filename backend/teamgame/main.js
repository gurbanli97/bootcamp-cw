const inquirer = require('inquirer');
var Player = require('./player');
var {playGame, getScore} = require('./play-game');

var starters = [];
var subs = [];

function createPlayer () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'player name'
        },
        {
            type: 'input',
            name: 'position',
            message: "player's position"
        },
        {
            type: 'number',
            name: 'offense',
            message: "player's offense [1-10]",
            validate: function(value) {
                if (isNaN(parseInt(value)) || parseInt(value) < 1 || parseInt(value) > 10) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'number',
            name: 'defense',
            message: "player's defense",
            validate: function(value) {
                if (isNaN(parseInt(value)) || parseInt(value) < 1 || parseInt(value) > 10) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    ]).then(function(answer) {
        var player = new Player(answer.name, answer.position, answer.offense, answer.defense);

        if (starters.length < 3) {
            starters.push(player);
        } else if (subs.length < 2) {
            subs.push(player);
        }
        
        if (starters.length + subs.length < 5) {
            createPlayer();
        } else {
            for(let i = 0; i < 5; i++) {
                playGame(starters, subs);
            }
        }
    });
}

createPlayer();