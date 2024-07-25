document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const popup = document.getElementById('popup');
    const winnerMessage = document.getElementById('winnerMessage');
    const restartButton = document.getElementById('restartButton');
    
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    function checkWinner() {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes(null) ? null : 'Empate';
    }
    
    function handleCellClick(e) {
        const index = e.target.getAttribute('data-index');
        if (!board[index] && !popup.classList.contains('show')) {
            makeMove(index, currentPlayer);
            const winner = checkWinner();
            if (!winner) {
                currentPlayer = 'O';
                setTimeout(systemMove, 500);
            } else {
                endGame(winner);
            }
        }
    }
    
    function makeMove(index, player) {
        board[index] = player;
        cells[index].textContent = player;
        cells[index].style.color = player === 'X' ? '#fff' : '#f00';
    }
    
    function systemMove() {
        const availableMoves = board
            .map((cell, index) => (cell === null ? index : null))
            .filter(index => index !== null);
        const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        makeMove(move, currentPlayer);
        const winner = checkWinner();
        if (winner) {
            endGame(winner);
        } else {
            currentPlayer = 'X';
        }
    }
    
    function endGame(winner) {
        winnerMessage.textContent = winner === 'Empate' ? 'Empate' : `Ganador: ${winner}`;
        popup.classList.add('show');
    }
    
    function restartGame() {
        board = Array(9).fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.color = '#fff';
        });
        currentPlayer = 'X';
        popup.classList.remove('show');
    }
    
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
});
