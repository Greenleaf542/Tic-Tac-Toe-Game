const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const restartButton = document.getElementById('restart');
const line = document.getElementById('line');
let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = boardState[winCondition[0]];
        let b = boardState[winCondition[1]];
        let c = boardState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            drawWinningLine(winCondition);
            break;
        }
    }

    if (roundWon) {
        alert(`Player ${currentPlayer} has won!`);
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        alert("Draw");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function drawWinningLine(winCondition) {
    const [start, middle, end] = winCondition;
    const cellStart = cells[start].getBoundingClientRect();
    const cellEnd = cells[end].getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();

    const lineX1 = cellStart.left - boardRect.left + cellStart.width / 2;
    const lineY1 = cellStart.top - boardRect.top + cellStart.height / 2;
    const lineX2 = cellEnd.left - boardRect.left + cellEnd.width / 2;
    const lineY2 = cellEnd.top - boardRect.top + cellEnd.height / 2;

    const angle = Math.atan2(lineY2 - lineY1, lineX2 - lineX1);
    const distance = Math.hypot(lineX2 - lineX1, lineY2 - lineY1);

    line.style.width = `${distance}px`;
    line.style.transform = `rotate(${angle}rad) translateX(${lineX1}px) translateY(${lineY1}px)`;
    line.classList.add('active');
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    line.classList.remove('active');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
