import {vendorLogos} from './vendor-logos';

class Card {
    constructor(index, game, pairNumber) {
        this.index = index;
        this.game = game;
        this.pairNumber = pairNumber;
        this.pairImage = vendorLogos[this.pairNumber - 1];
    }

    handleClick(container, cardElement) {
        const that = this;

        // Turn unmatched cards back over if click on container element
        container.parentElement.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();

            if (that.game.timerActive) {
                that.game.clearNotMatchTimer(that);
            }
        });

        // Handle card event
        cardElement.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();

            // Cancels timer for cards that did not match
            if (that.game.timerActive) {
                that.game.clearNotMatchTimer();
            }

            if (!that.game.gameStart) {
                that.game.start();
            }

            // Return if card is already from a winning pair
            if (this.classList.contains('card--win')) {
                return
            }

            this.classList.add('card--selected');

            that.game.getSelectedCards();
            that.game.checkIfPair();
            that.game.checkIfWin();
        });
    }

    render(container) {
        const card = document.createElement("div"),
              flipper = document.createElement("div"),
              front = document.createElement("div"),
              back = document.createElement("div"),
              image = document.createElement("img");

        card.setAttribute('id', 'card-' + this.index);
        card.setAttribute('class', 'card');
        flipper.setAttribute('class', 'card__flipper');
        front.setAttribute('class', 'card__front');
        back.setAttribute('class', 'card__back');
        image.setAttribute('src', this.pairImage);
        card.appendChild(flipper);
        flipper.appendChild(front);
        flipper.appendChild(back);
        front.appendChild(image);
        this.handleClick(container, card);

        return card;
    }
}

export default Card;