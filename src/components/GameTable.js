import React, {Component} from 'react';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import Opponent from './Opponent';
import Pile from './Pile';
import MyDeck from './MyDeck';
import {db} from '../firebase/fire';
import './GameTable.css';
import axios from 'axios';
// import {} from './store';

class GameTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opponents: [],
      myDeckCount: 0,
      slapped: null
    };
    this.onDeal = this.onDeal.bind(this);
    this.onSlap = this.onSlap.bind(this);
  }

  async componentDidMount() {
    // Set local state
    db.ref(`games/${this.props.gameId}/players/${this.props.playerName}/deckCount`).once('value', snapshot => {
      this.setState({
        myDeckCount: snapshot.val()
      });
    });
    db.ref(`games/${this.props.gameId}/players`).once('value', snapshot => {
      const opponents = Object.keys(snapshot.val()).filter(name => name !== this.props.playerName);
      this.setState({opponents});
    });
    db.ref(`games/${this.props.gameId}/slapped`).once('value', snapshot => {
      const slapped = snapshot.val();
      this.setState({slapped});
    });

    // Subscribe to changes
    this.subscribeSelf = db.ref(`games/${this.props.gameId}/players/${this.props.playerName}/deckCount`).on('value', snapshot => {
      this.setState({
        myDeckCount: snapshot.val()
      });
    });
    this.subscribeSlaps = db.ref(`games/${this.props.gameId}/slapped`).on('value', snapshot => {
      const slapped = snapshot.val();
      this.setState({slapped});
    });
  }

  componentWillUnmount() {
    // Unsubscribe
    this.subscribeSelf && db.ref(`games/${this.props.gameId}/players/${this.props.playerName}/deckCount`).off('value', this.subscribeSelf);

    this.subscribeSlaps && db.ref(`games/${this.props.gameId}/slapped`).off('value', this.subscribeSlaps);
  }

  onDeal() {
    axios.post('https://us-central1-stackathon-ers.cloudfunctions.net/deal', {
      gameId: this.props.gameId,
      playerName: this.props.playerName
    });
  }

  onSlap() {
    db.ref(`games/${this.props.gameId}`).child('slapped').set(this.props.playerName);
  }

  render() {
    return (
      <div id="game-table">
        <div id="opponents">
          {
            this.state.opponents.map((opponent, i) => <Opponent name={opponent} key={i} />)
          }
        </div>
        <div id="my-view">
          <div id="me">
            <MyDeck
              name={this.props.playerName}
              count={this.state.myDeckCount}
            />
            <div id="buttons">
              <Fab
                variant="round"
                color="secondary"
                size="medium"
                style={{minWidth: '5rem', minHeight: '5rem'}}
                disabled={this.state.slapped || !this.state.myDeckCount || false}
                onClick={this.onDeal}
                >
                Deal
              </Fab>
              <Fab
                variant="round"
                color="primary"
                style={{minWidth: '7rem', minHeight: '7rem'}}
                disabled={this.state.slapped || false}
                onClick={this.onSlap}
                >
                SLAP!
              </Fab>
            </div>
          </div>
          <Pile />
        </div>
      </div>
    );
  }
};

const mTS = state => ({
  gameId: state.gameId,
  playerName: state.playerName
});

export default connect(mTS)(GameTable);
