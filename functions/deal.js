const {gamesRef, functions} = require('./firebase/fire');
const cors = require('cors')({origin: true});

const deal = functions.https.onRequest((req, res) => cors(req, res, async () => {
    try {
      const {gameId, playerName} = req.body;
      const currentGameRef = gamesRef.child(`${gameId}`);
      const playerSnap = await currentGameRef.child(`players/${playerName}`).once('value');
      const playerDetails = playerSnap.val();

      if (playerDetails.deckCount > 0) {
        const cardToDeal = playerDetails.deck.shift();
        playerDetails.deckCount--;

        await Promise.all([
          currentGameRef.child(`players/${playerName}`).set(playerDetails),
          addToPile(cardToDeal, currentGameRef)
        ]);
      }

      // Get around CORS restrictions
      res.header('Access-Control-Allow-Origin', '*')
        .json(playerDetails);
    } catch (error) {
      res.status(500).json(error);
    }
  }
));

const addToPile = async (card, ref) => {
  try {
    const pileSnap = await ref.child('pile').once('value');
    const pile = pileSnap.val();

    const cards = pile.cards
        ? [...pile.cards, card]
        : [card]

    const updatedPile = {
      cards,
      cardCount: ++pile.cardCount,
      topCard: card
    };

    return ref.child('pile').set(updatedPile);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  deal
};
