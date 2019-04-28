import React from 'react';
import NameInput from './NameInput';
import {connect} from 'react-redux';
import {createNewGame} from '../store';

const StartGame = props => {
  const {startNewGame} = props;
  return (
    <div>
      <h1>Welcome!</h1>
      <h5>Looks like you're not in a game room. Enter your name and start a new game</h5>
      <NameInput handleName={startNewGame} buttonText="New Game" />
    </div>
  )
};

const mTD = dispatch => ({
  startNewGame: name => dispatch(createNewGame(name))
});

export default connect(null, mTD)(StartGame);
