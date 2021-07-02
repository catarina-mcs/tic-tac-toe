const squares = Array.from(document.getElementsByClassName('square'));
let player1Active = true;
let player1Sequence = [];
let player2Sequence = [];
let winningSequences = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

squares.forEach(square => square.addEventListener('click', handleClick));

function handleClick(e) {
    const squareIndex = squares.indexOf(e.target);

    if (player1Active) {
        squares[squareIndex].textContent = 'x';
        player1Sequence.push(squareIndex + 1);
        player1Sequence.length >= 3 && checkWinner();
    } else {
        squares[squareIndex].textContent = 'o';
        player2Sequence.push(squareIndex + 1);
        player2Sequence.length >= 3 && checkWinner();
    }

    e.target.removeEventListener('click', handleClick);
    player1Active = !player1Active;
}

function checkWinner() {
    let player1Wins, player2Wins, matches;

    for (const sequence of winningSequences) {
        matches = 0;

        if (player1Active) {
            player1Sequence.forEach(value => {
                if (sequence.includes(value)) matches++;
            });
        } else {
            player2Sequence.forEach(value => {
                if (sequence.includes(value)) matches++;
            });
        }

        if (matches === 3) {
            if (player1Active) player1Wins = true;
            else player2Wins = true;
            break;
        }
    }

    if (player1Wins || player2Wins) {
        squares.forEach(square =>
            square.removeEventListener('click', handleClick)
        );
        player1Wins
            ? console.log('player 1 wins')
            : console.log('player 2 wins');
    }
}
