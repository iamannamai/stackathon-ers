import React, {Component} from 'react';
import { connect } from 'react-redux';
import {db} from '../firebase/fire';

class Pile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pileCount: 0,
      topCard: {}
    }
  }

  async componentDidMount() {
    // Set local state
    db.ref(`games/${this.props.gameId}/pile/cardCount`).once('value', snapshot => {
      console.log(snapshot.val());
      this.setState({
        pileCount: snapshot.val()
      });
    });

    // Subscribe to changes
    this.subscribePile = db.ref(`games/${this.props.gameId}/pile/cardCount`).on('value', snapshot =>
      this.setState({
        pileCount: snapshot.val()
      })
    );
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div id="pile">
        <img src="https://deckofcardsapi.com/static/img/3H.png"/>
      </div>
    )
  }
}

export default connect()(Pile);
