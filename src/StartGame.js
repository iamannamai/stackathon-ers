import React from 'react';
import Button from '@material-ui/core/Button';

const StartGame = props => {

  function handleOnClick() {
    // props.socket.emit('START_GAME', );
  }

  return (
    <div>
      <h1>Welcome!</h1>
      <h2>Would you like to play a game? </h2>
      <div>
        <img src={'./images/cards_home.png'} alt=""/>
      </div>
      <Button variant="contained" color="primary" onClick={handleOnClick}>Start Game</Button>
    </div>
  )
};

export default StartGame;
