import React, {Component} from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import {db} from '../firebase/fire'

class Opponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      count: 0
    }
  }

  componentDidMount() {
    db.ref(`games/${this.props.gameId}/players/${this.state.name}/deckCount`).once('value', snapshot => {
      this.setState({
        count: snapshot.val()
      });
    });

    this.subscribeDeck = db.ref(`games/${this.props.gameId}/players/${this.state.name}/deckCount`).on('value', snapshot => {
      this.setState({count: snapshot.val()})
    });
  }

  componentWillUnmount() {
    this.subscribeDeck && db.ref(`games/${this.props.gameId}/players/${this.state.name}/deckCount`).off('value', this.subscribeDeck);
  }

  render() {
    return (
      <div className="opponent">
        <div className="opponent-name">{this.state.name}</div>
        <Card />
        <div className="opponent-card-count">{this.state.count}</div>
      </div>
    );
  }
}

const mTS = state => ({
  gameId: state.gameId
});

export default connect(mTS)(Opponents);
