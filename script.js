const board = Array(9).fill("");
const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
let replayButton = document.createElement("button");
replayButton.textContent = "Restart Game";
let gameOver = false;

function checkWinner() {
    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // cols
        [0, 4, 8],
        [2, 4, 6] // diagonals
    ];

    // if you have the same character in any of the above combinations- you have a winner. Write the for loop


    // let inputArray = ['0','X','0','X','0','X','0','0','X']
    // for(let i=0; i<wins.length; i++) {
    //     let winArr = wins[i]; // [0, 1, 2] [3,4,5];
    //     if(inputArray[winArr[0]] === inputArray[winArr[1]] && inputArray[winArr[1]] === inputArray[winArr[2]]) return true;
    // }
    /*
    Input Array:
    [0 X 0
    X 0 X
    0 0 X]
    */

    for (let i = 0; i < wins.length; i++) {
        let combo = wins[i];
        const a = combo[0];
        const b = combo[1];
        const c = combo[2];
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            gameOver = true;
            status.textContent = `${board[a]} wins!`;
            document.body.appendChild(replayButton);
            return;
        }
    }

    if (!board.includes("")) {
        gameOver = true;
        status.textContent = "It's a draw!";
        document.body.appendChild(replayButton);
    }
}

replayButton.addEventListener("click", () => {
    window.location.reload();
})

function botMove() {
    let emptyIndices = board.map((val, idx) => val === "" ? idx : null).filter(v => v !== null);
    if (emptyIndices.length === 0 || gameOver) return;

    let randIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    board[randIndex] = "O";
    cells[randIndex].textContent = "O";
    checkWinner();
}

replayButton.remove();

cells.forEach((cell, idx) => {
    cell.addEventListener("click", () => {
        if (board[idx] === "" && !gameOver) {
            board[idx] = "X";
            cell.textContent = "X";
            checkWinner();
            if (!gameOver) {
                status.textContent = "Your move: O";
                setTimeout(() => {
                    if (!gameOver) {
                        botMove();
                        status.textContent = "Your move: X";
                    }
                }, Math.random() * 2000); // bot moves in 0-2 sec
            }
        }
    });
});