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
            board[index] = currentPlayer;
            e.target.textContent = currentPlayer;
            const winner = checkWinner();
            if (winner) {
                winnerMessage.textContent = winner === 'Empate' ? 'Empate' : `Ganador: ${winner}`;
                popup.classList.add('show');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }
    
    function restartGame() {
        board = Array(9).fill(null);
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        popup.classList.remove('show');
    }
    
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
});
