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
    let marker = null;

    const getMarker = function () {
        return marker;
    }

    const setMarker = (value) => {
        if (isEmpty()) {
            marker = value;
        }
    }

    const isEmpty = () => {
        return marker == null ? true : false ;
    }

    return { getMarker, setMarker, isEmpty };
}