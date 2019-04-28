const functions = require('firebase-functions');
const firebase = require('firebase');

const fire = firebase.initializeApp(require('./config.json'));

const gamesRef = fire.database().ref('/games');

module.exports = {
  fire,
  gamesRef,
  functions
};
