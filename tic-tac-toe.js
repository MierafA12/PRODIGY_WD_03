let currentPlayer = 'X'; 
let board = ['', '', '', '', '', '', '', '', '']; 
let moveHistory = []; 
let gameStarted = false; 

const buttons = document.querySelectorAll('.all button');
const historyList = document.getElementById('history-list'); 
const winnerDisplay = document.getElementById('winner'); 
const resetButton = document.getElementById('reset'); 
const startButton = document.getElementById('start'); 

// Handle theme changes
document.getElementById('theme').addEventListener('change', function() {
    const selectedTheme = this.value;
    const buttons = document.querySelectorAll('.all button');

    if (selectedTheme === 'classic') {
        buttons.forEach(btn => {
            btn.style.backgroundColor = 'white';
            btn.style.color = 'black';
            btn.style.fontFamily = 'Arial, sans-serif';
        });
    } else if (selectedTheme === 'fantasy') {
        buttons.forEach(btn => {
            btn.style.backgroundColor = '#FFD700';  
            btn.style.color = '#8B0000';  t
            btn.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';
        });
    } else if (selectedTheme === 'modern') {
        buttons.forEach(btn => {
            btn.style.backgroundColor = '#333';  // Dark background
            btn.style.color = '#FFF';  // White text
            btn.style.fontFamily = 'Helvetica, sans-serif';
        });
    }
});

// Handle button click for game play
function handleClick(event) {
    if (!gameStarted) {
       
        winnerDisplay.textContent = 'Please click the Start button first!';
        return;
    }

    const button = event.target.closest('button'); 
    const index = Array.from(buttons).indexOf(button); 

    
    if (board[index] === '' && !winnerDisplay.textContent.includes('wins')) {
        button.textContent = currentPlayer; 
        board[index] = currentPlayer; 

      
        moveHistory.push(`Player ${currentPlayer} clicked cell ${index + 1}`);
        updateHistory();

       
        checkWinner();

       
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}


function updateHistory() {
    historyList.innerHTML = ''; 
    moveHistory.forEach(move => {
        const listItem = document.createElement('li');
        listItem.textContent = move;
        historyList.appendChild(listItem);
    });
}


function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
           [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

   
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winnerDisplay.textContent = `Player ${currentPlayer} wins!`;
            gameStarted = false; 
            return;
        }
    }

   
    if (board.every(cell => cell !== '')) {
        winnerDisplay.textContent = 'It\'s a draw!';
        gameStarted = false;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    moveHistory = []; 
    winnerDisplay.textContent = ''; 

   
    buttons.forEach(button => {
        button.textContent = '';
    });

    historyList.innerHTML = ''; 
    currentPlayer = 'X'; 
    gameStarted = false; 

    startButton.disabled = false; 
}


function startGame() {
    if (gameStarted) return; 

    resetGame(); 
    gameStarted = true; 
    winnerDisplay.textContent = 'Game started!';
    startButton.disabled = true; 
}


buttons.forEach(button => {
    button.addEventListener('click', handleClick);
});
resetButton.addEventListener('click', resetGame);
startButton.addEventListener('click', startGame);
