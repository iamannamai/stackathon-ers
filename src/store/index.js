import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import axios from 'axios';
import {db} from '../firebase/fire';
import { newDeck } from '../components/utils';

const DECKOFCARDS_BASE_URL = 'https://deckofcardsapi.com/api/deck';

const SET_GAME = 'SET_ROOM';

const setGame = game => ({
  type: SET_GAME,
  game
});

export const getGame = (gameId) => async dispatch => {
  try {
    const game = await db.ref(`game/${gameId}`);
    return dispatch(setGame(game));
  } catch (error) {
    console.error(error);
  }
}

export const createNewGame = name => async dispatch => {
  try {
    let {data: new_deck} = await axios.get(`${DECKOFCARDS_BASE_URL}/new/shuffle/?deck_count=1`);
    const pushToGames = {
      id: new_deck.deck_id,
      playersList: [name],
      inProgress: false
    }
    const ref = await db.ref('games').push(pushToGames);
    console.log("REFFFF: ", ref);
    dispatch(setGame(pushToGames));
  } catch (error) {
    console.error(error);
  }
}

export const joinGame = name => {

}

const initialState = {
  id: ''
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_GAME:
      return action.game;
    default:
      return state;
  }
};

const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);

const store = createStore(reducer, middleware);

export default store;
