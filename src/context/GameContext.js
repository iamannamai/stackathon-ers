import React, {createContext} from 'react';

const GameContext = createContext({
  gameId: '',
  players: [],
  player: '',
  playerDeck: []
});

export default GameContext;
