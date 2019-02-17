import Card from './Card';
import Stopwatch from './Stopwatch';

class Game {
    constructor(container, numberOfCards, scoreElement, movesElement, stopwatchElement) {
        this.container = container;
        this.numberOfCards = numberOfCards;
        this.scoreElement = scoreElement;
        this.movesElement = movesElement;
        this.moves = 0;
        this.pairsMatched = 0;
        this.gameStart = false;
        this.stopwatchElement = stopwatchElement;
        this.stopwatch = new Stopwatch(this.stopwatchElement);
        this.timerActive = false;
        this.pairNotMatchTimer = null;
        this.selectedCards = null;
    }

    start() {
        this.gameStart = true;
        this.stopwatch.start();
    }

    updateMoves() {
        this.moves++;
        this.movesElement.innerHTML = `Moves taken ${this.moves}`;
    }

    updateScore() {
        this.pairsMatched++;
        this.scoreElement.innerHTML = `${this.pairsMatched} / ${this.numberOfCards / 2}`;
    }

    getSelectedCards() {
        this.selectedCards = document.querySelectorAll('.card--selected');
    }

    checkIfPair() {
        if (this.selectedCards.length > 1) {
            if (this.selectedCards[0].innerHTML === this.selectedCards[1].innerHTML) {
                this.pairMatch();
            } else {
                this.pairNotMatch();
            }
        }
    }

    pairMatch() {
        for (let i = 0; i < this.selectedCards.length; i++) {
            this.selectedCards[i].classList.add('card--win');
            this.selectedCards[i].classList.remove('card--selected');
        }

        this.updateMoves();
        this.updateScore();
    }

    pairNotMatch() {
        for (let i = 0; i < this.selectedCards.length; i++) {
            this.selectedCards[i].classList.add('card--not-match');
        }

        this.updateMoves();
        this.timerActive = true;

        // Sets timer for unmatched cards to be visible
        this.pairNotMatchTimer = setTimeout(() => {
            this.timerActive = false;

            this.unselectCardPair(this.selectedCards);
        }, 2000);
    }

    unselectCardPair() {
        for (let i = 0; i < this.selectedCards.length; i++) {
            this.selectedCards[i].classList.remove('card--not-match');
            this.selectedCards[i].classList.remove('card--selected');
        }
    }

    // Cancels timer for unmatched cards to be visible
    clearNotMatchTimer() {
        clearTimeout(this.pairNotMatchTimer);
        this.timerActive = false;

        this.unselectCardPair(this.selectedCards);
    }

    checkIfWin() {
        if (this.pairsMatched === this.numberOfCards / 2) {
            this.win();
        }
    }

    win() {
        this.stopwatch.stop();
        this.winAnimation();
    }

    winAnimation() {
        let cardsMatched = document.querySelectorAll('.card--win');

        for (let i = 0; i < cardsMatched.length; i++) {
            setTimeout(() => {
                cardsMatched[i].classList.add('card--spin');
            }, i * 100);
        }
    }

    shuffleCards(array) {
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
        this.movesElement.innerHTML = `Moves taken 0`;
        this.scoreElement.innerHTML = `0 / ${this.numberOfCards / 2}`;

        const allCards    = [],
              halfOfCards = this.numberOfCards / 2;

        // Set pairing of card elements
        for (let i = 1; i <= this.numberOfCards; i++) {
            const pairNumber = i > halfOfCards ? i - halfOfCards : i,
                  card = new Card(i, this, pairNumber),
                  cardElement = card.render(this.container);

            allCards.push(cardElement);
        }

        this.shuffleCards(allCards);

        for (let i = 0; i < allCards.length; i++) {
            this.container.appendChild(allCards[i]);
        }
    }

}

export default Game;