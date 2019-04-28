import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import history from '../history';
import {newDeck, dealHands} from './utils';
import { db } from '../firebase/fire';

const SET_GAME = 'SET_GAME';
const SET_PLAYERNAME = 'SET_PLAYERNAME';
const ADD_TO_GAME = 'ADD_TO_GAME';
const REMOVE_FROM_GAME = 'REMOVE_FROM_GAME';
const SET_START_GAME = 'SET_START_GAME';

const setGame = (game) => ({
  type: SET_GAME,
  game
});

const setPlayerName = name => ({
  type: SET_PLAYERNAME,
  name
});

export const addToGame = name => ({
  type: ADD_TO_GAME,
  name
});

export const removeFromGame = name => ({
  type: REMOVE_FROM_GAME,
  name
});

export const setStartGame = () => ({
  type: SET_START_GAME
});

// THUNKS
const gamesRef = db.ref('games');

export const getGame = gameId => async dispatch => {
  try {
    const game = await gamesRef.child(gameId).once('value');
    const gameToSet = {
      gameId: gameId,
      inProgress: game.child('inProgress').val()
    };

    game.exists() ? dispatch(setGame(gameToSet)) : history.push('/');
  } catch (error) {
    console.error(error);
  }
};

export const createNewGame = name => async dispatch => {
  try {
    const new_deckId = await newDeck();
    const ref = await gamesRef.child(new_deckId).set({
      inProgress: false
    });

    await gamesRef.child(`${new_deckId}/playersList`).push(name);
    const setGameBody = {
      gameId: new_deckId,
      inProgress: false,
      playerName: name
    };

    const createdDeck = await gamesRef.child(new_deckId);

    dispatch(setGame(setGameBody));
    history.push(`/${createdDeck.key}`);
  } catch (error) {
    console.error(error);
  }
};

export const joinGame = name => async dispatch => {
  try {
    const gameId = store.getState().gameId;
    const ref = await db.ref(`games/${gameId}`);
    await ref.child('playersList').push(name);
    dispatch(setPlayerName(name));
  } catch (error) {
    console.error(error);
  }
};

// NOT READY YET
export const leaveGame = name => async dispatch => {
  try {
    const gameId = store.getState().gameId;
    const ref = await db.ref(`/games/${gameId}`);
    await ref.child('playersList').remove(name);
    dispatch(removeFromGame(name));
  } catch (error) {
    console.error(error);
  }
}

export const startGame = () => async dispatch => {
  try {
    const {gameId, playersList} = store.getState();
    let playersAndHands = await dealHands(gameId, playersList);
    const gameRef = db.ref(`games/${gameId}`)
    await Promise.all([
      gameRef.child('inProgress').set(true),
      gameRef.child('players').set(playersAndHands),
      gameRef.child('pile').set({
        cards: [],
        cardCount: 0,
        topCard: null,
      }),
      gameRef.child('playerCount').set(Object.keys(playersAndHands.length)),
      gameRef.child('slapped').set(null)
    ]);
    dispatch(setStartGame());
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  gameId: '',
  playersList: [],
  inProgress: false,
  playerName: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME:
      return {
        ...state,
        gameId: action.game.gameId,
        inProgress: action.game.inProgress,
        playerName: action.game.playerName
      };
    case SET_PLAYERNAME:
      return {
        ...state,
        playerName: action.name
      }
    case ADD_TO_GAME:
      return {
        ...state,
        playersList: [...state.playersList, action.name]
      };
    case REMOVE_FROM_GAME:
      return {
        ...state,
        playersList: state.playersList.filter(name => name !== action.name)
      }
    case SET_START_GAME:
      return {
        ...state,
        inProgress: true
      };
    default:
      return state;
  }
};

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
