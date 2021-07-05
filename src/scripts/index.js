const squares = Array.from(document.getElementsByClassName('square'));
const message = document.getElementById('message');
const btnStatus = document.getElementById('btn-status');
let player1Active = true;
let clicks = 0;
let flatMatrix = ['', '', '', '', '', '', '', '', ''];

function startGame() {
    player1Active = true;
    clicks = 0;
    flatMatrix = ['', '', '', '', '', '', '', '', ''];

    message.textContent = '';
    btnStatus.textContent = '';

    squares.forEach(square => {
        square.addEventListener('click', placeSymbol);
        square.innerHTML = '';
    });
}

startGame();

function placeSymbol(e) {
    const squareIndex = squares.indexOf(e.target);

    if (player1Active) {
        squares[squareIndex].innerHTML = '<p class="symbol x">x</p>';
        flatMatrix.splice(squareIndex, 1, 'x');
        clicks++;
        clicks >= 3 && checkGameStatus();
    } else {
        squares[squareIndex].innerHTML = '<p class="symbol y">o</p>';
        flatMatrix.splice(squareIndex, 1, 'o');
        clicks++;
        clicks >= 3 && checkGameStatus();
    }

    e.target.removeEventListener('click', placeSymbol);
    player1Active = !player1Active;
}

function checkGameStatus() {
    const matrixSize = Math.sqrt(flatMatrix.length);
    let rows = [];
    let columns;
    let diagonals = [[], []];
    let start = 0;
    let end = matrixSize;
    let winningSequence;
    let winneableSequences = 0;

    for (let i = 0; i < matrixSize; i++) {
        rows.push(flatMatrix.slice(start, end));
        diagonals[0].push(rows[i][i]);
        diagonals[1].push(rows[i][matrixSize - 1 - i]);
        start += matrixSize;
        end += matrixSize;
    }

    columns = rows[0].map((_, i) => rows.map(v => v[i]));

    let sequences = rows.concat(columns).concat(diagonals);

    for (let sequence of sequences) {
        winningSequence = sequence.reduce((acc, value) => {
            if (acc === value) return acc;
        });

        if (winningSequence) {
            endGame('win');
            break;
        }

        if (sequence.filter(v => v === '').length >= 2) winneableSequences++;
    }

    if (!winningSequence && winneableSequences === 0) {
        endGame('gameover');
    }
}

function endGame(status) {
    squares.forEach(square => square.removeEventListener('click', placeSymbol));

    if (status === 'win') {
        let winner = player1Active ? 'Player 1' : 'Player 2';
        message.textContent = `${winner} has won this round!`;
    }
    if (status === 'gameover') {
        message.textContent = 'The game is blocked.';
    }

    btnStatus.textContent = 'Play Again';
    btnStatus.addEventListener('click', startGame);
}
