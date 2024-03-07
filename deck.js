// Define constant arrays for suits and values of playing cards
const SUITS = ["♠", "♡", "♢", "♣"]
const VALUES = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
]


// Class representing a deck of playing cards, will be used in script.js
export default class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards
    }

    get numberOfCards() {  //created this getter to make determing the number of cards more easily as it is used often. 
        return this.cards.length
    }

    pop() { //used to remove and return the top card from the deck
        return this.cards.shift()
    }

    push(card) { //adds card to bottom of the deck
        this.cards.push(card)
    }

    shuffle() {
        //this.cards.sort((a, b) => Math.random() - .5) //utilizing this random piece doesn't actually 100% randomize the cards.
        for (let i = this.numberOfCards - 1; i > 0; i--) { // takes the cards from the back of the deck and flips them over
            const newIndex = Math.floor(Math.random() * (i + 1)) //random index that is before the current card we are on
            const oldValue = this.cards[newIndex] //swap the card we are currently on with the new card we got on line 15
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }
}

class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }

    get color() { //determine the color of the card based on it's suit
        return this.suit === '♣' || this.suit === '♠' ? 'black' : 'red'
    }
    //generates html representation of the card
    getHTML() {
        console.log("this is my card suit", this.suit)
        const cardDiv = document.createElement('div')
        cardDiv.innerText = this.suit
        cardDiv.classList.add("card", this.color)
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv
    }
}



//generates a fresh deck of cards
function freshDeck() {
    return SUITS.flatMap(suit => { //flatmap turns it into 1 array of 52 vs 4 arrays of 13 each
        return VALUES.map(value => {
            return new Card(suit, value)
        })
    })
}
