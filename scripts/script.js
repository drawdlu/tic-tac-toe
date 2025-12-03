const GameBoard = (function () {
    const board = [];

    const initializeBoard = () =>  {
        board.length = 0;

        for (let i = 0; i < 3; ++i) {
            let row = createRow();
            board.push(row);
        }
    }

    const createRow = () => {
        return [ createCell(), createCell() , createCell() ];
    }

    const getBoard = () => {
        return board;
    }

    const getCell = (x, y) => {
        return board[x][y];
    }

    initializeBoard();

    return { initializeBoard, getBoard, getCell };
})();

function createCell () {
    let player = null;

    const getPlayer = () => {
        return player;
    }

    const setPlayer = (value) => {
        if (isEmpty()) {
            player = value;
        }
    }

    const isEmpty = () => {
        return player == null ? true : false ;
    }

    return { getPlayer, setPlayer, isEmpty };
}

function createPlayer (nameValue) {
    let name = nameValue;

    const getName = () => name;

    return { getName };
}

const GameLogic = (function () {
    const players = [createPlayer("Player 1"), createPlayer("Player 2")];
    let currentPlayer = players[0];

    const switchCurrentPlayer = () => {
        currentPlayer = currentPlayer == players[0] ? players[1] : players[0];
    }

    const getCurrentPlayer = () => currentPlayer;

    const makeMove = (x, y) => {
        cell = GameBoard.getCell(x, y);

        if ( cell.isEmpty() ) {
            cell.setPlayer(getCurrentPlayer());
            switchCurrentPlayer();
        }
    }

    return { makeMove }
})();