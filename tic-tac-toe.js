// Handle theme changes
document.getElementById('theme').addEventListener('change', function() {
    const selectedTheme = this.value;
    const buttons = document.querySelectorAll('button');

    if (selectedTheme === 'classic') {
        buttons.forEach(btn => {
            btn.style.backgroundColor = 'white';
            btn.style.color = 'black';
            btn.style.fontFamily = 'Arial, sans-serif';
        });
    } else if (selectedTheme === 'fantasy') {
        buttons.forEach(btn => {
            btn.style.backgroundColor = '#FFD700';  // Gold background
            btn.style.color = '#8B0000';  // Dark red text
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

// const buttons = document.querySelector('button');	
// const body = document.querySelector('body');

// buttons.addEventListener('click', () => {
//     body.classList.toggle('active');
// }); 

// buttons.addEventListener('mouseenter', function() {
//     body.style.backgroundImage = 'url(o.jpg)';
    
// });

let currentPlayer = 'X'; // Start with 'X'
let board = ['', '', '', '', '', '', '', '', '']; // Represents the 9 cells of the board
let moveHistory = []; // To keep track of the move history

// Get all buttons (the Tic-Tac-Toe cells)
const buttons = document.querySelectorAll('.all button');
const body = document.querySelector('body'); // Get the body element for changing the background
const historyList = document.getElementById('history-list'); // Get the history list element
const winnerDisplay = document.getElementById('winner'); // Get the winner display element

// Function to handle clicks on the Tic-Tac-Toe cells
function handleClick(event) {
    const button = event.target; // Get the clicked button
    const index = Array.from(buttons).indexOf(button); // Get the index of the clicked button

    // Check if the cell is already taken
    if (board[index] === '' && !winnerDisplay.textContent) {
        // Update the button text with the current player's symbol
        button.textContent = currentPlayer;
        // Update the board state
        board[index] = currentPlayer;

        // Add the move to the history and update the UI
        moveHistory.push(`Player ${currentPlayer} clicked cell ${index + 1}`);
        updateHistory();

        // Change the background based on the current player
        if (currentPlayer === 'O') {
            body.style.backgroundImage = "url('o-background.jpg')"; // Replace with your O background image URL
        } else if (currentPlayer === 'X') {
            body.style.backgroundImage = "url('x-background.jpg')"; // Replace with your X background image URL
        }

        // Check for a win or draw
        checkWinner();

        // Switch to the other player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Function to update the move history on the UI
function updateHistory() {
    // Clear the current history
    historyList.innerHTML = '';

    // Append each move to the history list
    moveHistory.forEach(move => {
        const listItem = document.createElement('li');
        listItem.textContent = move;
        historyList.appendChild(listItem);
    });
}

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', handleClick);
});

// Function to check for a winner or a draw
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    // Check if the current player has a winning combination
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winnerDisplay.textContent = `Player ${currentPlayer} wins!`;
            return;
        }
    }

    // Check for a draw (if all cells are filled)
    if (board.every(cell => cell !== '')) {
        winnerDisplay.textContent = 'It\'s a draw!';
    }
}

// Function to reset the game
function resetGame() {
    // Clear the board state
    board = ['', '', '', '', '', '', '', '', ''];
    moveHistory = []; // Clear the move history
    winnerDisplay.textContent = ''; // Clear the winner message

    // Clear the button texts
    buttons.forEach(button => {
        button.textContent = '';
    });

    // Clear the history list
    historyList.innerHTML = '';

    // Reset the background to the default (if you have one)
    body.style.backgroundImage = "url('default-background.jpg')"; // Replace with your default background image
    currentPlayer = 'X'; // Start again with player 'X'
}
