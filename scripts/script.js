const GameBoard = (function () {
    const board = [];

    const initializeBoard = () =>  {
        for (let i = 0; i < 9; ++i) {
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
        player = value;
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
    const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
                            [2, 5, 8], [0, 4, 8], [2, 4, 6]]

    const switchCurrentPlayer = () => {
        currentPlayer = currentPlayer == players[0] ? players[1] : players[0];
    }

    const getCurrentPlayer = () => currentPlayer;

    const makeMove = (index) => {
        cell = GameBoard.getCell(index);

        if ( cell.isEmpty() ) {
            cell.setPlayer(currentPlayer);
        }
    }

    const checkWin = () => {
        for (let i = 0; i < winConditions.length; ++i) {
            if( allOccupiedByCurrentPlayer(winConditions[i]) ) {
                return true;
            }
        }

        return false;
    }

    const allOccupiedByCurrentPlayer = (indicesArrray) => {
        for (let i = 0; i < indicesArrray.length; ++i) {
            if (notOccupiedByCurrentPlayer(indicesArrray[i])) {
                return false;
            }
        }

        return true;
    }

    const notOccupiedByCurrentPlayer = (index) => {
        return GameBoard.getCell(index).getPlayer() !== currentPlayer;
    }

    return { makeMove, checkWin }
})();