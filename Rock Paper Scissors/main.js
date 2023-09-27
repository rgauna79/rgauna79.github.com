//Initialize scores variables for Player and Computer
let playerScore = 0;
let computerScore = 0;
let playerBoardScore = document.getElementById("player");
let computerBoardScore = document.getElementById("computer");


//Select All Player Buttons and Listen the choice submitted
const buttons = document.querySelectorAll("button.btn-player");
buttons.forEach(button => {
  button.addEventListener('click', function(){
    playerTurn(button.value);
  });
});

//Select Elements to show the scores and result
const showComputerChoice = document.getElementById("computerChoice");

//Random choice from computer opponent
function getComputerChoice() {
    let choices = ['Rock', 'Paper', 'Scissors'];

    return choices[Math.floor(Math.random() * choices.length)];
}


function playerTurn(playerChoice) {
    let computerSelection = getComputerChoice();
    showComputerChoice.innerHTML = computerSelection;
    showWinnerRound = document.getElementById("winner");
    document.getElementById("playerChoice").innerHTML = playerChoice;
    let result = '';

    //Check if Player or Computer Win Round
    if ((playerChoice === 'Paper' && computerSelection === 'Rock') ||
       (playerChoice === 'Scissors' && computerSelection === 'Paper') ||
       (playerChoice === 'Rock' && computerSelection === 'Scissors')){
        playerScore += 1;
        showWinnerRound.innerHTML = "Player win round";
        playerBoardScore.innerHTML = playerScore;
      
        if (playerScore === 5 ){
            showWinnerRound.innerHTML = "Player win game";
            alert('Player win');
            resetScore();
        }
    } else if (playerChoice === computerSelection) {
        showWinnerRound.innerHTML = "Tie";
    } else {
        computerScore += 1;
        showWinnerRound.innerHTML = "Computer win round";
        computerBoardScore.innerHTML = computerScore;
      
        if (computerScore === 5 ){
            showWinnerRound.innerHTML = "Computer win game ";
            alert('Computer win');
            resetScore();
        }    
    }
  
    return playerChoice;
  
}

//Reset Game
function resetScore() {
    computerScore = 0;
    playerScore = 0;
    playerBoardScore.innerHTML = "0";
    computerBoardScore.innerHTML = "0";
  
}