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
let restartDeck = document.querySelector('.restart');
let starsScore = document.querySelector('.stars');
let scoreMove = 0;
let flipCards = [];

doMain();

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

restartDeck.addEventListener('click', function(e) {
 init();
 scoreMove = 0;
 flipCards = [];
 allCards = document.querySelectorAll('.card');
 scoreText = document.querySelector('.moves');
 doMain();
 console.log('restart deck');
 starsScore.querySelectorAll('.fa')[2].classList.replace('fa-star-o','fa-star');
 starsScore.querySelectorAll('.fa')[1].classList.replace('fa-star-o','fa-star');
});

function doMain() {
  allCards.forEach(function(card) {
    card.addEventListener('click', function(e) {
      flipCards.push(card);
      console.log("hello");

      // show card
      if (flipCards.length<=2) {

          if (card.classList.item(1)!='open'
               && card.classList.item(2) != 'show') {
            card.classList.add('open','show');
            scoreMove++;
            scoreText.innerHTML = scoreMove;
            // Start Rating
            if (scoreMove==20) {
              // 2 stars
              starsScore.querySelectorAll('.fa')[2].classList.replace('fa-star','fa-star-o');
            } else if (scoreMove ==40) {
              // 1 star
              starsScore.querySelectorAll('.fa')[1].classList.replace('fa-star','fa-star-o');
            }
         }
       }
       // open cards equals two
      if (flipCards.length==2) {
        setTimeout(function(e) {
          let innerCard1 = flipCards[0].querySelector('.fa');
          let innerCard2 = flipCards[1].querySelector('.fa');

          if (innerCard1.classList.item(1) == innerCard2.classList.item(1)) {
                 flipCards[0].classList.add('match');
                 flipCards[1].classList.add('match');

          }
          flipCards[0].classList.remove('open','show');
          flipCards[1].classList.remove('open','show');
          flipCards=[];
        },500);
      }
    });
  });
}
