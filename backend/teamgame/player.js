function Player (name, position, offense, defense) {
    this.name = name;
    this.position = position;
    this.offense = offense;
    this.defense = defense;

    this.printStats = function () {
        console.log(`
            Name: ${this.name}; Position: ${this.position}; Offense: ${this.offense}; Defense: ${this.defense}
        `);
    }

    this.goodGame = function () {
        if (Math.floor(Math.random() * 2) === 1) {
            this.offense++;
        } else {
            this.defense++;
        }
    }

    this.badGame = function () {
        if (Math.floor(Math.random() * 2) === 1) {
            this.offense--;
        } else {
            this.defense--;
        }
    }
}

module.exports = Player;