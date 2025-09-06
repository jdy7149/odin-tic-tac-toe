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

    const printBoard = console.log(board);

    const getBoard = () => board;

    const placeToken = (row, column, token) => {

    }



    return {printBoard, getBoard};
}

function createCell() {
    let value = null;

    const addToken = (token) => value = token;

    const getValue = () => value;

    return {
        addToken,
        getValue
    }
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
    const board = createGameboard();
    
    const players = [
        {
            name: name1,
            token: 'O'
        },
        {
            name: name2,
            token: 'X'
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const getNewRoundText = () => {
        board.printBoard();
        return `${activePlayer.name}'s turn.`;
    }

}