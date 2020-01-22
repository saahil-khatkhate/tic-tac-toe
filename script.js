const canvas = document.querySelector('#gameCanvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.35;
canvas.height = window.innerWidth * 0.35;

let boardSize = canvas.width;
let gridSize = boardSize/3;
let tokenThreshold = gridSize/4;

const board = [
    ['x', '', 'o'],
    ['o', 'x', ''],
    ['x', 'o', 'o']
];

const players = ['x', 'o'];

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
}

restart();