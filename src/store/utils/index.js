import axios from 'axios';
import _ from 'lodash';

const DECKOFCARDS_BASE_URL = 'https://deckofcardsapi.com/api/deck';

/**
 * Create and shuffle a new deck of cards for later
 */
export const newDeck = async () => {
  try {
    let {data: new_deck} = await axios.get(`${DECKOFCARDS_BASE_URL}/new/shuffle/?deck_count=1`);
    return new_deck.deck_id;
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
    let residual = 52 % totalPlayers;

    //deal
    await (async () => {
      for (let i = 0; i < totalPlayers ; i++) {
        let cardsToDraw = i < residual
          ? cardsPerPlayer + 1
          : cardsPerPlayer;
        let {data: hand} = await axios.get(`${DECKOFCARDS_BASE_URL}/${deckId}/draw/?count=${cardsToDraw}`);
        decks[i] = hand.cards;
      }
    })();

    let returnObj = {};
    players.forEach((player, index) => (
      returnObj[player] = {
        deck: decks[index],
        deckCount: decks[index].length
      }
    ));
    return returnObj;
  } catch (error) {
    console.error(`Error drawing cards: ${error}`);
  }
}
