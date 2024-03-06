
import Deck from './deck.js';

let playerDeck, computerDeck

//document.addEventListener('DOMContentLoaded', function () {
    const computerCardSlot = document.querySelector(".computer-card-slot")
    console.log(computerCardSlot)
    const playerCardSlot = document.querySelector(".player-card-slot")
    console.log(playerCardSlot)
    const computerDeckElement = document.querySelector(".computer-deck")
    console.log(computerDeck)
    const playerDeckElement = document.querySelector(".player-deck")
    console.log(playerDeck)
    const text = document.querySelector("text")
    console.log(text)

    //let playerDeck, computerDeck

    startGame()

    function startGame() {
        const deck = new Deck()
        deck.shuffle()

        const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
        playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
        computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))

        cleanBeforeRound()
    }

    function cleanBeforeRound() {
        computerCardSlot.innerHTML = ''
        playerCardSlot.innerHTML = ''
        text.innerText = ''

        updateDeckCount()
    }

    function updateDeckCount() {
        computerDeckElement.innerText = computerDeck.numberOfCards
        playerDeckElement.innerText = playerDeck.numberOfCards
    }
//});