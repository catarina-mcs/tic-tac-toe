const squares = Array.from(document.getElementsByClassName('square'));
let player1Active = true;
let player1Turns = 0;
let player2Turns = 0;
let flatMatrix = ['', '', '', '', '', '', '', '', ''];

squares.forEach(square => square.addEventListener('click', handleClick));

function handleClick(e) {
    const squareIndex = squares.indexOf(e.target);

    if (player1Active) {
        squares[squareIndex].innerHTML = '<p class="symbol x">x</p>';
        flatMatrix.splice(squareIndex, 1, 'x');
        player1Turns++;
        player1Turns >= 3 && checkGameStatus();
    } else {
        squares[squareIndex].innerHTML = '<p class="symbol y">o</p>';
        flatMatrix.splice(squareIndex, 1, 'o');
        player2Turns++;
        player2Turns >= 3 && checkGameStatus();
    }

    e.target.removeEventListener('click', handleClick);
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
            console.log('winner');
            break;
        }

        if (sequence.filter(v => v === '').length >= 2) winneableSequences++;
    }

    if (!winningSequence && winneableSequences === 0) console.log('game over');
}
