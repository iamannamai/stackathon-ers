const {gamesRef, functions} = require('./firebase/fire');

const onSlapChange = functions.database.ref('games/{gameId}/slapped')
  .onCreate(async (snapshot, context) => {
    const {gameId} = context.params;
    const playerName = snapshot.val();

    const playerRef = gamesRef.child(`${gameId}/players/${playerName}`);
    const pileRef = gamesRef.child(`${gameId}/pile`);

    const [playerSnap, pileSnap] = await Promise.all([
      playerRef.once('value'),
      pileRef.once('value')
    ]);

    const player = playerSnap.val();
    const pile = pileSnap.val();
    const {cards} = pile;

    evaluateRules(cards, doublesOrSandwiches)
      ? slapSuccess(player, pile)
      : slapFail(player, pile);

    console.log("Player: ", player);
    console.log("PILE: ", pile);

    playerRef.set(player);
    pileRef.set(pile);

    return snapshot.ref.remove();
  });

const evaluateRules = (pile, ...rules) => {
  if (pile.length > 2) {
    for (let i = 0; i < rules.length; i++) {
      if (rules[i](pile)) return true;
    }
  }
  return false;
};

const doublesOrSandwiches = pile => {
  const last = pile.length - 1;
  const double = pile[last].value === pile[last - 1].value;
  const sandwich = pile[last].value === pile[last - 2].value;
  return double || sandwich;
};

const slapSuccess = (player, pile) => {
  player.deck.push(...pile.cards);
  player.deckCount += pile.cards.length;
  pile.cards = [];
  pile.cardCount = 0;
  pile.topCard = null;
};

const slapFail = (player, pile) => {
  const burn = player.deck.shift();
  player.deckCount--;
  pile.cards.unshift(burn);
  pile.cardCount++;
};

/*

exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
      console.log('Uppercasing', context.params.pushId, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return snapshot.ref.parent.child('uppercase').set(uppercase);
    });
*/

module.exports = {
  onSlapChange
};

