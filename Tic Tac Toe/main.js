//⭕ 
//✖️
// Initialize variables
let currentPlayer = '✖️';
let playerXName = "";
let playerOName = "";
let gameOver = true;
let moves = 0;
const cells = document.querySelectorAll('.cell');
const playerNamesForm = document.getElementById('playerNamesForm');
const gameInfo = document.getElementById('gameInfo');
const guest = document.getElementById('guest');
const playerO = document.getElementById('playerOName');
const playerX = document.getElementById('playerXName');


// Function to handle the submission of the player names form
playerNamesForm.addEventListener('submit', function(event) {
  event.preventDefault();
  playerXName = document.getElementById('playerXName').value;
  playerOName = document.getElementById('playerOName').value;
  showGameInfo();
  resetGame();
  closeModalStart();
});

//Listener to play as a guest
guest.addEventListener('input', (e) => {
  if (e.target.checked){
    playerX.value = "Guest 1"
    playerX.disabled = true;
    playerO.value = "Guest 2";
    playerO.disabled = true;
  } else {
    playerX.value = ""
    playerX.disabled = false;
    playerO.value = "";
    playerO.disabled = false;
  }
});

// Function to show the game information
function showGameInfo() {
  gameInfo.textContent = 'Current player: ' + getPlayerName(currentPlayer) + ' (' + currentPlayer + ')';
  gameInfo.style.display = 'block';
}

// Function to handle a move on a cell
function makeMove(cellIndex) {
  
  if (!gameOver && cells[cellIndex].innerHTML === '') {
    cells[cellIndex].innerHTML = currentPlayer;
    cells[cellIndex].classList.add('player-' + currentPlayer);

    // Check for win or tie
    checkWin();
    checkTie();

    // Switch players
    currentPlayer = currentPlayer === '✖️' ? '⭕' : '✖️';

    // Update game information
    gameInfo.textContent = 'Current player: ' + getPlayerName(currentPlayer) + ' (' + currentPlayer + ')';
  }
}

// Function to check if there is a winner
function checkWin() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];
 
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;

    if (
      cells[a].innerHTML !== '' &&
      cells[a].innerHTML === cells[b].innerHTML &&
      cells[b].innerHTML === cells[c].innerHTML
    ) {
      gameOver = true;
      showResult('Player ' + currentPlayer + ' (' + getPlayerName(currentPlayer) + ') wins!');
      break;
    }
  }
}

// Function to check if it's a tie
function checkTie() {
  moves++;

  if (moves === 9) {
    gameOver = true;
    showResult('It\'s a tie!');
  }
}

// Function to show the result in a modal 
function showResult(message) {
  const modal = document.getElementById('modal');
  const winnerMessage = document.getElementById('winnerMessage');

  winnerMessage.textContent = message;
  modal.style.display = 'flex';

}

//Close modal 
function closeModal(message) {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  resetGame();
  gameOver = true;
  gameInfo.textContent = "";
  playerXName = "";
  playerOName = "";
}

//Close start form
function closeModalStart() {
  const modal = document.getElementById('modal-start');
  modal.style.display = 'none';
}

//Show start form
function showModalStart() {
  const modal = document.getElementById('modal-start');
  modal.style.display = 'block';
  playerO.disabled = false;
  playerX.disabled = false;
}

// Function to get the player name for 'X' and 'O'
function getPlayerName(player) {
  return player === '✖️' ? playerXName : playerOName;
}

// Function to reset the game
function resetGame() {
  currentPlayer = '✖️';
  resetBoard();
  moves = 0;

  if (!gameOver){
    showGameInfo();
  } else {
    if (playerXName !== "" || playerOName !== ""){
      gameOver = false;
      playerNamesForm.reset();
      showModalStart();
    }
  }
}

//Function reset Board
function resetBoard() {
  let cells = document.getElementsByClassName('cell');
  
  for (let i = 0; i < cells.length; i++){
    cells[i].innerHTML = '';
  }
}





