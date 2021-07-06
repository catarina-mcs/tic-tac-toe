const squares = Array.from(document.getElementsByClassName('square'));
const message = document.getElementById('message');
const btnStatus = document.getElementById('btn-status');
const btnReset = document.getElementById('btn-reset');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
let player1Active = true;
let clicks = 0;
let flatMatrix = ['', '', '', '', '', '', '', '', ''];
let player1Score = 0;
let player2Score = 0;

function startGame() {
    player1Active = true;
    clicks = 0;
    flatMatrix = ['', '', '', '', '', '', '', '', ''];

    message.textContent = '';
    btnStatus.style.display = 'none';
    btnStatus.removeEventListener('click', startGame);

    squares.forEach(square => {
        square.addEventListener('click', placeSymbol);
        square.style.cursor = 'pointer';
        square.innerHTML = '';
        square.classList.remove('x', 'o');
    });

    btnReset.addEventListener('click', resetScore);
}

startGame();

function placeSymbol(e) {
    const squareIndex = squares.indexOf(e.target);

    if (player1Active) {
        squares[squareIndex].textContent = 'X';
        squares[squareIndex].classList.add('x');
        flatMatrix.splice(squareIndex, 1, 'x');
    } else {
        squares[squareIndex].textContent = 'O';
        squares[squareIndex].classList.add('o');
        flatMatrix.splice(squareIndex, 1, 'o');
    }

    clicks++;
    clicks >= 3 && checkGameStatus();

    e.target.removeEventListener('click', placeSymbol);
    e.target.style.cursor = 'default';
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

        const emptySquares = sequence.filter(v => v === '').length;

        if (emptySquares >= 2) winneableSequences++;
        else if (emptySquares === 1) {
            const newSequence = sequence.filter(v => v !== '');
            newSequence[0] === newSequence[1] && winneableSequences++;
        }
    }

    if (!winningSequence && winneableSequences === 0) {
        endGame('gameover');
    }
}

function endGame(status) {
    squares.forEach(square => {
        square.removeEventListener('click', placeSymbol);
        square.style.cursor = 'default';
    });

    if (status === 'win') {
        if (player1Active) {
            message.textContent = 'Player 1 has won this round!';
            player1Score++;
            let word = player1Score === 1 ? 'win' : 'wins';
            scoreX.textContent = `${player1Score} ${word}`;
        } else {
            message.textContent = 'Player 2 has won this round!';
            player2Score++;
            let word = player2Score === 1 ? 'win' : 'wins';
            scoreO.textContent = `${player2Score} ${word}`;
        }
    }
    if (status === 'gameover') {
        message.textContent = 'The game is blocked.';
    }

    btnStatus.addEventListener('click', startGame);
    btnStatus.style.display = 'inline-block';
}

function resetScore() {
    player1Score = 0;
    player2Score = 0;
    scoreX.textContent = '0 wins';
    scoreO.textContent = '0 wins';
    btnReset.removeEventListener('click', resetScore);
    startGame();
}
