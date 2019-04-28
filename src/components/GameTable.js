import React, {Component} from 'react';
import {connect} from 'react-redux';
import Opponent from './Opponent';
import Pile from './Pile';
import Card from './Card';
import {db} from '../firebase/fire';
import './GameTable.css';
// import {} from './store';

class GameTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opponents: [],
      myDeckCount: 0,
      pileCount: 0
    }
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

    // Subscribe to changes
    this.subscribeSelf = db.ref(`games/${this.props.gameId}/players/${this.props.playerName}/deckCount`).on('value', snapshot => {
      this.setState({
        myDeckCount: snapshot.val()
      });
    });
  }

  componentWillUnmount() {
    // Unsubscribe
    this.subscribeSelf && db.ref(`games/${this.props.gameId}/players/${this.props.playerName}/deckCount`).off('value', this.subscribeSelf);
  }

  render() {
    // Each opponent should have a listener for their own player card count and such
    return (
      <div id="game-table">
        <div id="opponents">
          {
            this.state.opponents.map((opponent, i) => <Opponent name={opponent} key={i} />)
          }
        </div>
        <div id="my-view">
          <div id="my-deck"></div>
          {/* <Pile /> */}
          <div id="buttons"></div>
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
