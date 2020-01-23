const minimax = (board, depth, maximizing_player) => {
    if (board.checkWin('x')) {
        return (-100) + depth;
    } else if (board.checkWin('o')) {
        return 100 - depth;
    } else if (board.checkTie()) {
        return 0;
    }

    if (depth === 0) {
        computerMoves = {};
    }

    if (maximizing_player) {
        let best = -Infinity;

        board.getAvailableSpaces().forEach(space => {
            let child = new Board({
                size: board.gridSize,
                state: board.state
            });
            child.insert(space.x, space.y, 'o');
            let score = minimax(child, depth+1, false);
            child.insert(space.x, space.y, '');
            best = Math.max(best, score);
            
            if (depth === 0) {
                let index = computerMoves[score] !== undefined ? Array.isArray(computerMoves[score]) ? [space, ...computerMoves[score]] : [space, computerMoves[score]] : space;
                computerMoves[score] = index;
            }
        });

        if (depth === 0) {
            if (Array.isArray(computerMoves[best])) {
                let indices = computerMoves[best];
                index = indices[Math.floor(Math.random() * indices.length)];
            } else {
                index = computerMoves[best];
            }

            return index;
            
        }

        return best;
    } else {
        let best = Infinity;

        board.getAvailableSpaces().forEach(space => {
            let child = new Board({
                size: board.gridSize,
                state: board.state
            });
            child.insert(space.x, space.y, 'x');
            let score = minimax(child, depth+1, true);
            child.insert(space.x, space.y, '');
            best = Math.min(best, score);
            
            if (depth === 0) {
                let index = computerMoves[score] !== undefined ? Array.isArray(computerMoves[score]) ? [space, ...computerMoves[score]] : [space, computerMoves[score]] : space;
                computerMoves[score] = index;
            }
        });

        if (depth === 0) {
            if (Array.isArray(computerMoves[best])) {
                let indices = computerMoves[best];
                index = indices[Math.floor(Math.random() * indices.length)];
            } else {
                index = computerMoves[best];
            }

            return index;
            
        }

        return best;
    }
}