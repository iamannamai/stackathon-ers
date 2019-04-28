import React from 'react';
import Paper from '@material-ui/core/Paper';

const Card = props => (
  <Paper>
    <img src={props.image || "/images/fsa-logo.png"} alt="card"/>
  </Paper>
)

export default Card;
