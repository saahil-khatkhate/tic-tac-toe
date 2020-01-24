const gameCanvas = document.querySelector('#gameCanvas');
const turnIndicator = document.querySelector('#turnIndicator');
const restartButton = document.querySelector('#restartButton');
const resultText = document.querySelector('#resultText');

let gameBoard = new Board({
    size: window.innerWidth * 0.3,
    canvas: gameCanvas
});
gameBoard.setup();

let winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let computerMoves = {};
let result;
let currentPlayer = 0;

const restart = () => {
    gameBoard.reset();
    result = null;
    currentPlayer = 0;
    turnIndicator.style.display = 'block';
    turnIndicator.innerText = 'Your turn';
    restartButton.style.display = 'none';
    resultText.style.display = 'none';
};

const computerTurn = () => {
    let move = minimax(gameBoard, 0, true);
    gameBoard.insert(move.x, move.y, 'o', true);
    gameBoard.drawTokens();
    if (gameBoard.checkWin('o', true)) {
        result = 'Computer Won!!!';
        resultText.innerText = result;
        resultText.style.display = 'block';
        restartButton.style.display = 'block';
        turnIndicator.style.display = 'none';
    } else if (gameBoard.checkTie()) {
        result = 'Tie!!!';
        resultText.innerText = result;
        resultText.style.display = 'block';
        restartButton.style.display = 'block';
        turnIndicator.style.display = 'none';
    } else {
        currentPlayer = 0;
        turnIndicator.innerText = 'Your turn';
    }
};

gameCanvas.addEventListener('click', (event) => {
    let x = Math.floor((event.x - gameCanvas.offsetLeft) / gameBoard.gridSize),
        y = Math.floor((event.y - gameCanvas.offsetTop) / gameBoard.gridSize);
    if (!result && currentPlayer === 0 && gameBoard.testEmpty(x, y)) {
        gameBoard.insert(x, y, 'x');
        gameBoard.drawTokens();
        if (gameBoard.checkWin('x', true)) {
            result = 'You Won!!!';
            resultText.innerText = result;
            resultText.style.display = 'block';
            restartButton.style.display = 'block';
            turnIndicator.style.display = 'none';
        } else if (gameBoard.checkTie()) {
            result = 'Tie!!!';
            resultText.innerText = result;
            resultText.style.display = 'block';
            restartButton.style.display = 'block';
            turnIndicator.style.display = 'none';
        } else {
            currentPlayer = 1;
            turnIndicator.innerText = 'Computer\'s thinking';
            computerTurn();
        }
    }
});