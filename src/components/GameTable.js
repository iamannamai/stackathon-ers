import React, {Component} from 'react';
import {connect} from 'react-redux';
import Opponents from './Opponents';
import Card from './Card';
// import {} from './store';

class GameTable extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    // Each opponent should have a listener for their own player card count and such
    return (
      <div id="game-table">
        <Card className="card-back"/>
        {/* <div id="opponents">
        {

        }
        </div> */}
      </div>
    );
  }
};

export default GameTable;
