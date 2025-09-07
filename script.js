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
    }

    const isCheckmate = (row, column, token) => {
        const checkHorizontal = board[row].every(cell => cell.getValue() === token);

        const checkVertical = board.reduce((columnCells, _, i) => {
            columnCells.push(board[i][column]);
            return columnCells;
        }, []).every(cell => cell.getValue() === token);
        
        const checkDiagonal = null;
    }

    return {
        printBoard,
        getBoard,
        placeToken
    };
}

function createCell() {
    let value = null;

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

    const getBoard = () => gameboard;

    const switchPlayerTurn = () => {
        activePlayer = players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const getNewRoundText = () => {
        gameboard.printBoard();
        return `${activePlayer.name}'s turn.`;
    };

    const playRound = (row, column) => {
        gameboard.placeToken(row, column, activePlayer.getToken());


    };

    return {
        getBoard,
        switchPlayerTurn,
        getActivePlayer,
        getNewRoundText
    };
}