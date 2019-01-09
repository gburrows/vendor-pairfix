class Card {
    constructor(index, pairNumber, game) {
        this.index = index;
        this.pairNumber = pairNumber;
        this.game = game;
    }

    pairMatch(cards) {
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.add('card--win');
            cards[i].classList.remove('card--selected');
        }
        this.game.updateMoves();
        this.game.updateScore();
        this.enableGame();
    }

    pairNotMatch(cards) {
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.add('card--not-match');
        }
        this.game.updateMoves();
        setTimeout(() => {
            for (let i = 0; i < cards.length; i++) {
                cards[i].classList.remove('card--not-match');
                cards[i].classList.remove('card--selected');
                this.enableGame();
            }
        }, 600);
    }

    disableGame() {
        this.game.container.classList.add('container--disabled');
    }

    enableGame() {
        this.game.container.classList.remove('container--disabled');
    }

    handleClick(container, element) {
        const that = this;
        element.addEventListener('click', function () {

            if (that.game.gameStart === false) {
                that.game.gameStart = true;
                that.game.stopwatch.start();
            }

            if (this.classList.contains('card--win')) {
                return
            }

            if (this.classList.contains('card--selected')) {
                // Uncomment to let users preview card with no added score
                // this.classList.remove('card--selected');
                return
            }

            this.classList.add('card--selected');

            let selectedCards = document.querySelectorAll('.card--selected');

            if (selectedCards.length > 1) {
                that.disableGame();

                if (selectedCards[0].innerHTML === selectedCards[1].innerHTML) {
                    that.pairMatch(selectedCards);
                } else {
                    that.pairNotMatch(selectedCards);
                }
            }

            let cardsMatched = document.querySelectorAll('.card--win');

            if (cardsMatched.length === container.children.length) {
                that.game.stopwatch.stop();
                that.game.gameWon = true;
                document.body.classList.add('body--win');
            }
        });
    }

    render(container) {
        let card     = document.createElement("div"),
            flipper  = document.createElement("div"),
            front    = document.createElement("div"),
            back     = document.createElement("div");
        card.setAttribute('id', 'card-' + this.index);
        card.setAttribute('class', 'card');
        flipper.setAttribute('class', 'card__flipper');
        front.setAttribute('class', 'card__front');
        front.insertAdjacentHTML('afterbegin', this.pairNumber);
        back.setAttribute('class', 'card__back');
        card.appendChild(flipper);
        flipper.appendChild(front);
        flipper.appendChild(back);
        this.handleClick(container, card);
        return card;
    }

}

export default Card;