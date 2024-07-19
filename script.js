const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

// Function to handle cell click
function cellClickHandler(event) {
  const cellIndex = parseInt(event.target.dataset.cellIndex);
  if (gameBoard[cellIndex] !== '') return; // Cell already filled

  gameBoard[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;
  // Add animation class (optional, if desired)
  // event.target.classList.add('cell-played-animation');

  const winner = checkWinner();
  if (winner) {
    messageElement.textContent = `Winner: ${winner}`;
    messageElement.classList.add(`winner-${winner}`); // Add winner-X or winner-O class
    messageElement.style.display = 'block'; // Make the message visible
    cells.forEach(cell => cell.removeEventListener('click', cellClickHandler));
  } else if (checkTie()) {
    messageElement.textContent = 'Tie!';
    cells.forEach(cell => cell.removeEventListener('click', cellClickHandler));
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageElement.textContent = `Next Player: ${currentPlayer}`;
  }
}

// Function to check for a winning condition
function checkWinner() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const cell1 = gameBoard[condition[0]];
    const cell2 = gameBoard[condition[1]];
    const cell3 = gameBoard[condition[2]];

    if (cell1 === cell2 && cell2 === cell3 && cell1 !== '') {
      return cell1; // Return the winning player
    }
  }

  return null; // No winner yet
}

// Function to check for a tie
function checkTie() {
  // Check if all cells are filled
  return gameBoard.every(cell => cell !== '');
}

// Add event listeners to each cell
cells.forEach(cell => {
  cell.addEventListener('click', cellClickHandler);
});

// Reset button click handler
resetButton.addEventListener('click', () => {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    // Remove any remaining animations (if using animation class)
    // cell.classList.remove('cell-played-animation');
  });
  messageElement.textContent = '';
  cells.forEach(cell => cell.addEventListener('click', cellClickHandler));
});
