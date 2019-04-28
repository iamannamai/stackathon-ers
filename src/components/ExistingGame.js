import React, {Component} from 'react';
import NameInput from './NameInput';
import {connect} from 'react-redux';
import {getGame, joinGame} from '../store';

class ExistingGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: '',
      playerName: '',
      room: this.props.match.params.roomName
    }
  }

  async componentDidMount() {
    this.props.getGame(this.state.room);
  }

  render() {
    if (!this.state.playerName) return <NameInput handleName={this.props.joinGame} buttonText="Add Me To Game"/>;

  }
}

const mTS = state => ({
  playerName: state.playerName
})

const mTD = dispatch => ({
  getGame: id => dispatch(getGame(id)),
  joinGame: name => dispatch(joinGame(name))
});

export default connect(mTS, mTD)(ExistingGame);
