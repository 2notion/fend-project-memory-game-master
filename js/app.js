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

 let allCards = document.querySelectorAll('.card');
 let scoreText = document.querySelector('.moves');
 let scoreMove = 0;
 let flipCards = [];
 allCards.forEach(function(card) {
   card.addEventListener('click', function(e) {
     // console.log(card.querySelector('i').classList);
     flipCards.push(card);

     // show card
     if (flipCards.length<=2) {
         if (card.classList.item(1)!='open'
              && card.classList.item(2) != 'show') {
           card.classList.add('open','show');
           scoreMove++;
           scoreText.innerHTML = scoreMove;
        };
      };
     if (flipCards.length==2) {
       setTimeout(function(e) {
         let innerCard1 = flipCards[0].querySelector('.fa');
         let innerCard2 = flipCards[1].querySelector('.fa');

         if (innerCard1.classList.item(1) != innerCard2.classList.item(1)) {
                console.log(innerCard1.classList.item(1));
                console.log(innerCard2.classList.item(1));
              flipCards[0].classList.remove('open','show');
              flipCards[1].classList.remove('open','show');
         }
         // console.log(innerCard1.classList.item(1));
         // flipCardCount.forEach(function(card) {
           // let innerCard = card.querySelector('.fa');
            // console.log(innerCard.classList.item(1));
           // card.classList.remove('open','show');
         // })
         flipCards=[];
       },500);
     };
   })
 });
