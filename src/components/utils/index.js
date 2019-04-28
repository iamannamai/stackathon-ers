import axios from 'axios';
import _ from 'lodash';

const UUID_URL = 'https://www.uuidgenerator.net/api/version4';
const DECKOFCARDS_BASE_URL = 'https://deckofcardsapi.com/api/deck';

/**
 * Generate and return new game id to persist new game to db
 */
// export const newGameId = async () => {
//   try {
//     let {data: new_gameId} = await axios.get(UUID_URL);
//     return new_gameId;
//   } catch (error) {
//     console.error("Error fetching id for game");
//   }
// }

/**
 * Create and shuffle a new deck of cards for later
 */
export const newDeck = async () => {
  try {
    let {data: new_deck} = await axios.get(`${DECKOFCARDS_BASE_URL}/new/shuffle/?deck_count=1`);
    return new_deck.id;
  } catch (error) {
    console.error(newDeck);
  }
}

/**
 * Distribute cards to players
 */
export const dealHands = async (deckId, players) => {
  try {
    const totalPlayers = players.length;
    let decks = [];
    let cardsPerPlayer = Math.floor(52 / totalPlayers);
    let residual = 52 - cardsPerPlayer;

    //deal
    for (let i = 0; i < totalPlayers ; i++) {
      let cardsToDraw = i < residual
        ? cardsPerPlayer + 1
        : cardsPerPlayer;
      let {data: hand} = await axios.get(`${DECKOFCARDS_BASE_URL}/${deckId}/draw/?count=${cardsToDraw}`)
      decks[i].push(hand.cards);
    }

    //return each player's hand in an object
    return _.zipObject(players, decks);
  } catch (error) {
    console.error(`Error drawing cards: ${error}`);
  }
}
