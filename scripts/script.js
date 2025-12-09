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
    
    const getSymbol = (index) => {
        const cell = getCell(index)
        if (cell.isEmpty()) {
            return "";
        } else {
            return GameLogic.getPlayerSymbol(cell.getPlayer());
        }
    }

    initializeBoard();

    return { initializeBoard, getBoard, getCell, getSymbol };
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

        if ( cell != null && cell.isEmpty() ) {
            cell.setPlayer(currentPlayer);
            gameLogicAfterMove();
        }
    }

    const gameLogicAfterMove = () => {
        DisplayController.displayBoard();
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
        return winConditions.some(allOccupiedByCurrentPlayer);
    }

    const checkDraw = () => {
        return movesTaken == 9;
    }
 
    const allOccupiedByCurrentPlayer = (indicesArrray) => {
        return indicesArrray.every(occupiedByCurrentPlayer);
    }

    const occupiedByCurrentPlayer = (index) => {
        return GameBoard.getCell(index).getPlayer() === currentPlayer;
    }

    const getPlayerSymbol = (player) => {
        return (player === players["x"]) ? "X" : "O" ;
    }

    const resetGame = () => {
        GameBoard.initializeBoard();
        currentPlayer = players["x"];
        movesTaken = 0;
    }

    return { makeMove, getPlayerSymbol, resetGame }
})();

const DisplayController = (function () {
    const displayBoard = () => {
        for (let index = 0; index < GameBoard.getBoard().length; ++index) {
            displayCell(index, GameBoard.getSymbol(index));
        }
    }

    const displayCell = (index, symbol) => {
        const displayCell = document.querySelector(`.cell:nth-child(${index + 1}) button`);
        displayCell.textContent = symbol;
    }

    const addEventListenersToCells = () => {
        const cells = document.querySelectorAll(' .cell button ');
        cells.forEach(addListener);
    }

    const addListener = (cell) => {
        cell.addEventListener('click', triggerMove)
    }

    const triggerMove = (event) => {
        GameLogic.makeMove(event.target.id)
    }

    const addResetGameListener = () => {
        const buttons = document.querySelectorAll('button.reset')
        buttons.forEach(addResetListener)
    }

    const addResetListener = (button) => {
        button.addEventListener('click', triggerReset)
    }

    const triggerReset = () => {
        GameLogic.resetGame();
        displayBoard();
    }

    return { displayBoard, addEventListenersToCells, addResetGameListener }
})();

document.addEventListener('DOMContentLoaded', () => {
    DisplayController.addEventListenersToCells();
    DisplayController.addResetGameListener();
})
