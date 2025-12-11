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

    const changeName = (newName) => name = newName;

    return { getName, changeName };
}


const GameLogic = (function () {
    const defaultNames = {'x': 'Player X', 'o': 'Player O'}
    const players = {'x' : createPlayer(defaultNames['x']), 'o' : createPlayer(defaultNames['o'])};
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
            DisplayController.showPlayerTurn();
        }
    }

    const handleWin = () => {
        DisplayController.announceResult(`${currentPlayer.getName()} has won the game!!!`)
    }

    const handleDraw = () => {
        DisplayController.announceResult('You have reached a draw.')
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
        DisplayController.displayBoard();
        DisplayController.clearPlayerTurn();
        DisplayController.closeResultDialog();
        DisplayController.showStartDialog();
    }

    const getPlayers = () => players;

    const getDefaultNames = () => defaultNames;

    const getCurrentPlayer = () => currentPlayer;

    return { makeMove, getPlayerSymbol, resetGame, getPlayers, getDefaultNames, getCurrentPlayer }
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

    const closeStartDialog = () => {
        document.querySelector('dialog.start-game').close()
    }

    const showStartDialog = () => {
        updateInputNames();
        document.querySelector('dialog.start-game').showModal()
    }

    const updateInputNames = () => {
        const xPlayerInput = document.querySelector('input#xPlayerName');
        const oPlayerInput = document.querySelector('input#oPlayerName');

        const players = GameLogic.getPlayers();
        const defaultNames = GameLogic.getDefaultNames();
        const xPlayerName = players['x'].getName();
        const oPlayerName = players['o'].getName();

        if (xPlayerName != defaultNames['x']) {
            xPlayerInput.value = xPlayerName;
        } else {
            xPlayerInput.placeholder = xPlayerName;
        }

        if (oPlayerName != defaultNames['o']) {
            oPlayerInput.value = oPlayerName;
        } else {
            oPlayerInput.placeholder = oPlayerName;
        }
    }

    const showPlayerTurn = () => {
        const playerName = GameLogic.getCurrentPlayer().getName();
        const nameContainer = document.querySelector('.player-turn .container');

        nameContainer.textContent = `${playerName}'s Turn`;
    }

    const clearPlayerTurn = () => {
        const nameContainer = document.querySelector('.player-turn .container');
        nameContainer.textContent = '';
    }

    const announceResult = (result) => {
        const resultDialog = document.querySelector('dialog.result')
        const dialogMessageNode = document.querySelector('dialog.result .message')
        dialogMessageNode.textContent = result
        resultDialog.showModal();
    }

    const closeResultDialog = () => {
        const resultDialog = document.querySelector('dialog.result');
        resultDialog.close();
    }

    return { displayBoard, closeStartDialog, showStartDialog, showPlayerTurn, 
            clearPlayerTurn, announceResult, closeResultDialog }
})();


const ButtonsController = ( function() {
    const addEventListenersToCells = () => {
        const cells = document.querySelectorAll(' .cell button ');
        cells.forEach(addCellListener);
    }

    const addCellListener = (cell) => {
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
        button.addEventListener('click', GameLogic.resetGame)
    }

    const addStartEventListener = () => {
        const startForm = document.querySelector('.start-game form')
        startForm.addEventListener('submit', saveNames)
    }

    const saveNames = (e) => {
        e.preventDefault();

        const startForm = document.querySelector('.start-game form');
        const formData = new FormData(startForm);
        const formNames = Object.fromEntries(formData.entries());
        const players = GameLogic.getPlayers();

        if (formNames.oPlayerName != "") {
            players['o'].changeName(formNames.oPlayerName);
        }

        if (formNames.xPlayerName != "") {
            players['x'].changeName(formNames.xPlayerName);
        }

        DisplayController.showPlayerTurn();
        DisplayController.closeStartDialog();
    }

    return {addEventListenersToCells, addResetGameListener, addStartEventListener}
})();


document.addEventListener('DOMContentLoaded', () => {
    ButtonsController.addEventListenersToCells();
    ButtonsController.addResetGameListener();
    ButtonsController.addStartEventListener();

    DisplayController.showStartDialog();
})
