import Card from './Card';
import Stopwatch from './Stopwatch';

class Game {
    constructor(container, number, scoreElement, movesElement, stopwatchElement) {
        this.container = container;
        this.number = number;
        this.scoreElement = scoreElement;
        this.movesElement = movesElement;
        this.moves = 0;
        this.pairsMatched = 0;
        this.gameStart = false;
        this.stopwatchElement = stopwatchElement;
        this.stopwatch = {};
        this.gameWon = false;
    }

    updateMoves() {
        this.moves++;
        this.movesElement.innerHTML = `Moves taken ${this.moves}`;
    }

    updateScore() {
        this.pairsMatched++;
        this.scoreElement.innerHTML = `${this.pairsMatched} / ${this.number / 2}`;
    }

    shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    render() {
        let numberOfCards = this.number,
            allCards    = [],
            halfOfCards = numberOfCards / 2;

        for (let i = 1; i <= numberOfCards; i++) {
            let pairNumber = i;

            if (i > halfOfCards) {
                pairNumber = i - halfOfCards
            }

            this.stopwatch = new Stopwatch(this.stopwatchElement);

            const card = new Card(i, pairNumber, this);
            const cardElement = card.render(this.container);

            allCards.push(cardElement);
        }

        this.shuffle(allCards);

        for (let i = 0; i < allCards.length; i++) {
            this.container.appendChild(allCards[i]);
        }
    }

}

export default Game;