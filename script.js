function createGameboard() {
    const row = 3;
    const column = 3;
    const board = [];

    for (let i = 0; i < row; i++) {
        board.push([]);
        for (let j = 0; j < column; j++) {
            board[i].push(createCell());
        }
    }

    const printBoard = console.log(board);

    const getBoard = () => board;

    return {printBoard, getBoard};
}

function createCell() {
    let value = null;

    const addToken = (token) => value = token;

    const getValue = () => value;
}

function createGameController(player1, player2) {

}