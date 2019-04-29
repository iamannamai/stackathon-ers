import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import AvailablePlayers from './AvailablePlayers';
import {db} from '../firebase/fire';
import {startGame, addToGame, removeFromGame} from '../store';

class PendingGame extends Component {
  componentDidMount() {
    this.subscribeAdd = db.ref(`games/${this.props.gameId}`).child('playersList').on('child_added', (snapshot) => {
      this.props.addToGame(snapshot.val())
    });

    this.subscribeRemove = db.ref(`games/${this.props.gameId}`).child('playersList').on('child_removed', (snapshot) => {
      this.props.removeFromGame(snapshot.val());
    });
  }

  componentWillUnmount() {
    db.ref(`games/${this.props.gameId}`).child('playersList').off('child_added', this.subscribeAdd);
    db.ref(`games/${this.props.gameId}`).child('playersList').off('child_removed', this.subscribeRemove);
  }

  render() {
    return (
      <div>
        <h1>Thanks for joining, {this.props.playerName}!</h1>
        <h5>Please wait for the game to start...<br/>Or start it yourself when your group is ready</h5>
        <AvailablePlayers playersList={this.props.playersList} />
        <div>
        <CircularProgress />
        </div>
        <Button variant="contained" type="button" color="primary" onClick={this.props.startGame}>Start Game</Button>
      </div>
    )
  }
}

const mTS = state => ({
  gameId: state.gameId,
  playerName: state.playerName,
  playersList: state.playersList
});

const mTD = dispatch => ({
  startGame: () => dispatch(startGame()),
  addToGame: name => dispatch(addToGame(name)),
  removeFromGame: name => dispatch(removeFromGame(name))
});

export default connect(mTS, mTD)(PendingGame);

