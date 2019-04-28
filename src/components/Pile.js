import React, {Component} from 'react';
import { connect } from 'react-redux';
import {db} from '../firebase/fire';

class Pile extends Component {

  async componentDidMount() {
    // Set local state
    db.ref(`games/${this.props.gameId}/players/${this.props.playerName}/deckCount`).once('value', snapshot => {
      this.setState({
        myDeckCount: snapshot.val()
      });
    });
    db.ref(`games/${this.props.gameId}/pile/cardCount`).once('value', snapshot => {
      this.setState({
        pileCount: snapshot.val()
      });
    });

    // Subscribe to changes
    this.subscribeSelf = db.ref(`games/${this.props.gameId}/players/${this.props.playerName}/deckCount`).on('value', snapshot => {
      this.setState({
        myDeckCount: snapshot.val()
      });
    });
    this.subscribePile = db.ref(`games/${this.props.gameId}/pile/cardCount`).on('value', snapshot =>
      this.setState({
        pileCount: snapshot.val()
      })
    );
  }

  render() {
    return
  }
}

export default connect()(Pile);
