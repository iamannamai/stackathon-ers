import React from 'react';
import Paper from '@material-ui/core/Paper';

const Card = ({image, classes}) => (
  <Paper className={classes}>
    <img
      src={image || "/images/fsa-logo.png"} alt="card"
    />
  </Paper>
)

export default Card;
