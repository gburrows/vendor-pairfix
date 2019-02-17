import './styles/app.scss';
import Game from './components/Game.js';

const app = () => {
    // Initialise DOM elements
    const   appElement       = document.querySelectorAll('.app')[0],
            container        = document.querySelectorAll('#container')[0],
            startButton      = document.querySelectorAll('#start')[0],
            levelButtons     = document.querySelectorAll('.level-outer')[0],
            scoreElement     = document.querySelectorAll('#current-score')[0],
            movesElement     = document.querySelectorAll('#moves')[0],
            stopwatchElement = document.querySelectorAll('#stopwatch')[0];
    let     numberOfCards,
            game;

    // Fade in after CSS loads
    setTimeout(() => {
        appElement.setAttribute('style', 'opacity: 1;');
    }, 500);

    function gameReset() {
        if (game && game.stopwatch) {
            game.stopwatch.stop();
        }

        container.innerHTML = '';
    }

    // Set number of cards based on level
    function setCardNumber(level) {
        switch(level) {
            case 'easy':
                numberOfCards = 12;
                break;
            case 'normal':
                numberOfCards = 30;
                break;
            case 'hard':
                numberOfCards = 48;
                break;
            default:
                break;
        }
    }

    startButton.addEventListener('click', function () {
        gameReset();

        this.classList.add('start--hide');
        levelButtons.classList.add('level-outer--show');
    });

    // Start game by selecting level
    levelButtons.childNodes.forEach((el) => {
        el.addEventListener('click', () => {
            const level = el.getAttribute('data-level');
            container.setAttribute('data-level', level);

            setCardNumber(level);

            levelButtons.classList.remove('level-outer--show');
            startButton.classList.remove('start--hide');

            game = new Game(container, numberOfCards, scoreElement, movesElement, stopwatchElement);
            game.render();
        });
    });
};

document.addEventListener('DOMContentLoaded', app);