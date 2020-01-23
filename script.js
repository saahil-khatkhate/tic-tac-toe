const canvas = document.querySelector('#gameCanvas');
const c = canvas.getContext('2d');

const turnIndicator = document.querySelector('#turnIndicator');
const restartButton = document.querySelector('#restartButton');
const resultText = document.querySelector('#resultText');

canvas.width = window.innerWidth * 0.35;
canvas.height = window.innerWidth * 0.35;

let boardSize = canvas.width;
let gridSize = boardSize/3;
let tokenThreshold = gridSize/4;

let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let gameBoard = [];

const players = ['x', 'o'];
let currentPlayer;

let result;

const restart = () => {
    c.fillStyle = 'white';
    c.fillRect(0, 0, boardSize, boardSize);

    c.lineWidth = 3;
    c.strokeStyle = 'black';
    c.moveTo(gridSize, 0);
    c.lineTo(gridSize, boardSize);
    c.moveTo(gridSize*2, 0);
    c.lineTo(gridSize*2, boardSize);
    c.moveTo(0, gridSize);
    c.lineTo(boardSize, gridSize);
    c.moveTo(0, gridSize*2);
    c.lineTo(boardSize, gridSize*2);
    c.stroke();

    gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    currentPlayer = 0;
    result = null;
    drawBoard(gameBoard);

    turnIndicator.style.display = 'block';
    turnIndicator.innerText = 'Your turn';
    restartButton.style.display = 'none';
    resultText.style.display = 'none';
};

const drawBoard = (board) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === players[1]) {
                let x = j * gridSize + gridSize/2,
                    y = i * gridSize + gridSize/2
                    r = gridSize/2 - tokenThreshold;

                c.beginPath();
                c.strokeStyle = 'black';
                c.arc(x, y, r, Math.PI*2, false);
                c.stroke();
                c.closePath();
            } else if (board[i][j] === players[0]) {
                let x1 = j * gridSize + tokenThreshold,
                    y1 = i * gridSize + tokenThreshold,
                    x2 = (j+1) * gridSize - tokenThreshold,
                    y2 = (i+1) * gridSize - tokenThreshold;

                c.strokeStyle = 'black'
                c.moveTo(x1, y1);
                c.lineTo(x2, y2);
                c.moveTo(x1, y2);
                c.lineTo(x2, y1);
                c.stroke();
            } else {
                let x = j * gridSize + tokenThreshold/2,
                    y = i * gridSize + tokenThreshold/2,
                    r = gridSize - tokenThreshold;
                
                c.fillStyle = 'white';
                c.fillRect(x, y, r, r);
            }
        }
    }
};

const turn = (event, player, board) => {
    let x = Math.floor(event.x/gridSize),
        y = Math.floor(event.y/gridSize);
    
    if (board[y][x] === '') {
        board[y][x] = players[player];
        drawBoard(board);
    }
};

const checkWin = (player, board) => {
    let state = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            state.push(board[i][j]);
        }
    }
    for (let i = 0; i < wins.length; i++) {
        for (let j = 0; j < 3; j++) {
            if (state[wins[i][j]] !== players[player]) {
                break;
            } else if (j === 2) {
                return true;
            }
        }
    }
    return false;
};

const checkTie = (board) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
};

canvas.addEventListener('click', (event) => {
    if (!result) {
        turn(event, currentPlayer, gameBoard);
        if (checkWin(currentPlayer, gameBoard)) {
            result = currentPlayer === 0 ? 'You Won!!!' : 'Computer Won!!!';
            resultText.innerText = result;
            resultText.style.display = 'block';
            restartButton.style.display = 'block';
            turnIndicator.style.display = 'none';
        } else if (checkTie(gameBoard)) {
            result = 'Tie!!!';
            resultText.innerText = result;
            resultText.style.display = 'block';
            restartButton.style.display = 'block';
            turnIndicator.style.display = 'none';
        }
        currentPlayer = currentPlayer === 0 ? 1 : 0;
        turnIndicator.innerText = currentPlayer === 0 ? 'Your turn' : 'Computer\'s turn';
    }
});

restart();