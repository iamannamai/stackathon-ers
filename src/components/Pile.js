import React, {Component} from 'react';
import { connect } from 'react-redux';
import {db, func} from '../firebase/fire';

class Pile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      topCard: {}
    }
  }

  async componentDidMount() {
    // Set local state
    let pileSnap = await db.ref(`games/${this.props.gameId}/pile`).once('value');

    const pile = pileSnap.val();
    this.setState({
      count: pile.cardCount,
      topCard: pile.topCard
    });


    // Subscribe to changes
    this.subscribePile = db.ref(`games/${this.props.gameId}/pile`).on('value', snapshot => {
      console.log("PILE COUNT: ", snapshot.val());
      const pile = snapshot.val();
      this.setState({
        count: pile.cardCount,
        topCard: pile.topCard
      });
    });
  }

  componentWillUnmount() {
    db.ref(`games/${this.props.gameId}/pile`).off('value', this.subscribePile);
  }

  render() {
    return (
      <div id="pile">
        <img
          src={this.state.topCard ? this.state.topCard.image : ""}
          className="pile"
        />
        <p>{this.state.count}</p>
      </div>
    )
  }
};

const mTS = state => ({
  gameId: state.gameId
})

export default connect(mTS)(Pile);
