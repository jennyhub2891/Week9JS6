// Import the Deck class from the deck.js file
import Deck from './deck.js';

// Map representing the numerical values of cards
const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
}

// Declare variables for player and computer decks, and game state
let playerDeck, computerDeck, inRound, stop

// DOM elements for card slots, deck displays, and text messages
const computerCardSlot = document.querySelector(".computer-card-slot")
const playerCardSlot = document.querySelector(".player-card-slot")
const computerDeckElement = document.querySelector(".computer-deck")
const playerDeckElement = document.querySelector(".player-deck")
const text = document.querySelector(".text")

// Event listener for a click event
document.addEventListener('click', () => {
    // If the game is over, start a new game on click 
    if (stop) {
        startGame()
        return
    }
    // If it's in the middle of a round, clean before starting a new round
    if (inRound) {
        cleanBeforeRound()
    } else {
        // Otherwise, flip the cards for the current round
        flipCards()
    }
})

// Start the game initially
startGame()

function startGame() {
    // Create a new deck, shuffle it, and split it between player and computer
    const deck = new Deck()
    deck.shuffle()

    const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
    //playerDeck = new Deck(deck.cards.slice(0, 2)) used to test Game over.
    computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
    inRound = false
    stop = false

    cleanBeforeRound()
}

// Function to clean up before starting a new round
function cleanBeforeRound() {
    inRound = false
    computerCardSlot.innerHTML = ""
    playerCardSlot.innerHTML = ""
    text.innerText = ""
    // Update the deck count display
    updateDeckCount()
}

function flipCards() {
    inRound = true
    // Draw cards for player and computer
    const playerCard = playerDeck.pop()
    const computerCard = computerDeck.pop()
    // Display the drawn cards
    playerCardSlot.appendChild(playerCard.getHTML())
    computerCardSlot.appendChild(computerCard.getHTML())
    // Update the deck count display
    updateDeckCount()
    // Determine the winner of the round and handle accordingly
    if (isRoundWinner(playerCard, computerCard)) {
        text.innerText = "Win"
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)
    } else if (isRoundWinner(computerCard, playerCard)) {
        text.innerText = "Lose"
        computerDeck.push(playerCard)
        computerDeck.push(computerCard)
    } else {
        text.innerText = "Draw"
        // Draw scenario: No points awarded
    }
    // Check if the game is over
    if (isGameOver(playerDeck)) {
        text.innerText = "Game Over. You Lose!!"
        stop = true
    } else if (isGameOver(computerDeck)) {
        text.innerText = "Game Over. You Win!!"
        stop = true
    }
}
// Function to update the deck count display
function updateDeckCount() {
    computerDeckElement.innerText = computerDeck.numberOfCards
    playerDeckElement.innerText = playerDeck.numberOfCards
}
// Function to determine the winner of a round
function isRoundWinner(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}
// Function to check if the game is over for a given deck  
function isGameOver(deck) {
    return deck.numberOfCards === 0
}

