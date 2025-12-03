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

    const getPlayer = function () {
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