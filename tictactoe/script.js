// JavaScript logic for Tic-Tac-Toe

const board = document.getElementById("board");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");
const moveSound = document.getElementById("move-sound");

let currentPlayer;
let boardState = Array(9).fill(null);
let isComputerOpponent = true;

function createBoard() {
    board.innerHTML = "";
    boardState.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index;
        cellElement.textContent = cell;
        cellElement.addEventListener("click", handleCellClick);
        board.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (boardState[index] || checkWinner() || (currentPlayer === "O" && isComputerOpponent)) {
        return;
    }

    makeMove(index);

    if (!checkWinner() && isComputerOpponent && currentPlayer === "O") {
        setTimeout(computerMove, 500);
    }
}

function makeMove(index) {
    boardState[index] = currentPlayer;
    document.querySelector(`[data-index='${index}']`).textContent = currentPlayer;

    // Play move sound
    moveSound.currentTime = 0;
    moveSound.play();

    if (checkWinner()) {
        message.textContent = `Speler ${currentPlayer} wint!`;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `Speler ${currentPlayer} is aan de beurt`;
}

function computerMove() {
    const emptyIndices = boardState.map((cell, index) => (cell === null ? index : null)).filter(index => index !== null);

    // Improved AI: Check for winning or blocking moves
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardState[a] === "O" && boardState[b] === "O" && boardState[c] === null) {
            return makeMove(c);
        }
        if (boardState[a] === "O" && boardState[c] === "O" && boardState[b] === null) {
            return makeMove(b);
        }
        if (boardState[b] === "O" && boardState[c] === "O" && boardState[a] === null) {
            return makeMove(a);
        }
    }
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardState[a] === "X" && boardState[b] === "X" && boardState[c] === null) {
            return makeMove(c);
        }
        if (boardState[a] === "X" && boardState[c] === "X" && boardState[b] === null) {
            return makeMove(b);
        }
        if (boardState[b] === "X" && boardState[c] === "X" && boardState[a] === null) {
            return makeMove(a);
        }
    }

    // Default to a random move
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    makeMove(randomIndex);
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function resetGame() {
    boardState = Array(9).fill(null);
    currentPlayer = Math.random() < 0.5 ? "X" : "O";
    message.textContent = `Speler ${currentPlayer} mag beginnen`;
    createBoard();

    if (isComputerOpponent && currentPlayer === "O") {
        setTimeout(computerMove, 500);
    }
}

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

resetButton.addEventListener("click", resetGame);

// Initialize the game
resetGame();
