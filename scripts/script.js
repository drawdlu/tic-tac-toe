const GameBoard = (function () {
    const board = [];

    const initializeBoard = () =>  {
        board.splice(0, board.length)
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

    const printBoard = () => {
        console.log(`${getSymbol(0)} | ${getSymbol(1)} | ${getSymbol(2)}`)
        console.log(`${getSymbol(3)} | ${getSymbol(4)} | ${getSymbol(5)}`)
        console.log(`${getSymbol(6)} | ${getSymbol(7)} | ${getSymbol(8)}`)
    }
    
    const getSymbol = (index) => {
        const cell = getCell(index)
        if (cell.isEmpty()) {
            return "";
        } else {
            return GameLogic.getPlayerSymbol(cell.getPlayer());
        }
    }

    initializeBoard();

    return { initializeBoard, getBoard, getCell, printBoard };
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
    const players = {"x" : createPlayer("Player 1"), "o" : createPlayer("Player 2")};
    let currentPlayer = players["x"];
    const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
                            [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    let movesTaken = 0

    const switchCurrentPlayer = () => {
        currentPlayer = currentPlayer == players["x"] ? players["o"] : players["x"];
    }

    const makeMove = (index) => {
        const cell = GameBoard.getCell(index);

        if ( cell.isEmpty() ) {
            cell.setPlayer(currentPlayer);
            gameLogicAfterMove();
        }
    }

    const gameLogicAfterMove = () => {
        GameBoard.printBoard();
        movesTaken++;

        if (checkWin()) {
            handleWin();
        } else if (checkDraw()) {
            handleDraw();
        } else {
            switchCurrentPlayer();
        }
    }

    const handleWin = () => {
        console.log(`${currentPlayer.getName()} has won the Game!!!`);
    }

    const handleDraw = () => {
        console.log("You have reached a draw.");
    }

    const checkWin = () => {
        for (let i = 0; i < winConditions.length; ++i) {
            if( allOccupiedByCurrentPlayer(winConditions[i]) ) {
                return true;
            }
        }

        return false;
    }

    const checkDraw = () => {
        if (movesTaken == 9) {
            return true;
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

    const getPlayerSymbol = (player) => {
        if (player === players["x"]) {
            return "X";
        } else {
            return "O";
        }
    }

    const resetGame = () => {
        GameBoard.initializeBoard();
        currentPlayer = players["x"];
        movesTaken = 0;
    }

    return { makeMove, getPlayerSymbol, resetGame }
})();