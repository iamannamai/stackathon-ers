const {deal} = require('./deal');
const {onSlapChange} = require('./slap');


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.deal = deal;
exports.slap = onSlapChange;

