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

    const incrementScore = () => score++;

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

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const getNewRound = () => {
        gameboard.printBoard();
        switchPlayerTurn();
        console.log(`${activePlayer.getName()}'s turn.`)
    };


    const playRound = (row, column) => {
        if (isEnd) {
            console.log('Game is ended. Please restart game.');
            return;
        }

        if (!gameboard.placeToken(row, column, activePlayer.getToken())) {
            return;
        }

        if (gameboard.checkWin(row, column, activePlayer.getToken())) {
            console.log(`${activePlayer.getName()} wins!`);
            activePlayer.incrementScore();
            console.log(`${players[0].getScore()} : ${players[1].getScore()}`);
            endGame();
            return;
        }

        if (gameboard.checkDraw()) {
            console.log('Draw!');
            console.log(`${players[0].getScore()} : ${players[1].getScore()}`);
            endGame();
            return;
        }
            
        getNewRound();
    };

    return {
        startGame,
        getBoard,
        getActivePlayer,
        playRound,
    };
}

const controller = createGameController();

function createDisplayController() {
    const game = createGameController();
    const resultDiv = document.querySelector('.result');
    const player1Div = document.querySelector('.player1');
    const player2Div = document.querySelector('.player2');
    const boardDiv = document.querySelector('.board');
    const modal = document.querySelector('#modal');

    const updateDisplay = () => {
        
    };
}

document.querySelector('#openModal').addEventListener('click', () => {
    document.querySelector('#modal').showModal();
});

document.querySelector('#closeModal').addEventListener('click', () => {
    document.querySelector('#modal').close();
});