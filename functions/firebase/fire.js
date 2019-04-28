const firebase = require('firebase');

const fire = firebase.initializeApp(require('./config.json'));

module.exports = {
  fire,
  db,
  func
};
