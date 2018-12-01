'use strict';

import './styles/app.scss';
import Game from './components/Game.js';

document.addEventListener("DOMContentLoaded", function () {

    let container           = document.querySelectorAll('#container')[0],
        startButton         = document.querySelectorAll('#start')[0],
        scoreElement        = document.querySelectorAll('#current-score')[0],
        movesElement        = document.querySelectorAll('#moves')[0],
        scoreBoardElement   = document.querySelectorAll('#scoreboard-table')[0],
        stopwatchElement    = document.querySelectorAll('#stopwatch')[0],
        numberOfCards       = 12,
        scoreboard          = {},
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
            console.log('game exists');
            game.stopwatch.stop();
        }
        gameReset();

        game = new Game(container, numberOfCards, scoreElement, movesElement, stopwatchElement);
        game.render();
    });
});