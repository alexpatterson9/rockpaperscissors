
var playerChoice = null;
var computerScore = 0;
var playerScore = 0;
var currentRound = 1;

const GAME_OPTIONS = [ 'rock', 'paper', 'scissors' ];
const ROUND_COUNT = 3;


initializeGame();

function initializeGame() {
   resetRounds();
   resetScore();
   showElements();
   resetPlayerChoice();
   document.getElementById('playAgainButton').style.display = 'none';
   let userChoice = document.getElementById('userChoiceContainer');
   userChoice.style.display = "flex";
   GAME_OPTIONS.forEach(item => {
      userChoice.appendChild(getImage(item, true));
   });
}

function resetPlayerChoice() {
   playerChoice = null;
   let selected = null;
   try {
      selected = document.getElementsByClassName('selected')[0];
      selected.classList.remove('selected');
   }
   catch(e){}
}

function resetComputerChoice() {

}

function resetScore() {
   playerScore = 0;
   computerScore = 0;
   currentRound = 1;
   document.getElementById('playerScore').innerHTML = playerScore;
   document.getElementById('computerScore').innerHTML = computerScore;
   document.getElementById('roundNumber').innerHTML = `Round ${currentRound} / ${ROUND_COUNT}`;
}

function resetRounds() {
   currentRound = 1;

   document.getElementById('roundResult').innerHTML = "";
   document.getElementById('roundNumber').innerHTML = `Round ${currentRound} / ${ROUND_COUNT}`;
}

function getImage(imageName, isSelectable) {
   let image = document.createElement('figure');
   image.id = `${imageName}-image`;
   image.className = 'img';
   image.value = imageName;

   let imageContent = document.createElement('img');
   imageContent.src = `images/${imageName}.png`;
   imageContent.alt = imageName;
   imageContent.id = `${imageName}-image-content`;

   let caption = document.createElement('figcaption');
   caption.textContent = imageName.toUpperCase();

   image.appendChild(imageContent);
   image.appendChild(caption);
   
   if(isSelectable) {
      image.onclick = function(){selectImage(this)};
      image.classList.add('isSelectable');
   }

   return image;
}

function selectImage(image) {
   GAME_OPTIONS.forEach(item => {
      document.getElementById(`${item}-image`).classList.remove('selected');
   });
   document.getElementById('roundResult').innerText = "";
   playerChoice = image.value;
   image.classList.add('selected');
   startComputerTurn();
}

function startComputerTurn() {
   setTimeout(() => {
      let computerChoice = GAME_OPTIONS[getRandomNumber(3)];
      showComputerChoice(computerChoice);
      checkWinner(computerChoice);
   }, 500);
}

function showComputerChoice(choiceName) {
   let image = getImage(choiceName, false);
   image.classList.add('computerChoiceImage');
   image.id = 'computerChoiceContainer';
   
   let computerChoiceContainer = document.getElementById('computerChoiceContainer');
   computerChoiceContainer.parentNode.replaceChild(image, computerChoiceContainer);
}

function checkWinner(computerChoice) {
   if(computerChoice === playerChoice) {
      document.getElementById("roundResult").innerText = "Tie!";
      document.getElementById("roundResult").style.color = "Orange";
      resetPlayerChoice();
   }
   else if(computerChoice === "rock" && playerChoice === "scissors") {
      updateScore(true);
   }
   else if(computerChoice === "scissors" &&  playerChoice === "paper") {
      updateScore(true);
   }
   else if(computerChoice === "paper" && playerChoice === "rock") {
      updateScore(true);
   }
   else {
      updateScore(false);
   }
   
}

function updateScore(computerWon) {
   if(computerWon) {
      document.getElementById("roundResult").style.color = "Red";
      document.getElementById("roundResult").innerText = "You lost!";

      computerScore++;
   }
   else {
      document.getElementById("roundResult").style.color = "Green";
      document.getElementById("roundResult").innerText = "You won!";

      playerScore++;
   }
   document.getElementById('playerScore').innerText = playerScore;
   document.getElementById('computerScore').innerText = computerScore;


   if(currentRound == ROUND_COUNT) {
      setTimeout(completeGame, 500);
   }
   else {
      currentRound++;
      document.getElementById('roundNumber').innerHTML = `Round ${currentRound} / ${ROUND_COUNT}`;
      resetPlayerChoice();
   }
   
}

function getRandomNumber(max) {
   return Math.floor(Math.random() * max);
}

function showElements() {
   document.getElementById('userChoiceContainer').style.display = "flex";
   document.getElementById('computerChoiceContainer').style.display = "block";
   document.getElementById('computerChoiceLabel').style.display = "block";
   document.getElementById('yourChoiceSeperator').style.display = "block";
   document.getElementById('figureSeperator').style.display = "block";
}

function hideElements() {
   document.getElementById('userChoiceContainer').style.display = "none";
   document.getElementById('computerChoiceContainer').style.display = "none";
   document.getElementById('computerChoiceLabel').style.display = "none";
   document.getElementById('yourChoiceSeperator').style.display = "none";
   document.getElementById('figureSeperator').style.display = "none";
}

function completeGame() {
   let userContainer = document.getElementById('userChoiceContainer')

   while(userContainer.lastChild.nodeName != "P") {
      userContainer.removeChild(userContainer.lastChild);
   }

   hideElements();

   let roundResult = document.getElementById('roundResult');

   if(playerScore > computerScore) {
      roundResult.innerText = "Congrats! You won!";
      roundResult.style.color = "Green";
   }
   else {
      roundResult.innerText = "Bummer. You lost.";
      roundResult.style.color = "Red";
   }

   document.getElementById('playAgainButton').style.display = 'initial';
}