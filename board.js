class Board {
    constructor(info) {
        if (info.size) {
            this.size = info.size;
            this.gridSize = this.size/3;
            this.tokenThreshold = this.gridSize/4;
        }
        if (info.canvas) {
            this.canvas = info.canvas;
            this.canvas.width = this.size;
            this.canvas.height = this.size;
            this.context = this.canvas.getContext('2d');
        }
        if (info.state) {
            this.state = info.state;
        }
    };

    setup() {
        if (!this.state) {
            this.state = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
        }
        if (!this.canvas) {
            let canvas = document.createElement('canvas');
            document.body.appendChild(canvas);
            this.canvas = canvas;
            this.canvas.width = this.size;
            this.canvas.height = this.size;
            this.context = this.canvas.getContext('2d');
        }
        this.drawBoard();
        this.drawTokens();
    };

    drawBoard() {
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.size, this.size);

        this.context.lineWidth = 3;
        this.context.strokeStyle = 'black';
        this.context.moveTo(this.gridSize, 0);
        this.context.lineTo(this.gridSize, this.size);
        this.context.moveTo(this.gridSize*2, 0);
        this.context.lineTo(this.gridSize*2, this.size);
        this.context.moveTo(0, this.gridSize);
        this.context.lineTo(this.size, this.gridSize);
        this.context.moveTo(0, this.gridSize*2);
        this.context.lineTo(this.size, this.gridSize*2);
        this.context.stroke();
    };

    drawTokens() {
        let board = this.state;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === 'o') {
                    let x = j * this.gridSize + this.gridSize/2,
                        y = i * this.gridSize + this.gridSize/2,
                        r = this.gridSize/2 - this.tokenThreshold;
    
                    this.context.beginPath();
                    this.context.strokeStyle = 'black';
                    this.context.lineWidth = 3;
                    this.context.arc(x, y, r, Math.PI*2, false);
                    this.context.stroke();
                    this.context.closePath();
                } else if (board[i][j] === 'x') {
                    let x1 = j * this.gridSize + this.tokenThreshold,
                        y1 = i * this.gridSize + this.tokenThreshold,
                        x2 = (j+1) * this.gridSize - this.tokenThreshold,
                        y2 = (i+1) * this.gridSize - this.tokenThreshold;
                    
                    this.context.beginPath();
                    this.context.strokeStyle = 'black'
                    this.context.lineWidth = 3;
                    this.context.moveTo(x1, y1);
                    this.context.lineTo(x2, y2);
                    this.context.moveTo(x1, y2);
                    this.context.lineTo(x2, y1);
                    this.context.stroke();
                    this.context.closePath();
                } else {
                    let x = j * this.gridSize + this.tokenThreshold/2,
                        y = i * this.gridSize + this.tokenThreshold/2,
                        r = this.gridSize - this.tokenThreshold;
                    
                    this.context.fillStyle = 'white';
                    this.context.fillRect(x, y, r, r);
                }
            }
        }
    };

    getAvailableSpaces() {
        let empty = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.state[i][j] === '') empty.push({x: j, y: i});
            }
        }
        return empty;
    };

    checkTie() {
        return this.getAvailableSpaces().length === 0 ? true : false;
    };

    checkWin(token, draw) {
        let singleArrayState = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                singleArrayState.push(this.state[i][j]);
            }
        }
        for (let i = 0; i < winCombos.length; i++) {
            for (let j = 0; j < 3; j++) {
                if (singleArrayState[winCombos[i][j]] !== token) {
                    break;
                } else if (j === 2) {
                    draw ? this.drawWinLine(winCombos[i], token) : null;
                    return true;
                }
            }
        }
        return false;
    };

    reset() {
        this.state = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.context.clearRect(0, 0, this.size, this.size);
        this.setup();
    };

    insert(x, y, token) {
        this.state[y][x] = token;
    };

    testEmpty(x, y) {
        return (this.state[y][x] === '');
    };

    drawWinLine(winCombo, token) {
        let boxes = [];
        winCombo.forEach(space => {
            switch (space) {
                case 0: boxes.push({ x: 0, y: 0 }); break;
                case 1: boxes.push({ x: 1, y: 0 }); break;
                case 2: boxes.push({ x: 2, y: 0 }); break;
                case 3: boxes.push({ x: 0, y: 1 }); break;
                case 4: boxes.push({ x: 1, y: 1 }); break;
                case 5: boxes.push({ x: 2, y: 1 }); break;
                case 6: boxes.push({ x: 0, y: 2 }); break;
                case 7: boxes.push({ x: 1, y: 2 }); break;
                case 8: boxes.push({ x: 2, y: 2 }); break;
            }
        });
        boxes.forEach(box => {
            if (token === 'x') {
                let x1 = box.x * this.gridSize + this.tokenThreshold,
                        y1 = box.y * this.gridSize + this.tokenThreshold,
                        x2 = (box.x+1) * this.gridSize - this.tokenThreshold,
                        y2 = (box.y+1) * this.gridSize - this.tokenThreshold;
                
                this.context.beginPath();
                this.context.strokeStyle = 'red'
                this.context.lineWidth = 4;
                this.context.moveTo(x1, y1);
                this.context.lineTo(x2, y2);
                this.context.moveTo(x1, y2);
                this.context.lineTo(x2, y1);
                this.context.stroke();
                this.context.closePath();
            } else {
                let x = box.x * this.gridSize + this.gridSize/2,
                        y = box.y * this.gridSize + this.gridSize/2,
                        r = this.gridSize/2 - this.tokenThreshold;
    
                this.context.beginPath();
                this.context.strokeStyle = 'red';
                this.context.lineWidth = 4;
                this.context.arc(x, y, r, Math.PI*2, false);
                this.context.stroke();
                this.context.closePath();
            }
        });
    }
};