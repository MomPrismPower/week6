// Leah Nassar - week 6 Game of War - first attempt
// March 12 2022
// This is the game of war written without any unit tests or OOP concepts
// it works great.
//
// my spouse commented that it looks like someone who used to know Perl wrote it
// who the heck else puts a regex in anything
//
// i took offense.
//
var deck = [];
var player1Deck = [];
var player2Deck = [];

function createDeck() {
	// create a deck of cards
	// suits are (S)pades,(H)earts, (C)lubs, (D)iamonds
	let suits = ['S', 'H', 'C', 'D'];
	// values are - ace (1), 2, 3, 4, 5, 6, 7, 8, 9, 10, J (11), Q (12), K (13)
	// changing face to number for simplicity
	let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
	// 
	let card;
	// for loops through the 4 suits and then the 13 values, creating a "card" to push onto our deck
	for (let i=0; i<suits.length; i++){
		for (let x=0; x<values.length; x++){
			card = suits[i] + values[x];
			deck.push(card);
		}
	}
	return deck;
}

function readCard(card) {
	let suit = card.charAt(0);
	let value = card.substring(1);
	let yourCard = '';
	switch (suit) {
		case 'S':
			suit = 'Spades';
			break;
		case 'D':
			suit = 'Diamonds';
			break;
		case 'C':
			suit = 'Clubs';
			break;
		case 'H':
			suit = 'Hearts';
			break;
	}
	switch (value) {
		case '1':
			value = 'Ace';
			break;
		case '13':
			value = 'King';
			break;
		case '12':
			value = 'Queen';
			break;
		case '11':
			value = 'Jack';
			break;
		default:
			value = value;
	}
	yourCard =  `${value} of ${suit}`;
	return yourCard;
}


deck = createDeck(deck);
console.log(deck);

function shuffleDeck(deck) {
	// given a deck of cards, return a new deck of cards in a different order	
	// using some Math functions to randomly generate numbers less than the size of our deck and reverse it with another
	// card in the deck until we have iterated through the entire deck
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
	//
    for (let i = deck.length - 1; i > 0; i--) {
        let x = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[x]] = [deck[x], deck[i]];
    }
	return deck;
}

deck = shuffleDeck(deck);
console.log(deck);

function dealCards(deck) {
	// war involves 2 players who each get 26 cards
	// we are going to get a deck of cards and return 2 (1 for each player)
	for (let i = deck.length - 1; i > 0; i--) {
		player1Deck.push(deck[i]);
		i--;
			if (i >= 0) {
				player2Deck.push(deck[i]);
		}
		
	}
}

dealCards(deck);


console.log('player1 has ' + player1Deck.length + 'cards ' + player1Deck);
console.log('player2 has ' + player2Deck.length + 'cards ' + player2Deck);


function playWar(player1Deck, player2Deck) {
	// we are taking in 2 decks (arrays).
	// as long as player1Deck or player2Deck is not an empty array (length !=0), we'll keep comparing cards
	
	// Because of the way I defined the deck {suit}{value} I am going to need to use a regular
	// expression to compare the cards - ie we need to chop off the 1st letter and only look at the
	// numeric value - we'll call those p1 and p2
	
	// pop takes the element at the end of the array (which i think is the top of an upside down deck)
	// unshift puts the card into the front of the deck (so we are not simply replaying it in the next round)
	
	// every round, we compare the cards.  
	// if P1 is the higher card, p1score gets a point; if p2 has the higher card, p2score gets the point.
	// if the cards are equal, no one gets a point, and we discard both cards
	// we do this until one of the players has no more cards
	
	let p1;
	let p2;
	// the regular expression matches the numbers in the card value - meaning it will drop the suit
	let regex = /\d+/;
	
	let p1score = 0;
	let p2score = 0;
		
	// keeping track of iterations because the game was going crazy during tests
	let i = 0;
	
	do {
		// p1 and p2 card values
		p1 = parseInt(player1Deck[player1Deck.length-1].match(regex));
		p2 = parseInt(player2Deck[player2Deck.length-1].match(regex));
		console.log('ROUND' + i + ':');
		console.log('PLAYER 1 CARD: ' + readCard(player1Deck[player1Deck.length-1]) + ', PLAYER 2 CARD: ' + readCard(player2Deck[player2Deck.length-1]));
		console.log('*******************************');
		if (p1 > p2) {	
			// player1's card is bigger, put it and player1's card at the bottom of the deck
			console.log('PLAYER 1 WINS ROUND!');
			p1score++;
			player1Deck.unshift(player1Deck.pop());
			player1Deck.unshift(player2Deck.pop());
		} else if (p2 > p1) {
			console.log('PLAYER 2 WINS ROUND!');
			p2score++;
			player2Deck.unshift(player2Deck.pop());
			player2Deck.unshift(player1Deck.pop());
		} else {
			console.log('-----TIE ROUND----');
			// lets discard the cards
			player2Deck.pop();
			player1Deck.pop();
		}
	i++;
}  while ((player1Deck.length!=0) && (player2Deck.length!=0));
	
	console.log('Final scores Player1: ' + p1score + ', Player2: ' + p2score);
	
	if (p1score > p2score) {
		return `Player 1 is the winner!!!!!!!!!!!`;
	}	else if (p2score > p1score) { 
		return `Player 2 is the winner!!!!!!!!!!!`; 
	} else return `Somehow there was a tie......?`;
	

}

console.log(playWar(player1Deck, player2Deck));
