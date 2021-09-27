const cards = document.querySelectorAll(".memory-card");
var hasFlippedCard = false;
var lockBoard = false;
var firstCard, secondCard;

cards.forEach(card => card.addEventListener("click", flipCard));

function flipCard() {
    if (lockBoard) {
      return;
    }

    if (this === firstCard) {
        return;
    }

    this.classlist.add("flip");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    if (isMatch == true) {
        disableCards();
    }
    else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classlist.remove("flip");
        secondCard.classlist.remove("flip");
        resetBoard();
    }, 1500)
}

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
}