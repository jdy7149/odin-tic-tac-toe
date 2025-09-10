function createGameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board.push([]);
        for (let j = 0; j < columns; j++) {
            board[i].push(createCell());
        }
    }

    const printBoard = () => console.log(board.map(row => row.map(cell => cell.getValue())));

    const getBoard = () => board;

    const placeToken = (row, column, token) => {
        if (row < 0 || row >= board.length || column < 0 || column >= board[0].length) {
            console.log('Invalid position');
            return false;
        }
        
        if (board[row][column].getValue()) {
            console.log('Already placed.');
            return false;
        }

        board[row][column].addToken(token);
        return true;
    };

    const checkWin = (row, column, token) => {
        const checkHorizontal = board[row].every(cell => cell.getValue() === token);
        if (checkHorizontal)
            return true;

        const checkVertical = board.every(r => r[column].getValue() === token);
        if (checkVertical)
            return true;
        
        const checkDiagonal = board.every((r, i) => r[i].getValue() === token) || 
            board.every((r, i) => r[r.length - 1 - i].getValue() === token);
        if (checkDiagonal)
             return true;

        return false;
    };

    const checkDraw = () => board.every(row => row.every(cell => cell.getValue()));

    const clearBoard = () => board.forEach(row => row.forEach(cell => cell.addToken('')));

    return {
        printBoard,
        getBoard,
        placeToken,
        checkWin,
        checkDraw,
        clearBoard,
    };
}

function createCell() {
    let value = '';

    const addToken = (token) => value = token;

    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}

function createUser(name, token) {
    let score = 0;

    const incrementScore = () => ++score;

    const getScore = () => score;

    const getName = () => name;

    const getToken = () => token;

    return {
        incrementScore,
        getScore,
        getName,
        getToken
    }
} 

// Controller for game
function createGameController(name1 = 'Player One', name2 = 'Player Two') {
    const gameboard = createGameboard();

    const players = [
        createUser(name1, 'O'),
        createUser(name2, 'X')
    ];

    let activePlayer = players[0];
    let isEnd = false;

    const startGame = () => {
        gameboard.clearBoard();
        activePlayer = players[0];
        isEnd = false;
    };

    const endGame = () => isEnd = true;

    const getBoard = () => gameboard;

    const getPlayers = () => players;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const getNewRound = () => {
        gameboard.printBoard();
        switchPlayerTurn();
        return `${activePlayer.getName()}'s turn.`;
    };


    const playRound = (row, column) => {
        if (isEnd) {
            return 'Game is ended. Please restart game.';
        }

        if (!gameboard.placeToken(row, column, activePlayer.getToken())) {
            return 'Cannot place.';
        }

        if (gameboard.checkWin(row, column, activePlayer.getToken())) {
            activePlayer.incrementScore();
            endGame();
            return `${activePlayer.getName()} wins!`;
        }

        if (gameboard.checkDraw()) {
            endGame();
            return 'Draw!';
        }
            
        return getNewRound();
    };

    return {
        startGame,
        getBoard,
        getPlayers,
        getActivePlayer,
        playRound,
    };
}

// Controller for display
function createDisplayController() {
    let game = null;
    const resultDiv = document.querySelector('.result');
    const player1Div = document.querySelector('.player1');
    const player2Div = document.querySelector('.player2');
    const boardDiv = document.querySelector('.board');
    const modal = document.querySelector('#modal');

    const updateDisplay = () => {
        // Clear board
        while (lastChild = boardDiv.lastElementChild) {
            boardDiv.removeChild(lastChild);
        }

        // Render board
        game?.getBoard().getBoard().forEach((row, i) => {
            row.forEach((cell, j) => {
                const cellBtn = document.createElement('button');
                cellBtn.type = 'button';
                cellBtn.textContent = cell.getValue();
                cellBtn.classList.add('cell');
                cellBtn.dataset.row = i;
                cellBtn.dataset.column = j;
                boardDiv.appendChild(cellBtn);
            });
        });

        player1Div.textContent = game?.getPlayers()[0].getName();
        player2Div.textContent = game?.getPlayers()[1].getName();

        boardDiv.querySelectorAll('.cell')?.forEach(btn => btn.addEventListener('click', evt => {
            const clickedCell = evt.target;

            const result = game?.playRound(+clickedCell.dataset.row, +clickedCell.dataset.column);
            updateDisplay();
            resultDiv.textContent = result;
        }));
    };



    // Event for modal
    modal.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const player1 = modal.querySelector('#player1').value;
        const player2 = modal.querySelector('#player2').value;
        game = createGameController(player1, player2);
        modal.close();
        updateDisplay();
        resultDiv.textContent = '';
    });

    document.querySelector('#openModal').addEventListener('click', () => {
        document.querySelector('#modal').showModal();
    });

    document.querySelector('#closeModal').addEventListener('click', () => {
        document.querySelector('#modal').close();
    });

    modal.addEventListener('close', () => modal.querySelector('form').reset());
}

createDisplayController();

