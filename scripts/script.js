const GameBoard = (function () {
    const board = [];

    const initializeBoard = () =>  {
        for (let i = 0; i < 8; ++i) {
            board.push(createCell())
        }
    }

    const getBoard = () => {
        return board;
    }

    const getCell = (index) => {
        return board[index];
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

    const makeMove = (index) => {
        cell = GameBoard.getCell(index);

        if ( cell.isEmpty() ) {
            cell.setPlayer(getCurrentPlayer());
            switchCurrentPlayer();
        }
    }

    return { makeMove }
})();