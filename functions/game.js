const {db, functions} = require('./firebase/fire');
const axios = require('axios');
const cors = require('cors')({origin: true});

// const UUID_URL = 'https://www.uuidgenerator.net/api/version4'

const onCreateGame = functions.database
  .ref()
  .onCreate((snapshot, context) => {
      console.log("snapshot", snapshot);
      console.log("context", context);
  });

// const createNewGame = functions.https.onRequest(async (req, res) => {
//   cors(req, res, async () => {
//     if(req.method !== 'POST') {
//       return res.status(401).json({
//        message: 'Not allowed'
//       })
//     }

//     try {
//       const {data: new_game_id} = await axios.get(UUID_URL);
//       let gamesRef = await db.ref().child('games').push(new_gameId);
//       gamesRef.child('playersList').push(req.data.name);
//       res.send(new_game_id);
//     } catch (error) {
//       res.sendStatus(500);
//     }
//   });
// });

module.exports = {
  // createNewGame,
  onCreateGame
};

exports.addItem = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
   if(req.method !== 'POST') {
    return res.status(401).json({
     message: 'Not allowed'
    })
   }
   console.log(req.body)
   const item = req.body.item
   database.push({ item });
   let items = [];
   return database.on('value', (snapshot) => {
    snapshot.forEach((item) => {
     items.push({
      id: item.key,
      items: item.val().item
     });
    });
    res.status(200).json(items)
   }, (error) => {
    res.status(error.code).json({
     message: `Something went wrong. ${error.message}`
    })
   })
  })
 })
