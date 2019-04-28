import React, {Component} from 'react';
import NameInput from './NameInput';
import PendingGame from './PendingGame';
import GameTable from './GameTable'
import {connect} from 'react-redux';
import {getGame, joinGame, startGame} from '../store';
import {db} from '../firebase/fire';

class ExistingGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inProgress: false
    }
  }

  async componentDidMount() {
    const gameId = this.props.match.params.roomName;
    await this.props.getGame(gameId);
    const gameProgressRef = db.ref(`games/${gameId}`).child('inProgress');
    // set state
    gameProgressRef.once('value', (snapshot) => {
      this.setState({
        inProgress: snapshot.val()
      });
    });

    this.subscribeInProgress = gameProgressRef.on('value', (snapshot) => {
      this.setState({inProgress: snapshot.val()});
    });
  }

  componentWillUnmount() {
    this.subscribeInProgress && db.ref(`games/${this.props.match.params.roomName}`).child('inProgress').on('value', this.subscribeInProgress);
  }

  render() {
    if (!this.props.playerName) return <NameInput handleName={this.props.joinGame} buttonText="Add Me To The Game!"/>;

    if(!this.state.inProgress) return <PendingGame />;

    return <GameTable/>
  }
}

const mTS = state => ({
  gameId: state.gameId,
  playerName: state.playerName,
  inProgress: state.inProgress
})

const mTD = dispatch => ({
  getGame: id => dispatch(getGame(id)),
  joinGame: name => dispatch(joinGame(name)),
  startGame: () => dispatch(startGame()),
});

export default connect(mTS, mTD)(ExistingGame);
