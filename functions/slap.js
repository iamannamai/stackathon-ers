const {gamesRef, functions} = require('./firebase/fire');

const onSlapChange = functions.database.ref('games/{gameId}/slapped')
  .onCreate((snapshot, context) => {
    const {gameId} = context.params;
    const playerName = snapshot.val();

    const playerRef = gamesRef.child(`${gameId}/players/${playerName}`);

    playerRef.once('value', (snapshot) => {
      const player = snapshot.val();
      const {deck, deckCount} = player;


    });

    return snapshot.ref.remove();
  });

const evaluateRules = (pile, ...rules) => {
  if (pile.length > 2) {
    for (let i = 0; i < rules.length; i++) {
      if (rule[i](pile)) return true;
    }
  }

  return false;
};

const slapSuccess = () => {

};

const slapFail = () => {

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

