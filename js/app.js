/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

init();

let allCards = document.querySelectorAll('.card');
let scoreText = document.querySelector('.moves');
let restart = document.querySelector('.restart');
let starsScore = document.querySelector('.stars');
let gameTimer = 0;
let scoreMove = 0;
let matched=0;
let flipCards = [];

doMain();

setInterval(function(e) {
  gameTimer++;
  document.querySelector('.timer-second').innerHTML = gameTimer;
},1000);

function init () {
  let deckImages = [
    'fa-diamond','fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb'
  ];

  let deck = document.querySelector('.deck');
  let deckHTML = '';

  shuffle(deckImages).forEach(function(card) {
    deckHTML += '<li class="card"><i class="fa '+ card+ '"></i></li>';
  });
  deck.innerHTML= deckHTML

  document.querySelector('.moves').innerHTML = 0;
}

restart.addEventListener('click', function(e) {
  restartDeck();
});

function restartDeck() {
  init();
  scoreMove = 0;
  flipCards = [];
  matched = 0;
  gameTimer = 0;
  allCards = document.querySelectorAll('.card');
  scoreText = document.querySelector('.moves');
  doMain();
  console.log('restart deck');
  starsScore.querySelectorAll('.fa')[2].classList.replace('fa-star-o','fa-star');
  starsScore.querySelectorAll('.fa')[1].classList.replace('fa-star-o','fa-star');

}

function doMain() {
  let processing = false;
  allCards.forEach(function(card) {
    card.addEventListener('click', function(e) {
      // if (card.classList.item(1)!='open'
      //       || card.classList.item(2)!='show'
      //       || card.classList.itme(1)!='matched') {
      //         flipCards.push(card);
      // }

      // show card
      if (flipCards.length<=2 && !processing) {
          if (card.classList.item(1)!='open'
               && card.classList.item(2) != 'show'
                && card.classList.item(1) != 'match') {
            flipCards.push(card);
            card.classList.add('open','show');
            scoreMove++;
            scoreText.innerHTML = scoreMove;
            // Start Rating
            if (scoreMove==20) {
              // 2 stars
              starsScore.querySelectorAll('.fa')[2].classList.replace('fa-star','fa-star-o');
            } else if (scoreMove==40) {
              // 1 star
              starsScore.querySelectorAll('.fa')[1].classList.replace('fa-star','fa-star-o');
            }
         }
       }
       // open cards equals two
      if (flipCards.length==2) {
        processing = true;
        setTimeout(function(e) {
          let innerCard1 = flipCards[0].querySelector('.fa');
          let innerCard2 = flipCards[1].querySelector('.fa');

          if (innerCard1.classList.item(1) == innerCard2.classList.item(1)) {
                 flipCards[0].classList.add('match');
                 flipCards[1].classList.add('match');
                 matched++;
                 if (matched == 8) {
                    congrat();
                 }
          }
          flipCards[0].classList.remove('open','show');
          flipCards[1].classList.remove('open','show');
          flipCards=[];
          processing = false;
        },500);
      }
    });
  });
}

function congrat() {
  let totalSeconds = gameTimer;
  document.getElementById('container').style.display = "none";
  document.getElementById('congrat').style.display = "flex";
  document.querySelector('.score').innerHTML = scoreMove;
  document.querySelector('.star').innerHTML =
    scoreMove <20 ? 3: ((scoreMove >=20 && scoreMove <40) ? 2:1);
  document.querySelector('.game-time').innerHTML = totalSeconds;
  let restartButton = document.querySelector('.restart-button');
  restartButton.addEventListener('click', function(e) {
    document.getElementById('container').style.display = "flex";
    document.getElementById('congrat').style.display = "none";
    restartDeck();
  });

}
