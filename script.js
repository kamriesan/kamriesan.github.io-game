const cardValues = ['🍎', '👜', '🐈', '🐶', '🍆', '🌸', '🎸', '👒', '🍎', '👜', '🐈', '🐶', '🍆', '🌸', '🎸', '👒'];

let cardsChosen = [];
let cardsChosenIds = [];
let cardsMatched = [];

const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart-button');

restartButton.addEventListener('click', startGame);

function startGame() {
  cardsChosen = [];
  cardsChosenIds = [];
  cardsMatched = [];

  gameBoard.innerHTML = '';
  shuffleCards();

  for (let i = 0; i < cardValues.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = cardValues[i];
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  }
}

function shuffleCards() {
  cardValues.sort(() => Math.random() - 0.5);
}

function flipCard() {
  const card = this;
  const cardValue = card.dataset.value;
  const cardId = Array.from(gameBoard.children).indexOf(card);

  if (!cardsMatched.includes(cardId) && !cardsChosenIds.includes(cardId)) {
    cardsChosen.push(cardValue);
    cardsChosenIds.push(cardId);
    card.innerHTML = cardValue;

    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }
}

function checkForMatch() {
  const [card1Id, card2Id] = cardsChosenIds;
  const card1 = gameBoard.children[card1Id];
  const card2 = gameBoard.children[card2Id];

  if (cardsChosen[0] === cardsChosen[1]) {
    cardsMatched.push(card1Id, card2Id);
    card1.classList.add('matched');
    card2.classList.add('matched');
  } else {
    card1.innerHTML = '';
    card2.innerHTML = '';
  }

  cardsChosen = [];
  cardsChosenIds = [];

  if (cardsMatched.length === cardValues.length) {
    setTimeout(() => alert('You won the game!'), 500);
  }
}

start
