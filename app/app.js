'use strict';

import './styles/app.scss';
import Game from './components/Game.js';

document.addEventListener("DOMContentLoaded", function () {

    let container           = document.querySelectorAll('#container')[0],
        startButton         = document.querySelectorAll('#start')[0],
        levelButtons        = document.querySelectorAll('.level'),
        scoreElement        = document.querySelectorAll('#current-score')[0],
        movesElement        = document.querySelectorAll('#moves')[0],
        scoreBoardElement   = document.querySelectorAll('#scoreboard-table')[0],
        stopwatchElement    = document.querySelectorAll('#stopwatch')[0],
        scoreboard          = {},
        numberOfCards,
        game;

    function gameReset() {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        document.body.classList.remove('body--win');
        movesElement.innerHTML = `Moves taken 0`;
        scoreElement.innerHTML = `0 / ${numberOfCards / 2}`;
    }

    startButton.addEventListener('click', function () {
        if (typeof game === 'object') {
            game.stopwatch.stop();
        }
        gameReset();

        this.classList.add('start--hide');

        levelButtons.forEach((el) => {
            el.classList.add('level--show');
        });

    });

    levelButtons.forEach((el) => {
        el.addEventListener('click', function () {
            let level = this.getAttribute('data-level');

            switch(level) {
                case 'easy':
                    numberOfCards = 12;
                    container.setAttribute('data-level', level);
                    break;
                case 'normal':
                    numberOfCards = 30;
                    container.setAttribute('data-level', level);
                    break;
                case 'hard':
                    numberOfCards = 48;
                    container.setAttribute('data-level', level);
                    break;
                default:
                    break;
            }

            levelButtons.forEach((el) => {
                el.classList.remove('level--show');
            });
            startButton.classList.remove('start--hide');

            game = new Game(container, numberOfCards, scoreElement, movesElement, stopwatchElement);
            game.render();
        });
    });

});